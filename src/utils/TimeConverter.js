function formatHours(hours) {
  let result = parseInt(hours, 10);

  if (result === 0) {
    result = 12;
  }

  return result > 12 ? result - 12 : result;
}

export default function timeConverter(time) {
  const hours = time.substring(0, time.indexOf(':'));
  const formattedHours = formatHours(hours);
  const minutes = time.substring(time.indexOf(':') + 1, time.length);
  const suffix = hours < 12 ? 'am' : 'pm';

  return `${formattedHours}:${minutes}${suffix}`;
}
