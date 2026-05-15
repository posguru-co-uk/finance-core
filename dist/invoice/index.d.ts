export interface Discount {
    id: string;
    name: string;
    discount: string;
    code: string;
    discountType: 'PERCENT' | 'AMOUNT' | string;
    description?: string;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    partnerId: string;
}
export interface LocalizedText {
    [langCode: string]: string;
}
export interface AddonItem {
    id: number;
    item: LocalizedText;
    rank: number;
    amount: number;
    defaultSelect: boolean;
}
export interface Room {
    id: number;
    roomId: number;
    orderId: number;
    status: string;
    amount: number;
    checkInAt: string;
    checkOutAt: string;
}
export interface AdditionalChargeItem {
    name: string;
    charge: number;
}
export interface Addon {
    id: number;
    name: LocalizedText;
    rank: number;
    status: 'ACTIVE' | 'INACTIVE' | string;
    maximum: number;
    minimum: number;
    addonItems: Record<string, AddonItem>;
}
export interface Product {
    id: number;
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
    addonItems: Record<string, AddonItem>;
    addons: Record<string, Addon>;
    serviceTypeCharges?: any;
}
export interface OrderItem {
    id: number;
    name: LocalizedText;
    orderId: number;
    productId: number;
    amount: number;
    quantity: number;
    totalAmount: number;
    createdBy?: string;
    updatedBy?: string;
    createdAt: Date;
    updatedAt: Date;
    totalCost: number;
    note?: string;
    discountAmount: number;
    costWithoutDiscount: number;
    discountId?: number | null;
    discount?: any | null;
    refundId?: number;
    isMiscellaneous?: boolean;
    courseId?: number;
    isPrinted?: boolean;
    partnerId: string;
    addons: Array<OrderItemsAddons>;
    isManualPrice?: boolean;
}
export interface OrderItemsAddons {
    name: LocalizedText;
    id: number;
    orderItemsId: number;
    addonItemId: number;
    amount: number;
    quantity: number;
    totalAmount: number;
    createdBy?: string | null;
    updatedBy?: string | null;
    createdAt: Date;
    updatedAt: Date;
    orderId: number;
    partnerId: string;
}
export interface Order {
    id: number;
    locationId: string;
    customerId?: number | null;
    status: string;
    billAmount: number;
    isDeleted: boolean;
    createdBy?: string | null;
    updatedBy?: string | null;
    createdAt: Date;
    updatedAt: Date;
    serviceType: string;
    paymentMode?: string | null;
    isPaid?: boolean | null;
    paidAmount: number;
    dueAmount: number;
    carryBagFee: number;
    carryBagQuantity: number;
    totalDiscount: number;
    billWithoutDiscount: number;
    discountId?: number | null;
    discountAmount: number;
    deliveryChargeId?: number | null;
    deliveryCharge?: number | null;
    deliveryNote?: string | null;
    cashAmount: number;
    cardAmount: number;
    deviceId?: string | null;
    tipAmount: number;
    tipMode?: string | null;
    serviceCharge?: number | null;
    serviceChargePercent?: number | null;
    note?: Record<string, any> | null;
    orderNumber?: number | null;
    invoiceId?: number | null;
    partnerId: string;
    paid?: number | null;
    subTotal?: number | null;
    totalAmount?: number | null;
    cashCollected?: number | null;
    changeDue?: number | null;
    checkoutType?: string | null;
    tax?: number | null;
    orderType?: string | null;
    items: Array<OrderItem>;
    invoiceNote?: string | null;
    metaData?: any;
    tables?: Array<any>;
    isManualDeliveryCharge?: boolean;
    rooms?: Array<Room>;
    additionalCharges?: Array<AdditionalChargeItem>;
}
/**
 * Recalculates an order invoice based on products and their addons.
 *
 * @param order - The order object to update
 * @param products - Map of productId → Product
 * @returns Updated order with recalculated totals
 */
export declare function applyInvoice(order: Order, products: Record<string, Product>, discounts: Record<string, Discount>): Order;
/**
 * Processes rooms attached to an order, assigning missing IDs
 * and adding room charges to the order's total bill.
 *
 * @param order - The order object to update
 * @returns Updated order with recalculated totals including room charges
 */
export declare const applyInvoiceForRooms: (order: Order) => Order;
