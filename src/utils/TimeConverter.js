export default function timeConverter(time) {
  const hours = time.substring(0, 2);
  const formattedHours = hours > 12 ? hours - 12 : hours;
  const minutes = time.substring(3, 5);
  const suffix = hours < 12 ? 'am' : 'pm';

  return `${formattedHours}:${minutes} ${suffix}`;
}
