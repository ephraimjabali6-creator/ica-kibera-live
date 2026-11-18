import { ReactNode } from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  action,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  action?: ReactNode;
}) {
  const center = align === 'center';
  return (
    <div className={`reveal flex flex-col gap-6 ${center ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}>
      <div className={center ? 'max-w-3xl' : 'max-w-2xl'}>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h-section mt-4">{title}</h2>
        {intro && <p className="lead mt-5">{intro}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
