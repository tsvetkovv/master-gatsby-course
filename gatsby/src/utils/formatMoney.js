const formatter = Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
});

export default function formatMoney(cents) {
  return formatter.format(cents / 100);
}
