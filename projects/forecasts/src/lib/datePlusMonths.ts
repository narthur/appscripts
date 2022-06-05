import dayjs from 'dayjs';

// Return first day of the month n months from now.
export default function datePlusMonths(date: Date, months: number): Date {
  return dayjs(date).startOf('month').add(months, 'month').toDate();
}
