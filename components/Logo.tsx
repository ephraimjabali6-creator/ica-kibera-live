import Link from 'next/link';

const ROWS = [
  ['I', 'NTERNATIONAL'],
  ['C', 'HRISTIAN'],
  ['A', 'SSEMBLIES'],
] as const;

/**
 * The ICA brand lock-up as used on conference posters:
 * globe-and-dove mark, then I / C / A stacked vertically in purple blocks
 * with the rest of each word running horizontally.
 */
export function Wordmark({ tone = 'dark', size = 'md' }: { tone?: 'light' | 'dark'; size?: 'sm' | 'md' | 'lg' }) {
  const block = { sm: 'h-[15px] w-[15px] text-[11px]', md: 'h-[18px] w-[18px] text-[13px]', lg: 'h-[30px] w-[30px] text-[21px]' }[size];
  const word = { sm: 'text-[11px]', md: 'text-[13px]', lg: 'text-[24px]' }[size];
  const gap = { sm: 'gap-[2px]', md: 'gap-[3px]', lg: 'gap-[5px]' }[size];
  const color = tone === 'light' ? 'text-white' : 'text-ink';
  return (
    <span className={`flex flex-col ${gap}`} aria-hidden="true">
      {ROWS.map(([letter, rest]) => (
        <span key={letter} className="flex items-center gap-[3px] leading-none">
          <span className={`flex shrink-0 items-center justify-center bg-plum-600 font-display font-extrabold text-white ${block}`}>{letter}</span>
          <span className={`font-display font-extrabold tracking-[0.02em] [font-stretch:125%] ${word} ${color}`}>{rest}</span>
        </span>
      ))}
    </span>
  );
}

export default function Logo({ tone = 'dark', size = 'md' }: { tone?: 'light' | 'dark'; size?: 'sm' | 'md' }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5" aria-label="ICA — International Christian Assemblies, home">
      <img
        src="/images/ica-logo.png"
        alt="ICA — International Christian Assemblies"
        width={1119}
        height={342}
        className={`shrink-0 object-contain transition duration-300 group-hover:scale-[1.03] ${size === 'sm' ? 'h-9 w-auto' : 'h-11 w-auto sm:h-12'}`}
      />
      <span className="sr-only">ICA — International Christian Assemblies</span>
    </Link>
  );
}
