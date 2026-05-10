export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();

  const seconds = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );

  // JUST NOW
  if (seconds < 60) {
    return "Just now";
  }

  // MINUTES
  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
  }

  // HOURS
  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }

  // YESTERDAY
  const days = Math.floor(hours / 24);

  if (days === 1) {
    return "Yesterday";
  }

  // LESS THAN 7 DAYS
  if (days < 7) {
    return `${days} days ago`;
  }

  // FULL DATE
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};