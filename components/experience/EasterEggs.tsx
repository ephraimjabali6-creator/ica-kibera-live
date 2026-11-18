import React, { useState, useEffect } from 'react';
import { CHURCH, STATEMENT_OF_FAITH } from '../../content/church';

export const EasterEggs: React.FC = () => {
  const [isCandleOpen, setIsCandleOpen] = useState(false);
  const [candleLit, setCandleLit] = useState(false);
  const [prayerName, setPrayerName] = useState('');
  const [prayerRequest, setPrayerRequest] = useState('');
  const [prayerSent, setPrayerSent] = useState(false);

  const [isScriptureOpen, setIsScriptureOpen] = useState(false);
  const [currentScripture, setCurrentScripture] = useState({
    verse: 'Habakkuk 2:2',
    text: 'Write the vision and make it plain on tablets, that he may run who reads it.',
  });

  const [isConstitutionOpen, setIsConstitutionOpen] = useState(false);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      // Ctrl + Shift + P -> Prayer Candle Altar
      if (e.ctrlKey && e.shiftKey && (e.key === 'P' || e.key === 'p')) {
        e.preventDefault();
        setIsCandleOpen((prev) => !prev);
      }

      // Key 'S' or 's' -> Scripture Drawer
      if (e.key === 's' || e.key === 'S') {
        const promises = [
          { verse: 'Habakkuk 2:2', text: 'Write the vision and make it plain on tablets, that he may run who reads it.' },
          { verse: 'Matthew 28:19', text: 'Go therefore and make disciples of all the nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.' },
          { verse: 'Joel 2:25', text: 'So I will restore to you the years that the swarming locust has eaten.' },
          { verse: 'Genesis 26:12', text: 'Then Isaac sowed in that land, and reaped in the same year a hundredfold; and the LORD blessed him.' },
          { verse: 'Romans 8:28', text: 'And we know that all things work together for good to those who love God, to those who are the called according to His purpose.' },
          { verse: '1 Corinthians 14:40', text: 'Let all things be done decently and in order.' },
          { verse: 'Matthew 16:18', text: 'And I say also unto thee, That thou art Peter, and upon this rock I will build my church; and the gates of hell shall not prevail against it.' },
        ];
        const randomPromise = promises[Math.floor(Math.random() * promises.length)];
        setCurrentScripture(randomPromise);
        setIsScriptureOpen(true);
      }

      // Ctrl + Shift + C -> Constitution Modal
      if (e.ctrlKey && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        setIsConstitutionOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(528, audioCtx.currentTime); // 528Hz Solfeggio / miracle tone
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.8);
    } catch (e) {
      // AudioContext unavailable or blocked
    }
  };

  const handleLightCandle = () => {
    setCandleLit(true);
    playChime();
  };

  return (
    <>
      {/* Floating Interactive Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsCandleOpen(true)}
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#D90077] shadow-xl ring-1 ring-slate-200 transition-all hover:scale-110 hover:bg-[#D90077] hover:text-white"
          title="Light a Sanctuary Prayer Candle (or press Ctrl+Shift+P)"
          data-cursor-text="PRAY"
        >
          <svg className="h-6 w-6 transition-transform group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
      </div>

      {/* 1. Sanctuary Virtual Candle Modal */}
      {isCandleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-slate-200">
            <button
              onClick={() => setIsCandleOpen(false)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>

            <div className="text-center">
              <span className="text-xs font-bold tracking-widest text-[#D90077] uppercase">
                Sanctuary Intercessory Altar
              </span>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 font-serif">
                Light a Prayer Candle
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Leave a prayer intention before the Lord. Our intercessors pray over every request during Wednesday prayer and Friday night Kesha.
              </p>
            </div>

            {/* Candle Graphic with Flame */}
            <div className="my-8 flex flex-col items-center">
              <div
                onClick={handleLightCandle}
                className="group relative cursor-pointer flex flex-col items-center"
                data-cursor-text="LIGHT"
              >
                {/* Flame */}
                {candleLit ? (
                  <div className="relative mb-2 flex h-8 w-6 items-center justify-center">
                    <div className="h-6 w-4 rounded-full bg-amber-400 blur-[1px] animate-pulse" />
                    <div className="absolute h-4 w-2 rounded-full bg-white opacity-80" />
                    <div className="absolute -inset-2 rounded-full bg-amber-300/30 blur-md animate-ping" />
                  </div>
                ) : (
                  <div className="mb-2 text-xs font-semibold text-[#D90077] underline underline-offset-4 animate-bounce">
                    Click to Light Candle
                  </div>
                )}
                {/* Candle Body */}
                <div className="h-20 w-8 rounded-t-sm bg-gradient-to-b from-amber-50 to-amber-100 shadow-md ring-1 ring-amber-200" />
                <div className="h-3 w-16 rounded-full bg-amber-200/50" />
              </div>

              {candleLit && (
                <p className="mt-4 text-xs font-semibold tracking-wide text-amber-700">
                  ✦ May your prayer ascend like sweet incense before God (Psalm 141:2) ✦
                </p>
              )}
            </div>

            {/* Form */}
            {!prayerSent ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!candleLit) handleLightCandle();
                  setPrayerSent(true);
                }}
                className="space-y-3"
              >
                <input
                  type="text"
                  placeholder="Your Name (or leave blank for Anonymous)"
                  value={prayerName}
                  onChange={(e) => setPrayerName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#D90077] focus:outline-none"
                />
                <textarea
                  required
                  placeholder="Enter your prayer request, healing need, or thanksgiving..."
                  rows={3}
                  value={prayerRequest}
                  onChange={(e) => setPrayerRequest(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-[#D90077] focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#0F172A] py-3 text-sm font-bold text-white shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-[#D90077]"
                >
                  Place on Intercession Altar
                </button>
              </form>
            ) : (
              <div className="rounded-2xl bg-emerald-50 p-6 text-center text-emerald-800">
                <div className="text-2xl">🕊️</div>
                <h4 className="mt-2 font-bold">Your Prayer Has Been Placed on the Altar</h4>
                <p className="mt-1 text-xs text-emerald-700">
                  Bishop Andrew, Dr. Ruth, and the ICA intercessory team will lift this up before the Throne of Grace.
                </p>
                <button
                  onClick={() => {
                    setPrayerSent(false);
                    setPrayerRequest('');
                    setIsCandleOpen(false);
                  }}
                  className="mt-4 rounded-full bg-emerald-700 px-6 py-2 text-xs font-bold text-white"
                >
                  Amen
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Scripture of the Moment Drawer (Press 'S') */}
      {isScriptureOpen && (
        <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
          <div className="flex w-full max-w-2xl items-center justify-between rounded-2xl bg-[#0F172A] p-5 text-white shadow-2xl ring-1 ring-slate-800 animate-in slide-in-from-bottom duration-200">
            <div className="pr-4">
              <span className="text-[10px] font-bold tracking-widest text-[#D90077] uppercase">
                Scripture Promise · {currentScripture.verse}
              </span>
              <p className="mt-1 text-sm font-serif italic text-slate-200">
                “{currentScripture.text}”
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`${currentScripture.verse}: "${currentScripture.text}"`);
                  alert('Scripture copied to clipboard!');
                }}
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/20"
              >
                Copy
              </button>
              <button
                onClick={() => setIsScriptureOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. 1995 Founding Constitution Modal */}
      {isConstitutionOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-slate-200">
            <button
              onClick={() => setIsConstitutionOpen(false)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>

            <span className="text-xs font-bold tracking-widest text-[#D90077] uppercase">
              Archival Charter Excerpt · Founded 1995
            </span>
            <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 font-serif">
              ICA Constitution & By-Laws (Preamble)
            </h3>
            
            <div className="mt-6 space-y-4 text-xs leading-relaxed text-slate-600">
              <div className="rounded-xl bg-slate-50 p-4 border-l-4 border-[#D90077]">
                <p className="font-semibold text-slate-800">
                  {CHURCH.charterPreamble}
                </p>
              </div>

              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                The Three Inviolable Pillars:
              </h4>
              <ul className="list-disc pl-5 space-y-1">
                {CHURCH.pillars.map((p) => (
                  <li key={p.number}>
                    <strong className="text-slate-800">{p.title}:</strong> {p.summary}
                  </li>
                ))}
              </ul>

              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] pt-2">
                Mandate Statement:
              </h4>
              <p>
                “To raise a church of ministers who are scripture oriented, able and community sensitive; and not mere members.”
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsConstitutionOpen(false)}
                className="rounded-full bg-[#0F172A] px-6 py-2 text-xs font-bold text-white hover:bg-[#D90077]"
              >
                Close Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
