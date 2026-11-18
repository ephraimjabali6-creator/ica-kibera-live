import Icon from './Icon';

export default function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="faq group py-1">
          <summary className="flex min-h-[64px] cursor-pointer items-center justify-between gap-6 py-4 font-display text-lg font-bold text-ink">
            {f.q}
            <span className="faq-plus flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-plum-50 text-plum-600 transition">
              <Icon name="plus" className="h-4 w-4" />
            </span>
          </summary>
          <p className="body-copy max-w-3xl pb-6">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
