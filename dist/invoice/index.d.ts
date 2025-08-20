export interface LocalizedText {
    [langCode: string]: string;
}
export interface AddonItem {
    id: number;
    item: LocalizedText;
    rank: number;
    amount: string;
    defaultSelect: boolean;
}
export interface Addon {
    id: number;
    name: LocalizedText;
    rank: number;
    status: "ACTIVE" | "INACTIVE" | string;
    maximum: number;
    minimum: number;
    addonItems: AddonItem[];
}
export interface Product {
    id: string;
    name: LocalizedText;
    allergens: string[];
    masterItemId: string | null;
    description: string;
    color: string;
    isSellOnTill: boolean;
    categoryId: string;
    costPrice: string;
    salesPriceWithoutTax: string;
    salesPrice: number;
    taxRateId: string;
    isDeleted: boolean;
    addons: Addon[];
}
export interface OrderItem {
    id: String;
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
}
export interface Order {
    id: string;
    items: OrderItem[];
    isPaid: boolean;
    status: "NEW" | "PAID" | "CANCELLED" | string;
    billAmount: number;
    customerId: string | null;
    discountId: string | null;
    paidAmount: number;
    carryBagFee: number;
    paymentMode: "CASH" | "CARD" | "UPI" | string;
    totalDiscount: number;
    totalQuantity: number;
    discountAmount: number;
    billWithoutDiscount: number;
}
/**
 *
 * @param order
 * @param products
 * @returns calculated order
 */
export declare function applyInvoice(order: Order, products: Array<Product>): Order;
