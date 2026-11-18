import { useEffect, useState } from 'react';
import Icon from './Icon';

interface ComponentMetadata {
  id: string;
  name: string;
  file: string;
  description: string;
}

interface SavedNote {
  id: string;
  section: string;
  file: string;
  note: string;
  timestamp: string;
}

const REGISTRY: Record<string, ComponentMetadata> = {
  header: {
    id: 'header',
    name: 'Header & Navigation',
    file: 'components/Header.tsx & content/nav.ts',
    description: 'Logo, navigation links, and "Plan a visit" button.',
  },
  hero: {
    id: 'hero',
    name: 'Homepage Hero & Headline',
    file: 'pages/index.tsx & content/church.ts',
    description: 'Bishop Andrew portrait, headline ("Come as you are. Leave transformed"), service time tags.',
  },
  servicetimes: {
    id: 'servicetimes',
    name: 'Service Times & Timetable',
    file: 'content/church.ts (GATHERINGS)',
    description: 'Sunday 1st & 2nd services, Midweek Bible Study, Friday Kesha hours.',
  },
  ministries: {
    id: 'ministries',
    name: 'Ministries Showcase',
    file: 'content/church.ts (MINISTRIES)',
    description: 'Uzima Choir, Alabaster Ladies, Teens & Youth, Children Church, Intercessors, Outreach.',
  },
  sermons: {
    id: 'sermons',
    name: 'Sermons & Messages',
    file: 'content/church.ts (SERMONS) & pages/messages.tsx',
    description: 'YouTube video IDs, message titles, speakers, and video modal.',
  },
  giving: {
    id: 'giving',
    name: 'Giving & Tithes Channel',
    file: 'content/church.ts (CHURCH.giving) & pages/give.tsx',
    description: 'M-Pesa Paybill number, Account names, Till Number, and Bank wire details.',
  },
  visit: {
    id: 'visit',
    name: 'Plan Your Visit & Map',
    file: 'pages/visit.tsx & content/church.ts',
    description: 'Interactive Google Map, public transit (Matatu #8 & #42), what to expect, and visitor form.',
  },
  about: {
    id: 'about',
    name: 'About ICA & Leadership',
    file: 'pages/about.tsx & content/church.ts',
    description: 'Our story in Kibera, Bishop Andrew & Dr. Ruth Ouma profiles, and Statement of Faith.',
  },
  prayer: {
    id: 'prayer',
    name: 'Prayer Requests',
    file: 'pages/prayer.tsx & components/Forms.tsx',
    description: 'Confidential prayer request form sent to pastors and intercessors.',
  },
  contact: {
    id: 'contact',
    name: 'Contact & WhatsApp Info',
    file: 'pages/contact.tsx & content/church.ts',
    description: 'Church phone number, WhatsApp link, email, social links, and message form.',
  },
  footer: {
    id: 'footer',
    name: 'Footer',
    file: 'components/Footer.tsx & content/church.ts',
    description: 'Scripture verse, quick links, copyright, and location coordinates.',
  },
};

export default function ComponentInspector() {
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState<ComponentMetadata | null>(null);
  const [customSuggestion, setCustomSuggestion] = useState('');
  const [copied, setCopied] = useState(false);
  const [liveEditEnabled, setLiveEditEnabled] = useState(false);
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);

  // Load saved notes from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('ica_edit_suggestions');
      if (stored) setSavedNotes(JSON.parse(stored));
    } catch {
      // ignore
    }
  }, []);

  function saveNotes(notes: SavedNote[]) {
    setSavedNotes(notes);
    try {
      localStorage.setItem('ica_edit_suggestions', JSON.stringify(notes));
    } catch {
      // ignore
    }
  }

  // Toggle visual highlighter when active
  useEffect(() => {
    if (!active) {
      document.body.classList.remove('inspector-mode');
      return;
    }
    document.body.classList.add('inspector-mode');

    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest('[data-inspect]');
      if (target) {
        e.preventDefault();
        e.stopPropagation();
        const key = target.getAttribute('data-inspect') || '';
        if (REGISTRY[key]) {
          setSelected(REGISTRY[key]);
        }
      }
    }

    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
      document.body.classList.remove('inspector-mode');
    };
  }, [active]);

  // Toggle contentEditable for live in-browser testing
  useEffect(() => {
    document.designMode = liveEditEnabled ? 'on' : 'off';
    return () => {
      document.designMode = 'off';
    };
  }, [liveEditEnabled]);

  function copyPrompt() {
    if (!selected) return;
    const promptText = `Please update the [${selected.name}] component (found in ${selected.file}):\n\nChange requested:\n"${customSuggestion || 'I would like to update this component.'}"`;
    navigator.clipboard.writeText(promptText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  }

  function shareWhatsApp(textToSend?: string) {
    let msg = textToSend;
    if (!msg && selected) {
      msg = `Hi! Here is a suggestion for the ICA Church Website:\n\n*Section:* ${selected.name}\n*File:* ${selected.file}\n*Change:* ${customSuggestion || 'Please check this section'}`;
    }
    if (!msg) return;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }

  function addNoteToList() {
    if (!selected || !customSuggestion.trim()) return;
    const newNote: SavedNote = {
      id: String(Date.now()),
      section: selected.name,
      file: selected.file,
      note: customSuggestion.trim(),
      timestamp: new Intl.DateTimeFormat('en-KE', { timeStyle: 'short' }).format(new Date()),
    };
    saveNotes([newNote, ...savedNotes]);
    setCustomSuggestion('');
  }

  function deleteNote(id: string) {
    saveNotes(savedNotes.filter((n) => n.id !== id));
  }

  function sendAllNotesWhatsApp() {
    if (savedNotes.length === 0) return;
    const header = `📋 *ICA Church Website - All Edit Suggestions:*\n\n`;
    const body = savedNotes
      .map((n, i) => `${i + 1}. *[${n.section}]*\n   ${n.note}\n   (Location: ${n.file})\n`)
      .join('\n');
    shareWhatsApp(header + body);
  }

  return (
    <>
      <style jsx global>{`
        body.inspector-mode [data-inspect] {
          outline: 2px dashed #e6007e !important;
          outline-offset: 4px;
          cursor: pointer !important;
          position: relative;
          transition: outline-color 0.2s;
        }
        body.inspector-mode [data-inspect]:hover {
          outline: 3px solid #d90077 !important;
          background-color: rgba(217, 0, 119, 0.04);
        }
      `}</style>

      {/* FLOATING TRIGGER BUTTON */}
      <div className="fixed bottom-20 right-4 z-50 flex items-center gap-2 sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={() => {
            setActive(!active);
            if (!active && !selected) setSelected(REGISTRY.hero);
          }}
          className={`flex items-center gap-2 rounded-full px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider shadow-2xl transition duration-300 ${
            active
              ? 'bg-plum-700 text-white ring-4 ring-plum-300'
              : 'border border-line bg-white text-ink hover:border-plum-500 hover:text-plum-600'
          }`}
          title="Component Inspector & Edit Tool"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-plum-100 text-plum-700">
            {active ? '✕' : '✎'}
          </span>
          <span>{active ? 'Close Edit Tool' : 'Suggest / Edit Website'}</span>
          {savedNotes.length > 0 && !active && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-plum-600 text-[10px] text-white">
              {savedNotes.length}
            </span>
          )}
        </button>
      </div>

      {/* INSPECTOR & LIVE SUGGESTION DRAWER */}
      {active && (
        <aside
          role="dialog"
          aria-label="Component Inspector & Suggestion Tool"
          className="fixed bottom-0 right-0 top-0 z-[100] flex w-full max-w-md flex-col border-l border-line bg-white shadow-2xl animate-in slide-in-from-right duration-300"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line p-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-plum-100 text-plum-700 font-bold">
                ✎
              </span>
              <div>
                <h2 className="font-display text-base font-bold text-ink">Website Edit & Suggest Tool</h2>
                <p className="font-mono text-[11px] text-ink-faint">Click any section on screen to inspect</p>
              </div>
            </div>
            <button
              onClick={() => setActive(false)}
              className="rounded-lg p-1.5 text-ink-muted hover:bg-mist hover:text-ink"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Quick Component Selector */}
          <div className="border-b border-line bg-mist/60 px-5 py-3">
            <label htmlFor="comp-select" className="block font-mono text-[10px] font-bold uppercase tracking-wider text-ink-faint">
              Jump to Section:
            </label>
            <select
              id="comp-select"
              value={selected?.id || ''}
              onChange={(e) => setSelected(REGISTRY[e.target.value] || null)}
              className="mt-1.5 block w-full rounded-lg border border-line bg-white px-3 py-2 text-xs font-medium text-ink shadow-sm outline-none focus:border-plum-500"
            >
              {Object.values(REGISTRY).map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {selected && (
              <>
                <div className="rounded-xl border border-plum-200 bg-plum-50/60 p-4">
                  <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-plum-700">Selected Section</span>
                  <h3 className="mt-1 font-display text-lg font-bold text-ink">{selected.name}</h3>
                  <p className="mt-1 text-xs text-ink-muted">{selected.description}</p>
                  <div className="mt-2.5 inline-block rounded bg-white px-2 py-0.5 font-mono text-[10px] text-plum-700 border border-plum-200">
                    📂 {selected.file}
                  </div>
                </div>

                {/* Live In-Browser Edit Toggle */}
                <div className="rounded-xl border border-line bg-mist/40 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-display text-xs font-bold text-ink">Type Directly on Website</span>
                      <p className="text-[11px] text-ink-faint">Click and edit any text to test how it looks</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setLiveEditEnabled(!liveEditEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        liveEditEnabled ? 'bg-plum-600' : 'bg-gray-300'
                      }`}
                      aria-pressed={liveEditEnabled}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          liveEditEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  {liveEditEnabled && (
                    <p className="mt-2.5 rounded bg-emerald-50 p-2 text-[11px] text-emerald-800 border border-emerald-200">
                      ✓ Active: You can now click any heading or sentence on the page and type your edits directly!
                    </p>
                  )}
                </div>

                {/* Change Suggestion Box */}
                <div className="space-y-3">
                  <label htmlFor="suggestion-box" className="block font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
                    Write Your Change / Suggestion:
                  </label>
                  <textarea
                    id="suggestion-box"
                    rows={3}
                    value={customSuggestion}
                    onChange={(e) => setCustomSuggestion(e.target.value)}
                    placeholder="e.g. Change Sunday first service to 9:00 AM, update the phone number, or replace this photo..."
                    className="block w-full rounded-xl border border-line bg-white p-3 text-xs text-ink outline-none transition placeholder:text-ink-faint focus:border-plum-500 focus:ring-2 focus:ring-plum-100"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={addNoteToList}
                      disabled={!customSuggestion.trim()}
                      className="flex items-center justify-center gap-1.5 rounded-xl border border-plum-600 bg-plum-50 py-2.5 font-mono text-xs font-bold uppercase text-plum-700 hover:bg-plum-100 disabled:opacity-40 transition"
                    >
                      + Save to List
                    </button>
                    <button
                      type="button"
                      onClick={() => shareWhatsApp()}
                      disabled={!customSuggestion.trim()}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 py-2.5 font-mono text-xs font-bold uppercase text-white hover:bg-emerald-700 disabled:opacity-40 transition shadow-sm"
                    >
                      Send on WhatsApp
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={copyPrompt}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-plum-600 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow hover:bg-plum-700 transition"
                  >
                    {copied ? (
                      <>
                        <Icon name="check" className="h-4 w-4" /> Copied!
                      </>
                    ) : (
                      <>
                        <Icon name="copy" className="h-4 w-4" /> Copy for AI Assistant
                      </>
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Saved Notes List */}
            {savedNotes.length > 0 && (
              <div className="border-t border-line pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink">
                    Your Changes List ({savedNotes.length})
                  </span>
                  <button
                    onClick={() => saveNotes([])}
                    className="text-[10px] text-red-600 hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-2">
                  {savedNotes.map((n) => (
                    <div key={n.id} className="rounded-lg border border-line bg-mist/60 p-3 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-plum-700">{n.section}</span>
                        <button
                          onClick={() => deleteNote(n.id)}
                          className="text-ink-faint hover:text-red-600"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="mt-1 text-ink">{n.note}</p>
                      <p className="mt-1 font-mono text-[9px] text-ink-faint">{n.file}</p>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={sendAllNotesWhatsApp}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 font-mono text-xs font-bold uppercase text-white shadow hover:bg-emerald-700 transition"
                >
                  Send All Notes via WhatsApp ↗
                </button>
              </div>
            )}
          </div>
        </aside>
      )}
    </>
  );
}
