function n(e, i) {
  const s = {
    ...e,
    items: [...e.items]
    // shallow copy of items
  }, c = {};
  for (const t of i)
    c[t.id] = t;
  for (const t of s.items) {
    const o = c[t.productId];
    o && (t.amount = o.salesPrice, t.totalCost = t.quantity * o.salesPrice);
  }
  return s.billAmount = s.items.reduce(
    (t, o) => t + (o.totalCost ?? 0),
    0
  ), s;
}
export {
  n as applyInvoice
};
