
export type OrderItem = {
  id: number;
  name: string;
  note: string | null;
  addons: any[]; // can refine later if addons have structure
  amount: number;
  discount: number | null;
  quantity: number;
  productId: number;
  totalCost: number;
  totalAmount: number;
  discountName: string | null;
  discountType: string | null;
  discountAmount: number;
  costWithoutDiscount: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  isPaid: boolean;
  status: "NEW" | "PAID" | "CANCELLED" | string; // extend as needed
  billAmount: string;
  customerId: string | null;
  discountId: string | null;
  paidAmount: string;
  carryBagFee: string;
  paymentMode: "CASH" | "CARD" | "UPI" | string; // extend as needed
  totalDiscount: string;
  totalQuantity: string;
  discountAmount: string;
  billWithoutDiscount: string;
};


/**
 * 
 * @param order 
 * @param products 
 * @returns calculated order
 */
export function applyInvoice(order: Order, products: number): Order {
 const neworder: Order = {
    ...order,
    billWithoutDiscount: '', // override field
  };
    return neworder;
}