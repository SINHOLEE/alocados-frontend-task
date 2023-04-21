export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';

  return `${year}-${month}-${day}, ${amOrPm} ${hours}:${minutes}`;
};
