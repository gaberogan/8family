/**
 * @example 12:45PM
 */
export const formatTime12HourClock = (time: number) => {
  return new Date(time).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * @example Wednesday, March 15
 */
export const formatLongDate = (time: number) => {
  return new Date(time).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};
