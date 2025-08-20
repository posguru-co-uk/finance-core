function u(o, s) {
  const e = {
    ...o,
    items: [...o.items]
    // shallow copy of items
  }, i = {};
  for (const t of s)
    i[t.id] = t;
  for (const t of o.items) {
    const n = i[t.productId];
    n && (t.amount = n.salesPrice, t.totalCost = t.quantity * t.amount);
  }
  return e.billAmount = e.items.reduce(
    (t, n) => t + (n.totalCost ?? 0),
    0
  ), e;
}
function c(o) {
  return {
    id: Date.now().toString(),
    productId: o.id,
    quantity: 1,
    addons: o.addons || [],
    name: o.name,
    note: null,
    amount: o.salesPrice,
    discount: 0,
    totalCost: 0,
    totalAmount: 0,
    discountName: null,
    discountType: null,
    discountAmount: 0,
    costWithoutDiscount: 0
  };
}
export {
  u as applyInvoice,
  c as createOrderItem
};
