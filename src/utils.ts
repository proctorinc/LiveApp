export function formatTimeSince(date: Date): string {
  const since = getTimeSince(date);

  if (since.days > 0) {
    return `${since.days}d`;
  } else if (since.hours > 0) {
    return `${since.hours}h`;
  } else if (since.minutes > 0) {
    return `${since.minutes}m`;
  } else {
    return `${since.seconds}s`;
  }
}

export function getTimeSince(date: Date) {
  const now = Date.now();
  // Time Difference in Milliseconds
  const diffMs: number = new Date(date).getTime() - now;

  // Total number of seconds in the difference
  const totalSeconds = Math.abs(Math.floor(diffMs / 1000));

  // Total number of minutes in the difference
  const totalMinutes = Math.abs(Math.floor(totalSeconds / 60));

  // Total number of hours in the difference
  const totalHours = Math.abs(Math.floor(totalMinutes / 60));

  // Total number of hours in the difference
  const totalDays = Math.abs(Math.floor(totalHours / 24));

  return {
    ms: diffMs,
    seconds: totalSeconds,
    minutes: totalMinutes,
    hours: totalHours,
    days: totalDays,
  };
}

export function shortenUsername(username: string) {
  return username.substring(0, 2).toUpperCase();
}

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const formatDate = (date: Date) => {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};
