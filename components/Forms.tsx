import { FormEvent, ReactNode, useState } from 'react';
import Icon from './Icon';
import { api, ApiError } from '../lib/api';
import { GATHERINGS } from '../content/church';

type Status = { state: 'idle' | 'sending' | 'done' | 'error'; message?: string; field?: string };

function useSubmit(endpoint: string) {
  const [status, setStatus] = useState<Status>({ state: 'idle' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data: Record<string, unknown> = {};
    new FormData(form).forEach((v, k) => (data[k] = v));
    form.querySelectorAll<HTMLInputElement>('input[type=checkbox]').forEach((c) => (data[c.name] = c.checked));
    setStatus({ state: 'sending' });
    try {
      const json = await api<{ message?: string }>(endpoint, { method: 'POST', json: data });
      setStatus({ state: 'done', message: json.message });
      form.reset();
    } catch (err) {
      const e = err as ApiError;
      setStatus({ state: 'error', message: e.message, field: e.field });
      if (e.field) form.querySelector<HTMLElement>(`[name="${e.field}"]`)?.focus();
    }
  }
  return { status, onSubmit, reset: () => setStatus({ state: 'idle' }) };
}

function Field({ label, name, hint, children, status }: { label: string; name: string; hint?: string; children: ReactNode; status: Status }) {
  const invalid = status.state === 'error' && status.field === name;
  return (
    <div>
      <label htmlFor={name} className="label">{label}</label>
      {children}
      {invalid ? (
        <p id={`${name}-err`} className="mt-1.5 text-sm font-medium text-red-700">{status.message}</p>
      ) : hint ? (
        <p className="mt-1.5 text-[13px] text-ink-faint">{hint}</p>
      ) : null}
    </div>
  );
}

function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>Company<input name="company" tabIndex={-1} autoComplete="off" /></label>
    </div>
  );
}

function Success({ title, message, onReset, again }: { title: string; message?: string; onReset: () => void; again: string }) {
  return (
    <div role="status" className="rounded-[2px] bg-plum-50 p-8 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-plum-500 text-paper">
        <Icon name="check" className="h-7 w-7" />
      </span>
      <h3 className="mt-5 font-display text-2xl font-extrabold text-ink">{title}</h3>
      <p className="body-copy mx-auto mt-2 max-w-md">{message}</p>
      <button onClick={onReset} className="link-arrow mt-6">{again}</button>
    </div>
  );
}

function FormError({ status }: { status: Status }) {
  if (status.state !== 'error' || status.field) return null;
  return <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800">{status.message}</p>;
}

function Submit({ status, children }: { status: Status; children: ReactNode }) {
  return (
    <button type="submit" disabled={status.state === 'sending'} className="btn-primary w-full disabled:opacity-60 sm:w-auto">
      {status.state === 'sending' ? 'Sending…' : children}
    </button>
  );
}

export function VisitForm() {
  const { status, onSubmit, reset } = useSubmit('/api/visit');
  if (status.state === 'done') return <Success title="We can’t wait to meet you" message={status.message} onReset={reset} again="Plan another visit" />;
  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <Honeypot />
      <div className="sm:col-span-2"><Field label="Your name" name="name" status={status}><input id="name" name="name" required autoComplete="name" className="field" /></Field></div>
      <Field label="Phone / WhatsApp" name="phone" hint="So we can say hello before Sunday." status={status}><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="07xx xxx xxx" className="field" /></Field>
      <Field label="Email (optional)" name="email" status={status}><input id="email" name="email" type="email" autoComplete="email" className="field" /></Field>
      <Field label="When are you coming?" name="visitDate" status={status}><input id="visitDate" name="visitDate" type="date" className="field" /></Field>
      <Field label="Which service?" name="service" status={status}>
        <select id="service" name="service" className="field" defaultValue="Not sure yet">
          {GATHERINGS.map((g) => <option key={g.name}>{`${g.day} ${g.time} — ${g.name}`}</option>)}
          <option>Not sure yet</option>
        </select>
      </Field>
      <Field label="Adults" name="adults" status={status}><input id="adults" name="adults" type="number" min={1} max={20} defaultValue={1} className="field" /></Field>
      <Field label="Children" name="children" status={status}><input id="children" name="children" type="number" min={0} max={20} defaultValue={0} className="field" /></Field>
      <div className="sm:col-span-2"><Field label="Anything we should know? (optional)" name="notes" status={status}><textarea id="notes" name="notes" rows={3} className="field" placeholder="e.g. wheelchair access, first time in church, coming with friends" /></Field></div>
      <div className="flex flex-col gap-4 sm:col-span-2"><FormError status={status} /><Submit status={status}>Let us know you’re coming <Icon name="arrow" className="h-4 w-4" /></Submit></div>
    </form>
  );
}

export function PrayerForm() {
  const { status, onSubmit, reset } = useSubmit('/api/prayer');
  if (status.state === 'done') return <Success title="We’re praying with you" message={status.message} onReset={reset} again="Share another request" />;
  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <Honeypot />
      <div className="sm:col-span-2">
        <Field label="How can we pray for you?" name="request" status={status}>
          <textarea id="request" name="request" rows={6} required className="field" placeholder="Share as much or as little as you like." />
        </Field>
      </div>
      <Field label="Your name (optional)" name="name" status={status}><input id="name" name="name" autoComplete="name" className="field" /></Field>
      <Field label="Phone / WhatsApp (optional)" name="phone" status={status}><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="07xx xxx xxx" className="field" /></Field>
      <div className="space-y-3 sm:col-span-2">
        <label className="flex min-h-[44px] cursor-pointer items-start gap-3 font-antiqua text-[18px] text-ink">
          <input type="checkbox" name="isPrivate" className="mt-1 h-5 w-5 rounded accent-plum-600" />
          <span>Keep this private — share only with the pastors.</span>
        </label>
        <label className="flex min-h-[44px] cursor-pointer items-start gap-3 font-antiqua text-[18px] text-ink">
          <input type="checkbox" name="wantsCall" className="mt-1 h-5 w-5 rounded accent-plum-600" />
          <span>I’d like a pastor to call me.</span>
        </label>
      </div>
      <div className="flex flex-col gap-4 sm:col-span-2"><FormError status={status} /><Submit status={status}>Send prayer request</Submit></div>
    </form>
  );
}

export function ContactForm({ defaultSubject = 'General question' }: { defaultSubject?: string }) {
  const { status, onSubmit, reset } = useSubmit('/api/contact');
  if (status.state === 'done') return <Success title="Message sent" message={status.message} onReset={reset} again="Send another message" />;
  return (
    <form onSubmit={onSubmit} noValidate className="relative grid gap-5 sm:grid-cols-2">
      <Honeypot />
      <Field label="Your name" name="name" status={status}><input id="name" name="name" required autoComplete="name" className="field" /></Field>
      <Field label="Phone / WhatsApp" name="phone" status={status}><input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="07xx xxx xxx" className="field" /></Field>
      <Field label="Email" name="email" hint="Phone or email — whichever you prefer." status={status}><input id="email" name="email" type="email" autoComplete="email" className="field" /></Field>
      <Field label="Subject" name="subject" status={status}>
        <select key={defaultSubject} id="subject" name="subject" className="field" defaultValue={defaultSubject}>
          <option>General question</option>
          <option>Weddings & dedications</option>
          <option>Counselling</option>
          <option>Joining a ministry</option>
          <option>Invite Bishop Andrew to minister</option>
        </select>
      </Field>
      <div className="sm:col-span-2"><Field label="Message" name="message" status={status}><textarea id="message" name="message" rows={5} required className="field" /></Field></div>
      <div className="flex flex-col gap-4 sm:col-span-2"><FormError status={status} /><Submit status={status}>Send message <Icon name="arrow" className="h-4 w-4" /></Submit></div>
    </form>
  );
}
