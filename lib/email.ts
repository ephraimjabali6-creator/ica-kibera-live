import { Resend } from 'resend';
import { escapeHtml } from './validation';

type Row = [label: string, value: string | number | boolean | undefined];

function card(title: string, rows: Row[], body?: string) {
  const items = rows
    .filter(([, v]) => v !== undefined && v !== '' && v !== false)
    .map(([k, v]) => `<p style="margin:4px 0"><strong>${escapeHtml(k)}:</strong> ${escapeHtml(String(v === true ? 'Yes' : v))}</p>`)
    .join('');
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;padding:28px;color:#16121D">
      <p style="letter-spacing:.16em;text-transform:uppercase;font-size:11px;color:#5A2788;margin:0 0 8px">ICA</p>
      <h1 style="font-size:22px;margin:0 0 16px">${escapeHtml(title)}</h1>
      ${items}
      ${body ? `<div style="margin-top:16px;padding:16px;background:#F6F1FB;border-radius:8px;white-space:pre-wrap">${escapeHtml(body)}</div>` : ''}
    </div>`;
}

async function send(to: string | undefined, subject: string, html: string, replyTo?: string) {
  if (!process.env.RESEND_API_KEY || !to) {
    console.log(`[email:dev] ${subject} → ${to || '(NOTIFY_EMAIL not set)'}`);
    return;
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL || 'ICA <hello@ica.or.ke>',
    to: [to],
    subject,
    html,
    ...(replyTo ? { reply_to: replyTo } : {}),
  });
}

export function notifyContact(d: { name: string; email: string; phone: string; subject: string; message: string; id: string }) {
  return send(
    process.env.NOTIFY_EMAIL,
    `New message — ${d.subject || 'Website enquiry'} (${d.name})`,
    card('New website message', [['Name', d.name], ['Email', d.email], ['Phone', d.phone], ['Ref', d.id]], d.message),
    d.email || undefined
  );
}

export function notifyPrayer(d: { name: string; email: string; phone: string; request: string; isPrivate: boolean; wantsCall: boolean; id: string }) {
  return send(
    process.env.PRAYER_TEAM_EMAIL || process.env.NOTIFY_EMAIL,
    `${d.wantsCall ? '[Call requested] ' : ''}Prayer request from ${d.name}`,
    card('New prayer request', [['Name', d.name], ['Phone', d.phone], ['Email', d.email], ['Pastors only', d.isPrivate], ['Wants a call', d.wantsCall], ['Ref', d.id]], d.request)
  );
}

export function notifyVisit(d: { name: string; email: string; phone: string; visitDate: string; service: string; adults: number; children: number; notes: string; id: string }) {
  return send(
    process.env.NOTIFY_EMAIL,
    `Planned visit: ${d.name}${d.visitDate ? ` on ${d.visitDate}` : ''}`,
    card('Someone is planning a visit', [['Name', d.name], ['Phone', d.phone], ['Email', d.email], ['Date', d.visitDate], ['Service', d.service], ['Adults', d.adults], ['Children', d.children], ['Ref', d.id]], d.notes)
  );
}

export async function notifyRegistration(d: { ref: string; name: string; phone: string; email: string; seats: number; eventTitle: string; when: string; items: { label: string; qty: number }[] }) {
  const rows: Row[] = [['Reference', d.ref], ['Event', d.eventTitle], ['When', d.when], ['Seats', d.seats], ['Name', d.name], ['Phone', d.phone], ['Email', d.email]];
  await send(process.env.NOTIFY_EMAIL, `Registration ${d.ref}: ${d.eventTitle} (${d.seats})`, card('New event registration', rows));
  if (d.email) {
    await send(
      d.email,
      `You're registered — ${d.eventTitle} (${d.ref})`,
      card(`See you there, ${d.name.split(' ')[0]}!`, [['Reference', d.ref], ['Event', d.eventTitle], ['When', d.when], ['Seats', d.items.map((i) => `${i.qty} × ${i.label}`).join(', ')]], 'Show this reference at the welcome desk. Karibu!')
    );
  }
}
