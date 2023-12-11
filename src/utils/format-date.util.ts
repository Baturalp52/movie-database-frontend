import { format } from 'date-fns';

const DATE_FORMAT = 'MMM dd, yyyy';

export function formatDate(date: Date) {
  return format(date, DATE_FORMAT);
}
