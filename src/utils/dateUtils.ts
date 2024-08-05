export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${day}/${month}/${year}`;
}

export function formatDatePut(dateString: string) {
  const date = new Date(dateString);
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear().toString();
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export function formatDateInput(dateString: string) {
  dateString = dateString.replace(/\//g, "-");

  const [day, month, year] = dateString.split("-");
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};