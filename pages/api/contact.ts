import { formHandler } from '../../lib/formHandler';
import { parseContactBody } from '../../lib/validation';
import { recordContact } from '../../lib/db';
import { notifyContact } from '../../lib/email';

export default formHandler({
  name: 'contact',
  parse: parseContactBody,
  save: recordContact,
  notify: notifyContact,
  success: () => 'Thank you — your message is with the church office. We’ll get back to you soon.',
});
