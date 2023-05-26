export default function isValidDate(dateString) {
  // if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
  //   return false;
  // }
  // const date = new Date(dateString);
  // return !Number.isNaN(date.getTime());
  const date = new Date(dateString);
  return date.getTime();
}
