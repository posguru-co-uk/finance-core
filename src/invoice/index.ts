// Base localized text type
export interface LocalizedText {
  [langCode: string]: string;
}

// Addon Item
export interface AddonItem {
  id: number;
  item: LocalizedText;
  rank: number;
  amount: string; // could be number if you want strict typing
  defaultSelect: boolean;
}

// Addon Group
export interface Addon {
  id: number;
  name: LocalizedText;
  rank: number;
  status: "ACTIVE" | "INACTIVE" | string;
  maximum: number;
  minimum: number;
  addonItems: AddonItem[];
}

// Product Model
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
  salesPrice: string;
  taxRateId: string;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  addons: Addon[];
}


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
export function applyInvoice(order: Order, products: Array<Product>): Order {
 const neworder: Order = {
    ...order,
    billWithoutDiscount: '', // override field
  };
    return neworder;
}