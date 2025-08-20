function applyInvoice(order, products) {
  const neworder = {
    ...order,
    items: [...order.items]
    // shallow copy of items
  };
  const productsMap = {};
  for (const product of products) {
    productsMap[product.id] = product;
  }
  for (const item of order.items) {
    const product = productsMap[item.productId];
    if (product) {
      item.amount = product.salesPrice;
      item.totalCost = item.quantity * item.amount;
    }
  }
  neworder.billAmount = neworder.items.reduce(
    (sum, item) => sum + (item.totalCost ?? 0),
    0
  );
  return neworder;
}
export {
  applyInvoice
};
