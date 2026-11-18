import { formHandler } from '../../lib/formHandler';
import { parsePrayerBody } from '../../lib/validation';
import { recordPrayer } from '../../lib/db';
import { notifyPrayer } from '../../lib/email';

export default formHandler({
  name: 'prayer',
  limit: 5,
  parse: parsePrayerBody,
  save: recordPrayer,
  notify: notifyPrayer,
  success: (d) =>
    d.wantsCall
      ? 'We’ve received your request. Our intercessors are praying, and a pastor will call you.'
      : 'We’ve received your request. Our intercessors are standing with you in prayer.',
});
