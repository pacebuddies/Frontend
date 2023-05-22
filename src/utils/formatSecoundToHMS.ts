/**
 * Formats a number of seconds into a string of the format hh:mm:ss
 * @param time seconds to format
 */
export const formatSecondsToHMS = (time: number): string => {
  if (isNaN(time)) return '00:00:00';
  // Calculate the hours, minutes, and seconds
  const hours = Math.floor(time / 3600);
  const remainingSeconds = time % 3600;
  const mins = Math.floor(remainingSeconds / 60);
  const secs = Math.floor(remainingSeconds % 60);

  // Format the result as hh:mm:ss
  return [
    hours.toString().padStart(2, '0'),
    mins.toString().padStart(2, '0'),
    secs.toString().padStart(2, '0'),
  ].join(':');
};
