export function formatCreatedAtDate(createdAt: Date): string {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - createdAt.getTime();
  const minutesDifference = Math.floor(timeDifference / (1000 * 60));
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
  const daysDifference = Math.floor(hoursDifference / 24);

  if (daysDifference >= 1) {
    return `${daysDifference} day(s) ago`;
  } else if (hoursDifference >= 1) {
    return `${hoursDifference} hour(s) ago`;
  } else {
    return `${minutesDifference} minute(s) ago`;
  }
}
