const hour_ms = 60 * 60 * 1000;
const day_ms = 24 * hour_ms;
const week_ms = 7 * day_ms;
const month_ms = 30 * day_ms;
const year_ms = 365 * day_ms;

export function reldate(date: Date, locale: string = navigator.language): string {
  const formatter = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const now = new Date();
  const delta = date.getTime() - now.getTime();
  const absDelta = Math.abs(delta);

  if (absDelta <= day_ms) {
    return formatter.format(Math.round(delta / hour_ms), 'hour');
  } else if (absDelta <= week_ms) {
    return formatter.format(Math.round(delta / day_ms), 'day');
  } else if (absDelta <= month_ms) {
    return formatter.format(Math.round(delta / week_ms), 'week');
  } else if (absDelta <= year_ms) {
    return formatter.format(
      date.getFullYear() * 12 + date.getMonth() - now.getFullYear() * 12 - now.getMonth(),
      'month',
    );
  } else {
    return formatter.format(date.getFullYear() - now.getFullYear(), 'year');
  }
}
