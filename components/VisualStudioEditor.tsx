import React, { useState, useEffect, useRef } from 'react';

interface ElementInfo {
  tag: string;
  text: string;
  fontFamily: string;
  fontSize: string;
  fontWeight: string;
  letterSpacing: string;
  lineHeight: string;
  color: string;
  src?: string;
  isImage: boolean;
}

export default function VisualStudioEditor() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEl, setSelectedEl] = useState<HTMLElement | null>(null);
  const [info, setInfo] = useState<ElementInfo | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [hoverOutline, setHoverOutline] = useState<HTMLElement | null>(null);
  const [isPickerActive, setIsPickerActive] = useState(false);
  const [directTyping, setDirectTyping] = useState(false);
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiCopied, setAiCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  // Push snapshot to undo stack
  const recordHistory = () => {
    if (typeof document === 'undefined') return;
    const main = document.getElementById('main') || document.body;
    const snap = main.innerHTML;
    setHistory((prev) => [...prev.slice(0, historyIndex + 1), snap]);
    setHistoryIndex((prev) => prev + 1);
  };

  // Enable/disable direct document design mode
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.designMode = directTyping ? 'on' : 'off';
    }
  }, [directTyping]);

  // Click & hover element selector
  useEffect(() => {
    if (!isPickerActive) {
      if (hoverOutline) hoverOutline.style.outline = '';
      return;
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.closest('#visual-studio-editor')) return;
      if (hoverOutline && hoverOutline !== target) {
        hoverOutline.style.outline = '';
      }
      target.style.outline = '2px dashed #D90077';
      target.style.outlineOffset = '2px';
      setHoverOutline(target);
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || target.closest('#visual-studio-editor')) return;
      e.preventDefault();
      e.stopPropagation();

      if (hoverOutline) hoverOutline.style.outline = '';
      target.style.outline = '3px solid #D90077';
      target.style.outlineOffset = '3px';
      setSelectedEl(target);

      const computed = window.getComputedStyle(target);
      const isImg = target.tagName === 'IMG' || !!target.querySelector('img');
      const imgNode = target.tagName === 'IMG' ? (target as HTMLImageElement) : target.querySelector('img');

      setInfo({
        tag: target.tagName.toLowerCase(),
        text: target.innerText || target.textContent || '',
        fontFamily: computed.fontFamily,
        fontSize: computed.fontSize,
        fontWeight: computed.fontWeight,
        letterSpacing: computed.letterSpacing === 'normal' ? '0px' : computed.letterSpacing,
        lineHeight: computed.lineHeight,
        color: computed.color,
        src: imgNode ? imgNode.src : undefined,
        isImage: isImg,
      });

      setIsPickerActive(false);
      setIsOpen(true);
      showToast(`Selected <${target.tagName.toLowerCase()}>`);
    };

    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('click', onClick, true);

    return () => {
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('click', onClick, true);
    };
  }, [isPickerActive, hoverOutline]);

  // Undo / Redo
  const handleUndo = () => {
    if (historyIndex <= 0) return;
    const main = document.getElementById('main') || document.body;
    const targetSnap = history[historyIndex - 1];
    if (targetSnap) {
      main.innerHTML = targetSnap;
      setHistoryIndex(historyIndex - 1);
      showToast('Undo applied');
    }
  };

  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return;
    const main = document.getElementById('main') || document.body;
    const targetSnap = history[historyIndex + 1];
    if (targetSnap) {
      main.innerHTML = targetSnap;
      setHistoryIndex(historyIndex + 1);
      showToast('Redo applied');
    }
  };

  // Mutations
  const updateStyle = (property: string, value: string) => {
    if (!selectedEl) return;
    recordHistory();
    (selectedEl.style as any)[property] = value;
    const computed = window.getComputedStyle(selectedEl);
    setInfo((prev) => prev ? {
      ...prev,
      [property]: value,
      fontFamily: computed.fontFamily,
      fontSize: computed.fontSize,
      fontWeight: computed.fontWeight,
      letterSpacing: computed.letterSpacing,
      lineHeight: computed.lineHeight,
      color: computed.color,
    } : null);
  };

  const updateText = (newText: string) => {
    if (!selectedEl) return;
    recordHistory();
    selectedEl.innerText = newText;
    setInfo((prev) => prev ? { ...prev, text: newText } : null);
  };

  const updateImageSrc = (newSrc: string) => {
    if (!selectedEl) return;
    recordHistory();
    if (selectedEl.tagName === 'IMG') {
      (selectedEl as HTMLImageElement).src = newSrc;
    } else {
      const img = selectedEl.querySelector('img');
      if (img) img.src = newSrc;
    }
    setInfo((prev) => prev ? { ...prev, src: newSrc } : null);
    showToast('Photo replaced');
  };

  const deleteSelectedElement = () => {
    if (!selectedEl) return;
    recordHistory();
    selectedEl.remove();
    setSelectedEl(null);
    setInfo(null);
    showToast('Element removed');
  };

  const duplicateSelectedElement = () => {
    if (!selectedEl || !selectedEl.parentNode) return;
    recordHistory();
    const clone = selectedEl.cloneNode(true) as HTMLElement;
    selectedEl.parentNode.insertBefore(clone, selectedEl.nextSibling);
    showToast('Element duplicated');
  };

  const moveElement = (direction: 'up' | 'down') => {
    if (!selectedEl || !selectedEl.parentNode) return;
    recordHistory();
    if (direction === 'up' && selectedEl.previousElementSibling) {
      selectedEl.parentNode.insertBefore(selectedEl, selectedEl.previousElementSibling);
    } else if (direction === 'down' && selectedEl.nextElementSibling) {
      selectedEl.parentNode.insertBefore(selectedEl.nextElementSibling, selectedEl);
    }
    showToast(`Moved ${direction}`);
  };

  // AI Prompt Generator for Amanda
  const generateAiPrompt = () => {
    if (!selectedEl || !info) return;
    const prompt = `Please update the <${info.tag}> component.\n\nCurrent Text: "${info.text.slice(0, 150)}..."\nCurrent Font: ${info.fontFamily}\nCurrent Size: ${info.fontSize}, Weight: ${info.fontWeight}\n\nRequested Modification:\n"${aiPrompt || 'Refine this section to be warmer and more engaging.'}"`;
    navigator.clipboard?.writeText(prompt);
    setAiCopied(true);
    setTimeout(() => setAiCopied(false), 2500);
    showToast('Prompt copied for AI Assistant!');
  };

  return (
    <div id="visual-studio-editor" className="font-sans">
      {/* Toast alert */}
      {toastMsg && (
        <div className="fixed top-20 right-6 z-[9999] bg-[#0F172A] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-2xl border border-slate-700 animate-in fade-in duration-200">
          {toastMsg}
        </div>
      )}

      {/* ── PERMANENT TOP-LEVEL WORKBENCH DOCK (Always Visible) ──────── */}
      <div className="fixed top-3 right-4 z-[9990] flex items-center gap-2">
        {/* Quick Click & Inspect Pointer */}
        <button
          onClick={() => {
            setIsPickerActive(!isPickerActive);
            if (!isPickerActive) showToast('Click on any text or image to edit it');
          }}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-xl backdrop-blur-md ${
            isPickerActive
              ? 'bg-[#D90077] text-white ring-4 ring-[#D90077]/30 scale-105'
              : 'bg-white/95 text-slate-800 border border-slate-200 hover:border-[#D90077] hover:text-[#D90077]'
          }`}
          title="Click to select any text or picture"
        >
          <span className="text-sm">👆</span>
          <span>{isPickerActive ? 'Selecting...' : 'Select Element'}</span>
        </button>

        {/* Undo / Redo Buttons */}
        <div className="flex items-center bg-white/95 border border-slate-200 rounded-full p-1 shadow-lg backdrop-blur-md">
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="p-1.5 text-slate-700 hover:text-[#D90077] disabled:opacity-30 disabled:hover:text-slate-700"
            title="Undo"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a5 5 0 015 5v2m0 0l-4-4m4 4l4-4" transform="matrix(-1 0 0 1 24 0)" />
            </svg>
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 text-slate-700 hover:text-[#D90077] disabled:opacity-30 disabled:hover:text-slate-700"
            title="Redo"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10H11a5 5 0 00-5 5v2m0 0l4-4m-4 4l-4-4" transform="matrix(-1 0 0 1 24 0)" />
            </svg>
          </button>
        </div>

        {/* Master Studio Suite Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all shadow-xl backdrop-blur-md ${
            isOpen
              ? 'bg-[#0F172A] text-white ring-2 ring-slate-800'
              : 'bg-white/95 text-slate-900 border border-slate-200 hover:bg-[#D90077] hover:text-white'
          }`}
          title="Open Amanda's Visual Studio & AI Copilot"
        >
          <span className="flex h-2 w-2 rounded-full bg-[#D90077] animate-pulse" />
          <span>{isOpen ? 'Close Studio' : 'Edit Website ✎'}</span>
        </button>
      </div>

      {/* ── VISUAL STUDIO EXPANDED DRAWER ────────────────────────────── */}
      {isOpen && (
        <aside
          role="dialog"
          aria-label="Amanda's Visual Studio Suite"
          className="fixed top-0 right-0 bottom-0 z-[9995] w-full max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        >
          {/* Studio Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-[#FAF9F6]">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D90077]" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F172A]">Amanda’s Visual Studio</h3>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Edit texts, images, typography, and structure</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-700 p-1 text-base"
              title="Close Panel"
            >
              ✕
            </button>
          </div>

          {/* Quick Toolbar Modes */}
          <div className="p-4 border-b border-slate-100 bg-white grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setIsPickerActive(true);
                showToast('Click any element on the page now');
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-[#D90077] hover:text-white text-slate-700 text-xs font-bold transition"
            >
              <span>👆 Click &amp; Pick</span>
            </button>
            <button
              onClick={() => {
                setDirectTyping(!directTyping);
                showToast(directTyping ? 'Direct Typing Disabled' : 'Direct Typing Enabled! Click text on page');
              }}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition ${
                directTyping ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>⌨ Type on Screen</span>
            </button>
          </div>

          {/* Studio Workspace Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs text-slate-700">
            {selectedEl && info ? (
              <>
                {/* Element Inspector Chip */}
                <div className="bg-[#FAF9F6] border border-slate-200/80 rounded-2xl p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase font-bold text-[#D90077]">Active Element</span>
                    <span className="font-mono text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-700 uppercase">
                      &lt;{info.tag}&gt;
                    </span>
                  </div>

                  {/* Structural Element Controls (Move, Duplicate, Delete) */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => moveElement('up')}
                      className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg hover:border-slate-400 font-semibold"
                      title="Move Up"
                    >
                      ↑ Move Up
                    </button>
                    <button
                      onClick={() => moveElement('down')}
                      className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg hover:border-slate-400 font-semibold"
                      title="Move Down"
                    >
                      ↓ Move Down
                    </button>
                    <button
                      onClick={duplicateSelectedElement}
                      className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg hover:border-slate-400 font-semibold"
                      title="Duplicate"
                    >
                      ⎘ Copy
                    </button>
                    <button
                      onClick={deleteSelectedElement}
                      className="px-2.5 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 font-semibold"
                      title="Delete"
                    >
                      ✕ Delete
                    </button>
                  </div>
                </div>

                {/* 1. TEXT EDITING CONTROL */}
                {!info.isImage && (
                  <div className="space-y-2">
                    <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                      Edit Content / Writeup:
                    </label>
                    <textarea
                      rows={4}
                      value={info.text}
                      onChange={(e) => updateText(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 outline-none focus:border-[#D90077] focus:ring-1 focus:ring-[#D90077]"
                      placeholder="Type your new writeup here..."
                    />
                  </div>
                )}

                {/* 2. IMAGE REPLACEMENT CONTROL */}
                {info.isImage && (
                  <div className="space-y-3 bg-[#FAF9F6] p-4 rounded-2xl border border-slate-200">
                    <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                      Replace Picture:
                    </label>
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={info.src || ''}
                        onChange={(e) => updateImageSrc(e.target.value)}
                        placeholder="Paste image URL (e.g. /images/worship-sanctuary.jpg)"
                        className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 outline-none focus:border-[#D90077]"
                      />
                      {/* Quick Presets of Local High-Res Church Photos */}
                      <div className="text-[10px] text-slate-500 font-bold uppercase pt-1">Or choose photo preset:</div>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { name: 'Sanctuary Worship', src: '/images/worship-sanctuary.jpg' },
                          { name: 'Preaching Pulpit', src: '/images/preaching-pulpit.jpg' },
                          { name: 'Outreach Crowd', src: '/images/outreach-crowd.jpg' },
                          { name: 'Bishops & Elders', src: '/images/elders.jpg' },
                          { name: 'Uzima Keyboard', src: '/images/sanctuary-keyboard.jpg' },
                          { name: 'Commissioning', src: '/images/laying-on-of-hands.jpg' },
                        ].map((p) => (
                          <button
                            key={p.src}
                            onClick={() => updateImageSrc(p.src)}
                            className="p-2 text-left bg-white border border-slate-200 hover:border-[#D90077] rounded-lg text-[10px] font-medium truncate"
                          >
                            📷 {p.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. FONT FAMILY / HANDWRITING SELECTOR */}
                <div className="space-y-2">
                  <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                    Font Handwriting &amp; Style:
                  </label>
                  <select
                    value={info.fontFamily}
                    onChange={(e) => updateStyle('fontFamily', e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 outline-none focus:border-[#D90077]"
                  >
                    <option value='"Instrument Serif", Book Antiqua, Georgia, serif'>Sacred Instrument Serif (Classical)</option>
                    <option value='"Archivo Variable", Archivo, sans-serif'>Modern Archivo Sans (Clean)</option>
                    <option value='"JetBrains Mono", monospace'>Architectural JetBrains Mono (Tech/Tag)</option>
                    <option value='"Caveat", cursive, sans-serif'>Warm Handwritten Script</option>
                    <option value='"Palatino", serif'>Classic Palatino Liturgical</option>
                  </select>
                </div>

                {/* 4. FONT WEIGHT & SPACING CONTROLS */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Font Weight */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                      Weight:
                    </label>
                    <select
                      value={info.fontWeight}
                      onChange={(e) => updateStyle('fontWeight', e.target.value)}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 outline-none focus:border-[#D90077]"
                    >
                      <option value="300">300 Light</option>
                      <option value="400">400 Regular</option>
                      <option value="500">500 Medium</option>
                      <option value="600">600 Semi-Bold</option>
                      <option value="700">700 Bold</option>
                      <option value="800">800 Extra-Bold</option>
                      <option value="900">900 Black</option>
                    </select>
                  </div>

                  {/* Letter Spacing */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                      Letter Spacing:
                    </label>
                    <select
                      value={info.letterSpacing}
                      onChange={(e) => updateStyle('letterSpacing', e.target.value)}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs text-slate-800 outline-none focus:border-[#D90077]"
                    >
                      <option value="-0.03em">Tight (-0.03em)</option>
                      <option value="0px">Normal (0px)</option>
                      <option value="0.08em">Loose (+0.08em)</option>
                      <option value="0.18em">Wide Tracking (+0.18em)</option>
                      <option value="0.28em">Roman Imperial (+0.28em)</option>
                    </select>
                  </div>
                </div>

                {/* Font Size & Line Height Sliders */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="flex justify-between font-bold text-[10px] text-slate-800 uppercase">
                      <span>Font Size</span>
                      <span className="text-[#D90077]">{info.fontSize}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="80"
                      value={parseInt(info.fontSize) || 16}
                      onChange={(e) => updateStyle('fontSize', `${e.target.value}px`)}
                      className="w-full accent-[#D90077]"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between font-bold text-[10px] text-slate-800 uppercase">
                      <span>Color</span>
                      <span className="text-slate-500">{info.color}</span>
                    </div>
                    <div className="flex items-center gap-1.5 pt-0.5">
                      {['#0F172A', '#334155', '#D90077', '#FFFFFF', '#D97706'].map((hex) => (
                        <button
                          key={hex}
                          onClick={() => updateStyle('color', hex)}
                          style={{ backgroundColor: hex }}
                          className="w-6 h-6 rounded-full border border-slate-300 shadow-sm transition hover:scale-110"
                          title={hex}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. AI COPILOT ASSISTANT PROMPT TOOL */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setShowAiModal(true)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#0F172A] hover:bg-[#D90077] text-white font-bold uppercase tracking-wider text-xs transition shadow-lg"
                  >
                    <span>✨ Ask AI Assistant for this Element</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#D90077]/10 text-[#D90077] text-2xl flex items-center justify-center mx-auto">
                  👆
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">No Element Selected</h4>
                  <p className="text-slate-500 text-xs mt-1 max-w-xs mx-auto">
                    Click the &quot;Select Element&quot; button at the top, then tap any text, photo, or card on the website to edit it.
                  </p>
                </div>
                <button
                  onClick={() => setIsPickerActive(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D90077] text-white rounded-full font-bold uppercase tracking-wider text-xs shadow-md"
                >
                  <span>Select an Element Now</span>
                </button>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* ── AI ASSISTANT MODAL (Amanda & AI Bridge) ──────────────────── */}
      {showAiModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🤖</span>
                <h3 className="font-bold text-slate-900 font-serif text-base">Amanda’s AI Copilot Assistant</h3>
              </div>
              <button onClick={() => setShowAiModal(false)} className="text-slate-400 hover:text-slate-700">✕</button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Tell the AI what you want to change, rewrite, or redesign for the selected element. It will prepare the exact instructions for Antigravity or ChatGPT:
            </p>

            <textarea
              rows={3}
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g. Make this sentence sound more welcoming, change the service hours, or restructure this card into 3 columns..."
              className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-800 outline-none focus:border-[#D90077]"
            />

            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={() => setShowAiModal(false)}
                className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={generateAiPrompt}
                className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D90077] hover:bg-[#B80064] text-white text-xs font-bold uppercase tracking-wider shadow-lg"
              >
                {aiCopied ? '✓ Prompt Copied!' : 'Copy Exact Prompt for AI'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
