export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function calcMinutesLeft(dateStr: string) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}

export function generateOrderId() {
  const randomNumber = Math.floor(1 + Math.random() * 999);
  return `${randomNumber.toString().padStart(3, '0')}`;
}
