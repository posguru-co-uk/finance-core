export type OrderItem = {
    id: number;
    name: string;
    note: string | null;
    addons: any[];
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
    status: "NEW" | "PAID" | "CANCELLED" | string;
    billAmount: string;
    customerId: string | null;
    discountId: string | null;
    paidAmount: string;
    carryBagFee: string;
    paymentMode: "CASH" | "CARD" | "UPI" | string;
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
export declare function applyInvoice(order: Order, products: number): Order;
