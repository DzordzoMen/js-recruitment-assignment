const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
};

export default  function dateFilter (date: Date | string): string | null {
  if (!date) { return null; }
  return new Intl.DateTimeFormat('en-GB', options).format(new Date(date));
}
