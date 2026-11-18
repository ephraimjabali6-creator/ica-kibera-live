import { formHandler } from '../../lib/formHandler';
import { parseVisitBody } from '../../lib/validation';
import { recordVisit } from '../../lib/db';
import { notifyVisit } from '../../lib/email';

export default formHandler({
  name: 'visit',
  parse: parseVisitBody,
  save: recordVisit,
  notify: notifyVisit,
  success: (d) => `Karibu${d.name ? `, ${d.name.split(' ')[0]}` : ''}! Our welcome team will look out for you and reach out before your visit.`,
});
