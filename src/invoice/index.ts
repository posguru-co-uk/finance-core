// Base localized text type

export interface Discount {
  id: string;
  name: string;
  discount: string; // or number, depending on backend
  code: string;
  discountType: 'PERCENT' | 'AMOUNT' | string; // can extend with other types
  description?: string;
  isDeleted: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  partnerId: string;
}

export interface LocalizedText {
  [langCode: string]: string;
}

// Addon Item
export interface AddonItem {
  id: number;
  item: LocalizedText;
  rank: number;
  amount: number; // could be number if you want strict typing
  defaultSelect: boolean;
}

// Addon Group
export interface Addon {
  id: number;
  name: LocalizedText;
  rank: number;
  status: 'ACTIVE' | 'INACTIVE' | string;
  maximum: number;
  minimum: number;
  addonItems: Record<string, AddonItem>;
}

// Product Model
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
  serviceTypeCharges?: any
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
  id: number;                // bigint
  orderItemsId: number;      // bigint (order_items_id)
  addonItemId: number;       // bigint (addon_item_id)
  amount: number;            // numeric(10,2)
  quantity: number;          // int
  totalAmount: number;       // numeric(10,2)
  createdBy?: string | null; // uuid
  updatedBy?: string | null; // uuid
  createdAt: Date;           // timestamp
  updatedAt: Date;           // timestamp
  orderId: number;           // bigint
  partnerId: string;         // uuid
}

export interface Order {
  id: number; // int8
  locationId: string; // uuid
  customerId?: number | null; // int8
  status: string; // varchar(32)
  billAmount: number; // numeric(10,2)
  isDeleted: boolean; // bool
  createdBy?: string | null; // uuid
  updatedBy?: string | null; // uuid
  createdAt: Date; // timestamp
  updatedAt: Date; // timestamp
  serviceType: string; // varchar(64)
  paymentMode?: string | null; // varchar(32)
  isPaid?: boolean | null; // bool
  paidAmount: number; // numeric(10,2)
  dueAmount: number; // numeric(10,2)
  carryBagFee: number; // numeric(10,2)
  carryBagQuantity: number;
  totalDiscount: number; // numeric(10,2)
  billWithoutDiscount: number; // numeric(10,2)
  discountId?: number | null; // int8
  discountAmount: number; // numeric(10,2)
  deliveryChargeId?: number | null; // int8
  deliveryCharge?: number | null; // numeric(10,2)
  deliveryNote?: string | null; // varchar(126)
  cashAmount: number; // numeric(10,2)
  cardAmount: number; // numeric(10,2)
  deviceId?: string | null; // uuid
  tipAmount: number; // numeric(10,2)
  tipMode?: string | null; // varchar(32)
  serviceCharge?: number | null; // numeric(10,2)
  serviceChargePercent?: number | null; // numeric(10,2)
  note?: Record<string, any> | null; // jsonb
  orderNumber?: number | null; // int8
  invoiceId?: number | null; // int8
  partnerId: string; // uuid
  paid?: number | null; // numeric
  subTotal?: number | null; // numeric
  totalAmount?: number | null;
  cashCollected?: number | null; // numeric
  changeDue?: number | null; // numeric
  checkoutType?: string | null; // varchar(32)
  tax?: number | null; // numeric
  orderType?: string | null; // varchar(16)
  items: Array<OrderItem>;
  invoiceNote?: string | null; // varchar(512)
  metaData?: any
  tables?: Array<any>
}

/**
 * Recalculates an order invoice based on products and their addons.
 *
 * @param order - The order object to update
 * @param products - Map of productId → Product
 * @returns Updated order with recalculated totals
 */
export function applyInvoice(order: Order, products: Record<string, Product>, discounts: Record<string, Discount>): Order {
  let subTotal = 0;
  let totalDiscount = 0;
  let totalAmount = 0;
  // Precompute max IDs once to avoid repeated Math.max calls
  let nextItemId =
    (order.items?.reduce((max, i) => (i.id && i.id > max ? i.id : max), 0) || 0) + 1;
  order.items?.forEach((item, itemIndex) => {
    let salesPrice = Number(item?.amount || 0.00);
    const product = products[item.productId];
    if (product && !item?.isManualPrice) {
      if (product?.serviceTypeCharges?.[order.serviceType]) {
        salesPrice = product?.serviceTypeCharges?.[order.serviceType].salesPrice;
      } else {
        salesPrice = product.salesPrice;
      }
    }
    // Assign an ID if missing
    if (!item.id) {
      item.id = nextItemId++;
    }
    const baseAmount = Number(salesPrice) * Number(item.quantity);
    item.amount = Number(salesPrice);
    item.totalAmount = baseAmount;
    if (!item?.isManualPrice) {
      item.totalCost = baseAmount;
    }
    // Precompute max addon id for this item
    let nextAddonId =
      (item.addons?.reduce((max, a) => (a.id && a.id > max ? a.id : max), 0) || 0) + 1;

    // Process addons
    item.addons?.forEach((addon, addonIndex) => {
      let amount = Number(addon?.amount || 0);
      if (!addon?.id) {
        addon.id = nextAddonId++;
      }
      addon.orderItemsId = item.id; // should link to parent item, not self
      if (item?.isManualPrice) {
        addon.totalAmount = 0.00
      } else {
        addon.totalAmount = amount * Number(addon.quantity);
      }
      item.totalCost += addon.totalAmount;
    });
    totalAmount = totalAmount + item.totalCost;
    if (item?.discountId) {
      if (!item?.isManualPrice) {
        const discount = discounts[item?.discountId];
        let discountAMount = 0.00;
        if (discount.discountType === 'PERCENT') {
          discountAMount = Number((item.totalCost * (Number(discount.discount) / 100)).toFixed(2));
        } else {
          if (item.totalCost >= Number(discount.discount)) {
            discountAMount = Number(discount.discount);
          } else {
            item.discountId = null;
            item.discount = null;
          }
        }
        totalDiscount = totalDiscount + discountAMount;
        item.discountAmount = discountAMount;
        item.totalCost = item.totalCost - discountAMount;
      }
    } else {
      item.discountId = null;
      item.discount = null;
    }
    subTotal += item.totalCost;
  });

  let discountAmount = 0.00;
  if (order?.discountId) {
    const discount = discounts[order?.discountId];
    if (discount) {
      if (discount?.discountType === 'PERCENT') {
        discountAmount = Number((subTotal * (Number(discount.discount) / 100)).toFixed(2));
      } else {
        if (subTotal >= Number(discount.discount)) {
          discountAmount = Number(discount.discount);
        }
        else {
          order.discountId = null;
        }
      }
    }
  }

  subTotal = Number(subTotal) - Number(discountAmount);

  order.subTotal = subTotal;
  order.totalAmount = totalAmount;
  order.totalDiscount = totalDiscount;
  order.discountAmount = discountAmount;
  // calculate carrybag and service charges
  order.billAmount = subTotal;
  if (Number(order?.carryBagQuantity) && Number(order.carryBagFee)) {
    order.billAmount = Number(order.billAmount) + (Number(order?.carryBagQuantity) && Number(order.carryBagFee));
  }
  if (order?.serviceChargePercent && Number(order.serviceChargePercent)) {
    const serviceCharge = (Number(subTotal) * (Number(order.serviceChargePercent) / 100));
    order.billAmount = Number(order.billAmount) + serviceCharge;
    order.serviceCharge = serviceCharge;
  }

  if (order?.serviceType === 'DELIVERY' && order?.deliveryChargeId && order?.deliveryCharge) {
    const deliveryCharge = Number(order?.deliveryCharge);
    order.billAmount = Number(order.billAmount) + deliveryCharge;
  }

  if (order?.tables?.length && order?.serviceType === 'DINE_IN') {

    let nextTableId = (order.tables?.reduce((max, i) => (i.id && i.id > max ? i.id : max), 0) || 0) + 1;
    order.tables?.forEach((item, itemIndex) => {
      if (!item.id) {
        item.id = nextTableId++;
      }
    })
  }

  return order;
}