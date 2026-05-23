"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
function applyInvoice(order, products, discounts) {
  var _a, _b, _c, _d, _e;
  let subTotal = 0;
  let totalDiscount = 0;
  let totalAmount = 0;
  let nextItemId = (((_a = order.items) == null ? void 0 : _a.reduce((max, i) => i.id && i.id > max ? i.id : max, 0)) || 0) + 1;
  (_b = order.items) == null ? void 0 : _b.forEach((item, itemIndex) => {
    var _a2, _b2, _c2, _d2;
    let salesPrice = Number((item == null ? void 0 : item.amount) || 0);
    const product = products[item.productId];
    if (product && !(item == null ? void 0 : item.isManualPrice)) {
      if ((_a2 = product == null ? void 0 : product.serviceTypeCharges) == null ? void 0 : _a2[order.serviceType]) {
        salesPrice = (_b2 = product == null ? void 0 : product.serviceTypeCharges) == null ? void 0 : _b2[order.serviceType].salesPrice;
      } else {
        salesPrice = product.salesPrice;
      }
    }
    if (!item.id) {
      item.id = nextItemId++;
    }
    const baseAmount = Number(salesPrice) * Number(item.quantity);
    item.amount = Number(salesPrice);
    item.totalAmount = baseAmount;
    if (!(item == null ? void 0 : item.isManualPrice)) {
      item.totalCost = baseAmount;
    }
    let nextAddonId = (((_c2 = item.addons) == null ? void 0 : _c2.reduce((max, a) => a.id && a.id > max ? a.id : max, 0)) || 0) + 1;
    (_d2 = item.addons) == null ? void 0 : _d2.forEach((addon, addonIndex) => {
      let amount = Number((addon == null ? void 0 : addon.amount) || 0);
      if (!(addon == null ? void 0 : addon.id)) {
        addon.id = nextAddonId++;
      }
      addon.orderItemsId = item.id;
      if (item == null ? void 0 : item.isManualPrice) {
        addon.totalAmount = 0;
      } else {
        addon.totalAmount = amount * Number(addon.quantity);
      }
      item.totalCost += Number(addon.totalAmount);
    });
    totalAmount = Number(totalAmount) + Number(item.totalCost);
    if (item == null ? void 0 : item.discountId) {
      if (!(item == null ? void 0 : item.isManualPrice)) {
        const discount = discounts[item == null ? void 0 : item.discountId];
        let discountAMount = 0;
        if (discount.discountType === "PERCENT") {
          discountAMount = Number((item.totalCost * (Number(discount.discount) / 100)).toFixed(2));
        } else {
          if (item.totalCost >= Number(discount.discount)) {
            discountAMount = Number(discount.discount);
          } else {
            item.discountId = null;
            item.discount = null;
          }
        }
        totalDiscount = Number(totalDiscount) + Number(discountAMount);
        item.discountAmount = Number(discountAMount);
        item.totalCost = Number(item.totalCost) - Number(discountAMount);
      }
    } else {
      item.discountId = null;
      item.discount = null;
    }
    subTotal += Number(item.totalCost);
  });
  let discountAmount = 0;
  if (order == null ? void 0 : order.discountId) {
    const discount = discounts[order == null ? void 0 : order.discountId];
    if (discount) {
      if ((discount == null ? void 0 : discount.discountType) === "PERCENT") {
        discountAmount = Number((subTotal * (Number(discount.discount) / 100)).toFixed(2));
      } else {
        if (subTotal >= Number(discount.discount)) {
          discountAmount = Number(discount.discount);
        } else {
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
  order.billAmount = subTotal;
  if (Number(order == null ? void 0 : order.carryBagQuantity) && Number(order.carryBagFee)) {
    order.billAmount = Number(order.billAmount) + Number(order == null ? void 0 : order.carryBagQuantity) * Number(order.carryBagFee);
  }
  if ((order == null ? void 0 : order.serviceChargePercent) && Number(order.serviceChargePercent)) {
    const serviceCharge = Number(subTotal) * (Number(order.serviceChargePercent) / 100);
    order.billAmount = Number(order.billAmount) + serviceCharge;
    order.serviceCharge = serviceCharge;
  }
  if ((order == null ? void 0 : order.serviceType) === "DELIVERY" && ((order == null ? void 0 : order.deliveryChargeId) || (order == null ? void 0 : order.isManualDeliveryCharge)) && (order == null ? void 0 : order.deliveryCharge)) {
    const deliveryCharge = Number((order == null ? void 0 : order.deliveryCharge) || 0);
    order.billAmount = Number(order.billAmount) + deliveryCharge;
  }
  if (((_c = order == null ? void 0 : order.tables) == null ? void 0 : _c.length) && (order == null ? void 0 : order.serviceType) === "DINE_IN") {
    let nextTableId = (((_d = order.tables) == null ? void 0 : _d.reduce((max, i) => i.id && i.id > max ? i.id : max, 0)) || 0) + 1;
    (_e = order.tables) == null ? void 0 : _e.forEach((item, itemIndex) => {
      if (!item.id) {
        item.id = nextTableId++;
      }
    });
  }
  return order;
}
const applyInvoiceForRooms = (order) => {
  var _a;
  if (!((_a = order == null ? void 0 : order.rooms) == null ? void 0 : _a.length)) {
    return order;
  }
  let roomTotalAmount = 0;
  let nextRoomId = (order.rooms.reduce((max, r) => r.id && r.id > max ? r.id : max, 0) || 0) + 1;
  order.rooms.forEach((room) => {
    if (!room.id) {
      room.id = nextRoomId++;
    }
    if (!room.orderId && order.id) {
      room.orderId = order.id;
    }
    const amount = Number(room.amount || 0);
    roomTotalAmount += amount;
  });
  let additionalChargesTotal = 0;
  if (order == null ? void 0 : order.additionalCharges) {
    for (const chargeItem of order.additionalCharges) {
      additionalChargesTotal += Number(chargeItem.charge || 0);
    }
  }
  order.billAmount = Number(roomTotalAmount) + Number(additionalChargesTotal);
  order.totalAmount = Number(roomTotalAmount) + Number(additionalChargesTotal);
  order.subTotal = Number(roomTotalAmount) + Number(additionalChargesTotal);
  order.totalDiscount = 0;
  return order;
};
const partnerTypes = {
  PARTNER: "PARTNER",
  USER: "USER",
  LOCATION: "LOCATION",
  DEVICE: "DEVICE",
  STAFF: "STAFF",
  DRIVER: "DRIVER",
  VALUES: ["PARTNER", "USER", "LOCATION", "DEVICE", "STAFF", "DRIVER"]
};
const partnerModes = {
  CLOUDE_KITCHEN: "CLOUDE_KITCHEN",
  RESTAURANT: "RESTAURANT",
  VALUES: ["CLOUDE_KITCHEN", "RESTAURANT"]
};
const profileTypes = {
  PRIVATE: "PRIVATE",
  STYLE: "STYLE",
  APPLICATION: "APPLICATION"
};
const isBoolean = (value) => {
  if (typeof value === "string") {
    return value.toLowerCase() === "true";
  }
  return Boolean(value);
};
const DeviceProfileAttributes = {
  NAME: {
    attribute: "name",
    value: null,
    jsonProperty: "name",
    format: (value) => String(value)
  },
  DESCRIPTION: {
    attribute: "description",
    value: null,
    jsonProperty: "description",
    format: (value) => String(value)
  },
  LANGUAGES: {
    attribute: "languages",
    value: ["en-US"],
    jsonProperty: "languages",
    format: (value) => JSON.parse(value),
    cast: (value) => JSON.stringify(value),
    override: true
  },
  STATUS: {
    attribute: "status",
    value: true,
    jsonProperty: "status",
    format: (value) => isBoolean(value),
    override: true
  },
  CURRENCY: {
    attribute: "currency",
    value: "GBP",
    jsonProperty: "currency",
    format: (value) => String(value),
    override: true
  },
  MINIMUM_CASH_ORDER: {
    attribute: "minimum_cash_order",
    value: 0,
    jsonProperty: "minimumCashOrder",
    format: (value) => Number(value),
    override: true
  },
  CARRY_BAG_FEE: {
    attribute: "carry_bag_fee",
    value: 0,
    jsonProperty: "carryBagFee",
    format: (value) => Number(value),
    override: true
  },
  VAT: {
    attribute: "vat",
    value: 0,
    jsonProperty: "vat",
    format: (value) => Number(value),
    override: true
  },
  TIME_ZONE: {
    attribute: "time_zone",
    value: null,
    jsonProperty: "timeZone",
    format: (value) => String(value),
    override: true
  },
  IS_DELETED: {
    attribute: "is_deleted",
    value: false,
    jsonProperty: "isDeleted",
    format: (value) => isBoolean(value),
    override: true
  },
  SERVICE_TYPES: {
    attribute: "service_types",
    value: [],
    // ✅ fixed instead of false
    jsonProperty: "serviceTypes",
    format: (value) => JSON.parse(value),
    cast: (value) => JSON.stringify(value),
    override: true
  },
  TYPE: {
    attribute: "type",
    value: null,
    jsonProperty: "type",
    format: (value) => String(value)
  }
};
const UserProfileAttributes = {
  PASSWORD: {
    attribute: "password",
    value: null,
    jsonProperty: "password",
    format: (value) => String(value)
  },
  EMAIL: {
    attribute: "email",
    value: null,
    jsonProperty: "email",
    format: (value) => String(value)
  },
  NAME: {
    attribute: "name",
    value: null,
    jsonProperty: "name",
    format: (value) => String(value)
  },
  PHONE: {
    attribute: "phone",
    value: null,
    jsonProperty: "phone",
    format: (value) => String(value)
  },
  PERMISSIONS: {
    attribute: "permissions",
    value: [],
    jsonProperty: "permissions",
    format: (value) => Array.isArray(value) ? value : []
  },
  STATUS: {
    attribute: "status",
    value: true,
    jsonProperty: "status",
    format: (value) => isBoolean(value),
    override: true
  },
  IS_DELETED: {
    attribute: "is_deleted",
    value: false,
    jsonProperty: "isDeleted",
    format: (value) => isBoolean(value),
    override: true
  },
  FP_TOKEN: {
    attribute: "fp_token",
    value: null,
    jsonProperty: "fpToken",
    format: (value) => String(value)
  },
  FP_DURATION: {
    attribute: "fp_duration",
    value: null,
    jsonProperty: "fpDuration",
    format: (value) => value ? new Date(value) : null
  },
  IS_OWNER: {
    attribute: "is_owner",
    value: false,
    jsonProperty: "isOwner",
    format: (value) => isBoolean(value)
  }
};
const LocationProfileAttributes = {
  NAME: {
    attribute: "name",
    value: null,
    jsonProperty: "name",
    format: (value) => String(value)
  },
  EMAIL: {
    attribute: "email",
    value: null,
    jsonProperty: "email",
    format: (value) => String(value)
  },
  LANGUAGES: {
    attribute: "languages",
    value: ["en-US"],
    jsonProperty: "languages",
    format: (value) => JSON.parse(value),
    override: true
  },
  PHONE: {
    attribute: "phone",
    value: null,
    jsonProperty: "phone",
    format: (value) => String(value)
  },
  COUNTRY: {
    attribute: "country",
    value: null,
    jsonProperty: "country",
    format: (value) => String(value)
  },
  ADDRESS: {
    attribute: "address",
    value: null,
    jsonProperty: "address",
    format: (value) => String(value)
  },
  DESCRIPTION: {
    attribute: "description",
    value: null,
    jsonProperty: "description",
    format: (value) => String(value)
  },
  POSTCODE: {
    attribute: "postcode",
    value: null,
    jsonProperty: "postcode",
    format: (value) => String(value)
  },
  STATUS: {
    attribute: "status",
    value: true,
    jsonProperty: "status",
    format: (value) => isBoolean(value),
    override: true
  },
  CURRENCY: {
    attribute: "currency",
    value: "GBP",
    jsonProperty: "currency",
    format: (value) => String(value),
    override: true
  },
  MINIMUM_CASH_ORDER: {
    attribute: "minimum_cash_order",
    value: 0,
    jsonProperty: "minimumCashOrder",
    format: (value) => Number(value),
    override: true
  },
  CARRY_BAG_FEE: {
    attribute: "carry_bag_fee",
    value: 0,
    jsonProperty: "carryBagFee",
    format: (value) => Number(value),
    override: true
  },
  VAT: {
    attribute: "vat",
    value: 0,
    jsonProperty: "vat",
    format: (value) => Number(value),
    override: true
  },
  TIME_ZONE: {
    attribute: "time_zone",
    value: null,
    jsonProperty: "timeZone",
    format: (value) => String(value),
    override: true
  },
  IS_DELETED: {
    attribute: "is_deleted",
    value: false,
    jsonProperty: "isDeleted",
    format: (value) => isBoolean(value),
    override: true
  },
  SERVICE_TYPES: {
    attribute: "service_types",
    value: [],
    jsonProperty: "serviceTypes",
    format: (value) => JSON.parse(value),
    cast: (value) => JSON.stringify(value),
    override: true
  },
  START_TOKEN_NUMBER: {
    attribute: "start_token_number",
    value: false,
    jsonProperty: "startTokenNumber",
    format: (value) => isBoolean(value),
    override: true
  },
  LATITUDE: {
    attribute: "latitude",
    value: null,
    jsonProperty: "latitude",
    format: (value) => String(value),
    override: true
  },
  LONGITUDE: {
    attribute: "longitude",
    value: null,
    jsonProperty: "longitude",
    format: (value) => String(value),
    override: true
  }
};
const PartnerProfileAttributes = {
  NAME: {
    attribute: "name",
    value: null,
    jsonProperty: "name",
    format: (value) => String(value)
  },
  EMAIL: {
    attribute: "email",
    value: null,
    jsonProperty: "email",
    format: (value) => String(value)
  },
  TYPE: {
    attribute: "type",
    value: null,
    jsonProperty: "type",
    format: (value) => String(value)
  },
  LANGUAGES: {
    attribute: "languages",
    value: ["en-US"],
    jsonProperty: "languages",
    format: (value) => JSON.parse(value),
    cast: (value) => JSON.stringify(value),
    override: true
  },
  PHONE: {
    attribute: "phone",
    value: null,
    jsonProperty: "phone",
    format: (value) => String(value)
  },
  ORDER_TAB_ACCESS_TOKEN: {
    attribute: "order_tab_access_token",
    value: null,
    jsonProperty: "orderTabAccessToken",
    format: (value) => String(value)
  },
  MAX_ALLOWED_DEVICES: {
    attribute: "max_allowed_devices",
    value: null,
    jsonProperty: "maxAllowedDevices",
    format: (value) => Number(value)
  },
  STATUS: {
    attribute: "status",
    value: true,
    jsonProperty: "status",
    format: (value) => isBoolean(value)
  },
  DOMAIN: {
    attribute: "domain",
    value: null,
    jsonProperty: "domain",
    format: (value) => String(value)
  },
  CITY: {
    attribute: "city",
    value: "",
    jsonProperty: "city",
    format: (value) => String(value)
  },
  COUNTRY: {
    attribute: "country",
    value: null,
    jsonProperty: "country",
    format: (value) => String(value)
  },
  POSTCODE: {
    attribute: "postcode",
    value: null,
    jsonProperty: "postcode",
    format: (value) => String(value)
  },
  CURRENCY: {
    attribute: "currency",
    value: "GBP",
    jsonProperty: "currency",
    format: (value) => String(value),
    override: true
  },
  SUBSCRIPTION: {
    attribute: "subscription",
    value: "BASIC",
    jsonProperty: "subscription",
    format: (value) => String(value)
  },
  LOGO_URL: {
    attribute: "logo_url",
    value: null,
    jsonProperty: "logoUrl",
    format: (value) => String(value),
    override: true
  },
  MINIMUM_CASH_ORDER: {
    attribute: "minimum_cash_order",
    value: 0,
    jsonProperty: "minimumCashOrder",
    format: (value) => Number(value),
    override: true
  },
  CARRY_BAG_FEE: {
    attribute: "carry_bag_fee",
    value: 0,
    jsonProperty: "carryBagFee",
    format: (value) => Number(value)
  },
  VAT: {
    attribute: "vat",
    value: 0,
    jsonProperty: "vat",
    format: (value) => Number(value),
    override: true
  },
  CERTIFICATION_DETAILS: {
    attribute: "certification_details",
    value: null,
    jsonProperty: "certificationDetails",
    format: (value) => String(value)
  },
  PARTNER_TYPE: {
    attribute: "partner_type",
    value: "",
    jsonProperty: "partnerType",
    format: (value) => String(value)
  },
  TIME_ZONE: {
    attribute: "time_zone",
    value: null,
    jsonProperty: "timeZone",
    format: (value) => String(value),
    override: true
  },
  IS_DELETED: {
    attribute: "is_deleted",
    value: false,
    jsonProperty: "isDeleted",
    format: (value) => isBoolean(value),
    override: true
  },
  ADDRESS: {
    attribute: "address",
    value: null,
    jsonProperty: "address",
    format: (value) => String(value)
  },
  SERVICE_TYPES: {
    attribute: "service_types",
    value: [],
    jsonProperty: "serviceTypes",
    format: (value) => JSON.parse(value),
    cast: (value) => JSON.stringify(value),
    override: true
  },
  SERVICE_CHARGES: {
    attribute: "service_charges",
    value: [],
    jsonProperty: "serviceCharges",
    format: (value) => JSON.parse(value),
    cast: (value) => JSON.stringify(value),
    override: true
  },
  LATITUDE: {
    attribute: "latitude",
    value: null,
    jsonProperty: "latitude",
    format: (value) => String(value)
  },
  LONGITUDE: {
    attribute: "longitude",
    value: null,
    jsonProperty: "longitude",
    format: (value) => String(value)
  },
  ADDON_FEATURES: {
    attribute: "addon_features",
    value: [],
    jsonProperty: "addonFeatures",
    format: (value) => JSON.parse(value),
    cast: (value) => JSON.stringify(value),
    override: true
  },
  HardwareCost: {
    attribute: "hardware_cost",
    value: 0,
    jsonProperty: "hardwareCost",
    format: (value) => Number(value)
  },
  Hardwares: {
    attribute: "hardwares",
    value: [],
    jsonProperty: "hardwares",
    format: (value) => JSON.parse(value),
    cast: (value) => JSON.stringify(value)
  },
  ROOM_CHECK_IN_TIME: {
    attribute: "room_check_in_time",
    value: null,
    jsonProperty: "roomCheckInTime",
    format: (value) => String(value)
  },
  ROOM_CHECK_OUT_TIME: {
    attribute: "room_check_out_time",
    value: null,
    jsonProperty: "roomCheckOutTime",
    format: (value) => String(value)
  },
  SUBSCRIPTION_PLANS: {
    attribute: "subscription_plans",
    value: [],
    jsonProperty: "subscriptionPlans",
    format: (value) => value ? JSON.parse(value) : [],
    cast: (value) => JSON.stringify(value || [])
  },
  SKIP_SUBSCRIPTION: {
    attribute: "skip_subscription",
    value: false,
    jsonProperty: "skipSubscription",
    format: (value) => isBoolean(value)
  }
};
const AdminProfileAttributes = {
  PASSWORD: {
    attribute: "password",
    value: null,
    jsonProperty: "password",
    format: (value) => String(value)
  },
  EMAIL: {
    attribute: "email",
    value: null,
    jsonProperty: "email",
    format: (value) => String(value)
  },
  NAME: {
    attribute: "name",
    value: null,
    jsonProperty: "name",
    format: (value) => String(value)
  },
  PHONE: {
    attribute: "phone",
    value: null,
    jsonProperty: "phone",
    format: (value) => String(value)
  },
  PERMISSIONS: {
    attribute: "permissions",
    value: [],
    jsonProperty: "permissions",
    format: (value) => Array.isArray(value) ? value : []
  },
  STATUS: {
    attribute: "status",
    value: true,
    jsonProperty: "status",
    format: (value) => isBoolean(value)
  },
  CREATED_AT: {
    attribute: "created_at",
    value: null,
    jsonProperty: "createdAt",
    format: (value) => value ? new Date(value) : null
  },
  IS_DELETED: {
    attribute: "is_deleted",
    value: false,
    jsonProperty: "isDeleted",
    format: (value) => isBoolean(value)
  },
  FP_TOKEN: {
    attribute: "fp_token",
    value: null,
    jsonProperty: "fpToken",
    format: (value) => String(value)
  },
  FP_DURATION: {
    attribute: "fp_duration",
    value: null,
    jsonProperty: "fpDuration",
    format: (value) => value ? new Date(value) : null
  },
  IS_ADMIN: {
    attribute: "is_admin",
    value: false,
    jsonProperty: "isAdmin",
    format: (value) => isBoolean(value)
  }
};
const DriverProfileAttributes = {
  NAME: {
    attribute: "name",
    value: null,
    jsonProperty: "name",
    format: (value) => String(value)
  },
  EMAIL: {
    attribute: "email",
    value: null,
    jsonProperty: "email",
    format: (value) => String(value)
  },
  PHONE: {
    attribute: "phone",
    value: null,
    jsonProperty: "phone",
    format: (value) => String(value)
  },
  ADDRESS_LINE_1: {
    attribute: "address_line_1",
    value: null,
    jsonProperty: "addressLine1",
    format: (value) => String(value)
  },
  ADDRESS_LINE_2: {
    attribute: "address_line_2",
    value: null,
    jsonProperty: "addressLine2",
    format: (value) => String(value)
  },
  CITY: {
    attribute: "city",
    value: null,
    jsonProperty: "city",
    format: (value) => String(value)
  },
  POSTCODE: {
    attribute: "postcode",
    value: null,
    jsonProperty: "postcode",
    format: (value) => String(value)
  },
  IS_DELETED: {
    attribute: "is_deleted",
    value: false,
    jsonProperty: "isDeleted",
    format: (value) => isBoolean(value),
    override: true
  },
  NOTES: {
    attribute: "notes",
    value: null,
    jsonProperty: "notes",
    format: (value) => String(value)
  },
  PETROL_MONEY: {
    attribute: "petrol_money",
    value: 0,
    jsonProperty: "petrolMoney",
    format: (value) => Number(value)
  }
};
const StaffProfileAttributes = {
  NAME: {
    attribute: "name",
    value: null,
    jsonProperty: "name",
    format: (value) => String(value)
  },
  EMAIL: {
    attribute: "email",
    value: null,
    jsonProperty: "email",
    format: (value) => String(value)
  },
  PASSCODE: {
    attribute: "passcode",
    value: null,
    jsonProperty: "passcode",
    format: (value) => String(value)
  },
  HOURLY_RATE: {
    attribute: "hourly_rate",
    value: 0,
    jsonProperty: "hourlyRate",
    format: (value) => Number(value),
    cast: (value) => Number(value)
  },
  PERMISSIONS: {
    attribute: "permissions",
    value: [],
    jsonProperty: "permissions",
    format: (value) => JSON.parse(value),
    cast: (value) => JSON.stringify(value)
  },
  IS_DELETED: {
    attribute: "is_deleted",
    value: false,
    jsonProperty: "isDeleted",
    format: (value) => isBoolean(value),
    override: true
  },
  LOCATIONS: {
    attribute: "locations",
    value: [],
    jsonProperty: "locations",
    format: (value) => JSON.parse(value),
    cast: (value) => JSON.stringify(value),
    override: false
  },
  DEVICES: {
    attribute: "devices",
    value: [],
    jsonProperty: "devices",
    format: (value) => JSON.parse(value),
    cast: (value) => JSON.stringify(value),
    override: false
  },
  DEPARTMENTS: {
    attribute: "departments",
    value: [],
    jsonProperty: "departments",
    format: (value) => JSON.parse(value),
    cast: (value) => JSON.stringify(value),
    override: false
  }
};
const serviceTypes = {
  TAKE_AWAY: "TAKE_AWAY",
  DELIVERY: "DELIVERY",
  DINE_IN: "DINE_IN",
  WEBSITE_BOOKING: "WEBSITE_BOOKING",
  COLLECTION: "COLLECTION",
  TABLE_BOOKING: "TABLE_BOOKING",
  ROOM_BOOKING: "ROOM_BOOKING",
  VALUES: [
    "TAKE_AWAY",
    "DELIVERY",
    "DINE_IN",
    "COLLECTION",
    "TABLE_BOOKING",
    "WEBSITE_BOOKING",
    "ROOM_BOOKING"
  ]
};
const deserializeProfileAttribute = (attributes, values, overrideSettings = false, onlyFormat = true) => {
  const result = {};
  Object.values(attributes).forEach((item) => {
    let formattedValue = null;
    if (values[item.attribute]) {
      formattedValue = item.format(values[item.attribute].value);
    } else if (overrideSettings) {
      formattedValue = item.value;
    }
    if (onlyFormat) {
      result[item.jsonProperty] = formattedValue;
    } else {
      result[item.jsonProperty] = { ...item, value: formattedValue };
    }
  });
  return result;
};
const PartnerProfileAttributesJsonKeys = Object.values(
  PartnerProfileAttributes
).map((item) => item.jsonProperty);
const PartnerProfileAttributesDbKeys = Object.values(
  PartnerProfileAttributes
).map((item) => item.attribute);
async function generateProfile(partners, rootPartner, readProfilesAdapter, prfoileAttributesAdapter, withParent = false) {
  const partnersMap = {};
  for (const partner of partners) {
    partnersMap[partner.id] = partner;
  }
  partnersMap[rootPartner] = {
    id: rootPartner,
    type: partnerTypes.PARTNER,
    parent: null
  };
  await readDetaildData(partnersMap, readProfilesAdapter, prfoileAttributesAdapter);
  const childMap = generateChildMap(partnersMap);
  const root = findRootPartner(partnersMap);
  applyInheritanceFromParent(root, partnersMap, childMap);
  removeDeletedPartners(partnersMap, childMap);
  alignPrivateProfile(partnersMap);
  alignHorizontalOwnedProfiles(partnersMap);
  if (!withParent) {
    delete partnersMap[rootPartner];
  }
  return partnersMap;
}
const readProfiles = async (partnerIds, readProfilesAdapter, prfoileAttributesAdapter) => {
  const partnerDBProfiles = await readProfilesAdapter(partnerIds);
  const partnerProfiles = {};
  for (const partnerProfile of partnerDBProfiles) {
    const partnerId = partnerProfile.partnerId;
    let profiles2 = partnerProfiles[partnerId];
    if (!profiles2) {
      profiles2 = {};
      partnerProfiles[partnerId] = profiles2;
    }
    profiles2[partnerProfile.name] = partnerProfile;
  }
  const profiles = /* @__PURE__ */ new Set();
  for (const partnerId of Object.keys(partnerProfiles)) {
    const profileForPartner = partnerProfiles[partnerId];
    for (const profile of Object.values(profileForPartner)) {
      profiles.add(profile);
    }
  }
  const profileAttributes = await prfoileAttributesAdapter(partnerIds);
  for (const attr of profileAttributes) {
    const profileForPartner = partnerProfiles[attr == null ? void 0 : attr.partnerId];
    if (!profileForPartner) continue;
    const profile = profileForPartner[attr == null ? void 0 : attr.profileName];
    if (!profile) continue;
    if (!profile.attributes) profile.attributes = {};
    profile.attributes[attr.name] = attr;
  }
  return profiles;
};
const generateChildMap = (partners) => {
  const result = {};
  for (const partner of Object.values(partners)) {
    const parent = (partner == null ? void 0 : partner.parent) ? partners[partner.parent] : null;
    if (parent) {
      if (!result[parent.id]) result[parent.id] = [];
      result[parent.id].push(partner.id);
    }
  }
  return result;
};
const findRootPartner = (partners) => {
  let root = null;
  for (const partner of Object.values(partners)) {
    if (!partner.parent) {
      if (!root) root = partner;
      else throw new Error("find root faild: more than one root parent found");
    }
  }
  if (!root) throw new Error("No root partner found");
  return root;
};
const readDetaildData = async (partners, readProfilesAdapter, prfoileAttributesAdapter) => {
  const partnerIds = Object.keys(partners);
  const dbProfilesList = await readProfiles(partnerIds, readProfilesAdapter, prfoileAttributesAdapter);
  for (const dbProfiles of dbProfilesList) {
    const partner = partners[dbProfiles.partnerId];
    const profile = convertProfile(dbProfiles, partner);
    partner.privateProfile = profile;
  }
  for (const partnerId of Object.keys(partners)) {
    const partner = partners[partnerId];
    if (!(partner == null ? void 0 : partner.privateProfile)) {
    }
  }
};
const alignPrivateProfile = (partners) => {
  const deleted = [];
  for (const partner of Object.values(partners)) {
    const profile = partner == null ? void 0 : partner.privateProfile;
    if (profile) {
      const attributes = (profile == null ? void 0 : profile.attributes) || {};
      const privateAttributes = {};
      for (const attrKey of Object.keys(attributes)) {
        const attr = attributes[attrKey];
        privateAttributes[attrKey] = attr.value ?? attr.overriden;
      }
      profile.attributes = { ...privateAttributes };
    } else {
      deleted.push(partner.id);
      console.warn("no user assigned this partner", JSON.stringify(partner));
    }
  }
  for (const partnerId of deleted) {
    delete partners[partnerId];
  }
};
const alignHorizontalOwnedProfiles = (_partners) => {
};
const removeDeletedPartners = (partners, childMap) => {
  var _a, _b, _c;
  const deletedIds = /* @__PURE__ */ new Set();
  for (const partner of Object.values(partners)) {
    if ((_c = (_b = (_a = partner.privateProfile) == null ? void 0 : _a.attributes) == null ? void 0 : _b.isDeleted) == null ? void 0 : _c.value) {
      deletedIds.add(partner.id);
      if (childMap[partner.id]) {
        for (const childId of childMap[partner.id]) {
          deletedIds.add(childId);
        }
      }
    }
  }
  for (const id of deletedIds) {
    delete partners[id];
  }
};
const convertProfile = (profile, partner) => {
  const targetProfile = {
    name: profile.name,
    partnerId: partner.id,
    type: profile.type,
    attributes: profile.attributes
  };
  let result = {};
  if (partner.type === partnerTypes.PARTNER) {
    result = deserializeProfileAttribute(PartnerProfileAttributes, profile.attributes, false, false);
  } else if (partner.type === partnerTypes.LOCATION) {
    result = deserializeProfileAttribute(LocationProfileAttributes, profile.attributes, false, false);
  } else if (partner.type === partnerTypes.DEVICE) {
    result = deserializeProfileAttribute(DeviceProfileAttributes, profile.attributes, false, false);
  } else if (partner.type === partnerTypes.USER) {
    result = deserializeProfileAttribute(UserProfileAttributes, profile.attributes, false, false);
  } else if (partner.type === partnerTypes.STAFF) {
    result = deserializeProfileAttribute(StaffProfileAttributes, profile.attributes, false, false);
  } else if (partner.type === partnerTypes.DRIVER) {
    result = deserializeProfileAttribute(DriverProfileAttributes, profile.attributes, false, false);
  }
  for (const attr of Object.values(result)) {
    attr.owner = partner.id;
    attr.profile = targetProfile.name;
  }
  targetProfile.attributes = result;
  return targetProfile;
};
const mergeProfileAttributes = (sourceProfile, destinationProfile) => {
  if (!sourceProfile || !destinationProfile) return;
  const sourceAttributes = sourceProfile.attributes || {};
  const destinationAttributes = destinationProfile.attributes || {};
  for (const attrName of Object.keys(sourceAttributes)) {
    const parentAttr = sourceAttributes[attrName];
    const childAttr = destinationAttributes[attrName];
    if (!childAttr) {
    } else if (childAttr && parentAttr && childAttr.value === null && childAttr.override === true && parentAttr.value) {
      destinationAttributes[attrName] = { ...parentAttr };
    } else {
      destinationAttributes[attrName] = { ...childAttr };
    }
  }
  destinationProfile.attributes = destinationAttributes;
};
const mergeProfiles = (sourceProfile, destinationProfile) => {
  mergeProfileAttributes(sourceProfile, destinationProfile);
};
const applyInheritanceRoot = (root, partners) => {
  const parentId = root == null ? void 0 : root.parent;
  if (!parentId) return;
  const parent = partners[parentId];
  const parentProfilesMap = parent.privateProfile || null;
  const childProfilesMap = root.privateProfile || null;
  if (childProfilesMap && parentProfilesMap) {
    mergeProfiles(parentProfilesMap, childProfilesMap);
  }
  root.privateProfile = childProfilesMap || void 0;
};
const applyInheritanceFromParent = (rootPartner, partners, childPartners) => {
  applyInheritanceRoot(rootPartner, partners);
  const children = childPartners[rootPartner.id];
  if (children) {
    for (const childId of children) {
      applyInheritanceFromParent(partners[childId], partners, childPartners);
    }
  }
};
exports.AdminProfileAttributes = AdminProfileAttributes;
exports.DeviceProfileAttributes = DeviceProfileAttributes;
exports.DriverProfileAttributes = DriverProfileAttributes;
exports.LocationProfileAttributes = LocationProfileAttributes;
exports.PartnerProfileAttributes = PartnerProfileAttributes;
exports.PartnerProfileAttributesDbKeys = PartnerProfileAttributesDbKeys;
exports.PartnerProfileAttributesJsonKeys = PartnerProfileAttributesJsonKeys;
exports.StaffProfileAttributes = StaffProfileAttributes;
exports.UserProfileAttributes = UserProfileAttributes;
exports.applyInvoice = applyInvoice;
exports.applyInvoiceForRooms = applyInvoiceForRooms;
exports.deserializeProfileAttribute = deserializeProfileAttribute;
exports.generateProfile = generateProfile;
exports.partnerModes = partnerModes;
exports.partnerTypes = partnerTypes;
exports.profileTypes = profileTypes;
exports.serviceTypes = serviceTypes;
//# sourceMappingURL=sdk.cjs.map
