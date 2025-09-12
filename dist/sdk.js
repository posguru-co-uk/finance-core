function h(n, p) {
  var e, l;
  let i = 0, a = (((e = n.items) == null ? void 0 : e.reduce((t, d) => d.id && d.id > t ? d.id : t, 0)) || 0) + 1;
  return (l = n.items) == null || l.forEach((t, d) => {
    var r, I;
    const u = p[t.productId];
    if (!u) return;
    t.id || (t.id = a++);
    const c = u.salesPrice * t.quantity;
    t.amount = u.salesPrice, t.totalCost = c, t.totalAmount = c, t.costWithoutDiscount = c, t.productId = u.id, i += c;
    let b = (((r = t.addons) == null ? void 0 : r.reduce((o, s) => s.id && s.id > o ? s.id : o, 0)) || 0) + 1;
    (I = t.addons) == null || I.forEach((o, s) => {
      var f;
      const A = (f = u.addonItems) == null ? void 0 : f[o.addonItemId];
      A && (o != null && o.id || (o.id = b++), o.orderItemsId = t.id, o.totalAmount = A.amount * o.quantity, i += o.totalAmount);
    });
  }), n.billAmount = i, n;
}
export {
  h as applyInvoice
};
