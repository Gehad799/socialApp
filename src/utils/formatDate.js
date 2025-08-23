export function formatDate(date) {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  return new Date(date).toLocaleString("en-US", options);
}
