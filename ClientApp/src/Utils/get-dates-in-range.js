export default function getDatesInRange(start, end) {
  const date = new Date(start.getTime());

  date.setDate(date.getDate() + 1);

  const dates = [];

  while (date < end) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
}
