function V(t, e, a) {
  var i, c, f, A, S;
  let o = 0, s = 0, r = 0, u = (((i = t.items) == null ? void 0 : i.reduce((n, b) => b.id && b.id > n ? b.id : n, 0)) || 0) + 1;
  if ((c = t.items) == null || c.forEach((n, b) => {
    var N, I;
    let y = Number((n == null ? void 0 : n.amount) || 0);
    n.id || (n.id = u++);
    const d = Number(y) * Number(n.quantity);
    n.amount = Number(y), n.totalAmount = d, n.totalCost = d;
    let j = (((N = n.addons) == null ? void 0 : N.reduce((l, m) => m.id && m.id > l ? m.id : l, 0)) || 0) + 1;
    if ((I = n.addons) == null || I.forEach((l, m) => {
      let g = Number((l == null ? void 0 : l.amount) || 0);
      l != null && l.id || (l.id = j++), l.orderItemsId = n.id, l.totalAmount = g * l.quantity, n.totalCost += l.totalAmount;
    }), r = r + n.totalCost, n != null && n.discountId) {
      const l = a[n == null ? void 0 : n.discountId];
      let m = 0;
      l.discountType === "PERCENT" ? m = Number((n.totalCost * (Number(l.discount) / 100)).toFixed(2)) : n.totalCost >= Number(l.discount) ? m = n.totalCost - Number(l.discount) : (n.discountId = null, n.discount = null), s = s + m, n.discountAmount = m, n.totalCost = n.totalCost - m;
    }
    o += n.totalCost;
  }), t.subTotal = o, t.totalAmount = r, t.totalDiscount = s, t.billAmount = o, Number(t == null ? void 0 : t.carryBagQuantity) && Number(t.carryBagFee) && (t.billAmount = Number(t.billAmount) + (Number(t == null ? void 0 : t.carryBagQuantity) && Number(t.carryBagFee))), t != null && t.serviceChargePercent && Number(t.serviceChargePercent)) {
    const n = Number(o) * (Number(t.serviceChargePercent) / 100);
    t.billAmount = Number(t.billAmount) + n, t.serviceCharge = n;
  }
  if ((t == null ? void 0 : t.serviceType) === "DELIVERY" && (t != null && t.deliveryChargeId) && (t != null && t.deliveryCharge)) {
    const n = Number(t == null ? void 0 : t.deliveryCharge);
    t.billAmount = Number(t.billAmount) + n;
  }
  if ((f = t == null ? void 0 : t.tables) != null && f.length && (t == null ? void 0 : t.serviceType) === "DINE_IN") {
    let n = (((A = t.tables) == null ? void 0 : A.reduce((b, y) => y.id && y.id > b ? y.id : b, 0)) || 0) + 1;
    (S = t.tables) == null || S.forEach((b, y) => {
      b.id || (b.id = n++);
    });
  }
  return t;
}
const v = {
  PARTNER: "PARTNER",
  USER: "USER",
  LOCATION: "LOCATION",
  DEVICE: "DEVICE",
  STAFF: "STAFF",
  VALUES: ["PARTNER", "USER", "LOCATION", "DEVICE", "STAFF"]
}, K = {
  CLOUDE_KITCHEN: "CLOUDE_KITCHEN",
  RESTAURANT: "RESTAURANT",
  VALUES: ["CLOUDE_KITCHEN", "RESTAURANT"]
}, k = {
  PRIVATE: "PRIVATE",
  STYLE: "STYLE",
  APPLICATION: "APPLICATION"
}, p = (t) => typeof t == "string" ? t.toLowerCase() === "true" : !!t, O = {
  NAME: {
    attribute: "name",
    value: null,
    jsonProperty: "name",
    format: (t) => String(t)
  },
  LANGUAGES: {
    attribute: "languages",
    value: ["en-"],
    jsonProperty: "languages",
    format: (t) => JSON.parse(t),
    override: !0
  },
  STATUS: {
    attribute: "status",
    value: !0,
    jsonProperty: "status",
    format: (t) => p(t),
    override: !0
  },
  CURRENCY: {
    attribute: "currency",
    value: "GBP",
    jsonProperty: "currency",
    format: (t) => String(t),
    override: !0
  },
  MINIMUM_CASH_ORDER: {
    attribute: "minimum_cash_order",
    value: 0,
    jsonProperty: "minimumCashOrder",
    format: (t) => Number(t),
    override: !0
  },
  CARRY_BAG_FEE: {
    attribute: "carry_bag_fee",
    value: 0,
    jsonProperty: "carryBagFee",
    format: (t) => Number(t),
    override: !0
  },
  VAT: {
    attribute: "vat",
    value: 0,
    jsonProperty: "vat",
    format: (t) => Number(t),
    override: !0
  },
  TIME_ZONE: {
    attribute: "time_zone",
    value: null,
    jsonProperty: "timeZone",
    format: (t) => String(t),
    override: !0
  },
  IS_DELETED: {
    attribute: "is_deleted",
    value: !1,
    jsonProperty: "isDeleted",
    format: (t) => p(t),
    override: !0
  },
  SERVICE_TYPES: {
    attribute: "service_types",
    value: [],
    // ✅ fixed instead of false
    jsonProperty: "serviceTypes",
    format: (t) => Array.isArray(t) ? t : [],
    override: !0
  }
}, _ = {
  PASSWORD: {
    attribute: "password",
    value: null,
    jsonProperty: "password",
    format: (t) => String(t)
  },
  EMAIL: {
    attribute: "email",
    value: null,
    jsonProperty: "email",
    format: (t) => String(t)
  },
  NAME: {
    attribute: "name",
    value: null,
    jsonProperty: "name",
    format: (t) => String(t)
  },
  PHONE: {
    attribute: "phone",
    value: null,
    jsonProperty: "phone",
    format: (t) => String(t)
  },
  PERMISSIONS: {
    attribute: "permissions",
    value: [],
    jsonProperty: "permissions",
    format: (t) => Array.isArray(t) ? t : []
  },
  STATUS: {
    attribute: "status",
    value: !0,
    jsonProperty: "status",
    format: (t) => p(t),
    override: !0
  },
  IS_DELETED: {
    attribute: "is_deleted",
    value: !1,
    jsonProperty: "isDeleted",
    format: (t) => p(t),
    override: !0
  },
  FP_TOKEN: {
    attribute: "fp_token",
    value: null,
    jsonProperty: "fpToken",
    format: (t) => String(t)
  },
  FP_DURATION: {
    attribute: "fp_duration",
    value: null,
    jsonProperty: "fpDuration",
    format: (t) => t ? new Date(t) : null
  },
  IS_OWNER: {
    attribute: "is_owner",
    value: !1,
    jsonProperty: "isOwner",
    format: (t) => p(t)
  }
}, C = {
  NAME: {
    attribute: "name",
    value: null,
    jsonProperty: "name",
    format: (t) => String(t)
  },
  EMAIL: {
    attribute: "email",
    value: null,
    jsonProperty: "email",
    format: (t) => String(t)
  },
  LANGUAGES: {
    attribute: "languages",
    value: ["en-US"],
    jsonProperty: "languages",
    format: (t) => JSON.parse(t),
    override: !0
  },
  PHONE: {
    attribute: "phone",
    value: null,
    jsonProperty: "phone",
    format: (t) => String(t)
  },
  COUNTRY: {
    attribute: "country",
    value: null,
    jsonProperty: "country",
    format: (t) => String(t)
  },
  ADDRESS: {
    attribute: "address",
    value: null,
    jsonProperty: "address",
    format: (t) => String(t)
  },
  DESCRIPTION: {
    attribute: "description",
    value: null,
    jsonProperty: "description",
    format: (t) => String(t)
  },
  POSTCODE: {
    attribute: "postcode",
    value: null,
    jsonProperty: "postcode",
    format: (t) => String(t)
  },
  STATUS: {
    attribute: "status",
    value: !0,
    jsonProperty: "status",
    format: (t) => p(t),
    override: !0
  },
  CURRENCY: {
    attribute: "currency",
    value: "GBP",
    jsonProperty: "currency",
    format: (t) => String(t),
    override: !0
  },
  MINIMUM_CASH_ORDER: {
    attribute: "minimum_cash_order",
    value: 0,
    jsonProperty: "minimumCashOrder",
    format: (t) => Number(t),
    override: !0
  },
  CARRY_BAG_FEE: {
    attribute: "carry_bag_fee",
    value: 0,
    jsonProperty: "carryBagFee",
    format: (t) => Number(t),
    override: !0
  },
  VAT: {
    attribute: "vat",
    value: 0,
    jsonProperty: "vat",
    format: (t) => Number(t),
    override: !0
  },
  TIME_ZONE: {
    attribute: "time_zone",
    value: null,
    jsonProperty: "timeZone",
    format: (t) => String(t),
    override: !0
  },
  IS_DELETED: {
    attribute: "is_deleted",
    value: !1,
    jsonProperty: "isDeleted",
    format: (t) => p(t),
    override: !0
  },
  SERVICE_TYPES: {
    attribute: "service_types",
    value: [],
    jsonProperty: "serviceTypes",
    format: (t) => Array.isArray(t) ? t : [],
    override: !0
  },
  START_TOKEN_NUMBER: {
    attribute: "start_token_number",
    value: !1,
    jsonProperty: "startTokenNumber",
    format: (t) => p(t),
    override: !0
  },
  LATITUDE: {
    attribute: "latitude",
    value: null,
    jsonProperty: "latitude",
    format: (t) => String(t),
    override: !0
  },
  LONGITUDE: {
    attribute: "longitude",
    value: null,
    jsonProperty: "longitude",
    format: (t) => String(t),
    override: !0
  }
}, P = {
  NAME: {
    attribute: "name",
    value: null,
    jsonProperty: "name",
    format: (t) => String(t)
  },
  EMAIL: {
    attribute: "email",
    value: null,
    jsonProperty: "email",
    format: (t) => String(t)
  },
  TYPE: {
    attribute: "type",
    value: null,
    jsonProperty: "type",
    format: (t) => String(t)
  },
  LANGUAGES: {
    attribute: "languages",
    value: ["en-US"],
    jsonProperty: "languages",
    format: (t) => JSON.parse(t),
    cast: (t) => JSON.stringify(t),
    override: !0
  },
  PHONE: {
    attribute: "phone",
    value: null,
    jsonProperty: "phone",
    format: (t) => String(t)
  },
  ORDER_TAB_ACCESS_TOKEN: {
    attribute: "order_tab_access_token",
    value: null,
    jsonProperty: "orderTabAccessToken",
    format: (t) => String(t)
  },
  MAX_ALLOWED_DEVICES: {
    attribute: "max_allowed_devices",
    value: null,
    jsonProperty: "maxAllowedDevices",
    format: (t) => Number(t)
  },
  STATUS: {
    attribute: "status",
    value: !0,
    jsonProperty: "status",
    format: (t) => p(t)
  },
  DOMAIN: {
    attribute: "domain",
    value: null,
    jsonProperty: "domain",
    format: (t) => String(t)
  },
  CITY: {
    attribute: "city",
    value: "",
    jsonProperty: "city",
    format: (t) => String(t)
  },
  COUNTRY: {
    attribute: "country",
    value: null,
    jsonProperty: "country",
    format: (t) => String(t)
  },
  POSTCODE: {
    attribute: "postcode",
    value: null,
    jsonProperty: "postcode",
    format: (t) => String(t)
  },
  CURRENCY: {
    attribute: "currency",
    value: "GBP",
    jsonProperty: "currency",
    format: (t) => String(t),
    override: !0
  },
  SUBSCRIPTION: {
    attribute: "subscription",
    value: "BASIC",
    jsonProperty: "subscription",
    format: (t) => String(t)
  },
  LOGO_URL: {
    attribute: "logo_url",
    value: null,
    jsonProperty: "logoUrl",
    format: (t) => String(t),
    override: !0
  },
  MINIMUM_CASH_ORDER: {
    attribute: "minimum_cash_order",
    value: 0,
    jsonProperty: "minimumCashOrder",
    format: (t) => Number(t),
    override: !0
  },
  CARRY_BAG_FEE: {
    attribute: "carry_bag_fee",
    value: 0,
    jsonProperty: "carryBagFee",
    format: (t) => Number(t)
  },
  VAT: {
    attribute: "vat",
    value: 0,
    jsonProperty: "vat",
    format: (t) => Number(t),
    override: !0
  },
  CERTIFICATION_DETAILS: {
    attribute: "certification_details",
    value: null,
    jsonProperty: "certificationDetails",
    format: (t) => String(t)
  },
  PARTNER_TYPE: {
    attribute: "partner_type",
    value: "",
    jsonProperty: "partnerType",
    format: (t) => String(t)
  },
  TIME_ZONE: {
    attribute: "time_zone",
    value: null,
    jsonProperty: "timeZone",
    format: (t) => String(t),
    override: !0
  },
  IS_DELETED: {
    attribute: "is_deleted",
    value: !1,
    jsonProperty: "isDeleted",
    format: (t) => p(t),
    override: !0
  },
  ADDRESS: {
    attribute: "address",
    value: null,
    jsonProperty: "address",
    format: (t) => String(t)
  },
  SERVICE_TYPES: {
    attribute: "service_types",
    value: [],
    jsonProperty: "serviceTypes",
    format: (t) => JSON.parse(t),
    cast: (t) => JSON.stringify(t),
    override: !0
  },
  SERVICE_CHARGES: {
    attribute: "service_charges",
    value: [],
    jsonProperty: "serviceCharges",
    format: (t) => JSON.parse(t),
    cast: (t) => JSON.stringify(t),
    override: !0
  },
  LATITUDE: {
    attribute: "latitude",
    value: null,
    jsonProperty: "latitude",
    format: (t) => String(t)
  },
  LONGITUDE: {
    attribute: "longitude",
    value: null,
    jsonProperty: "longitude",
    format: (t) => String(t)
  }
}, H = {
  PASSWORD: {
    attribute: "password",
    value: null,
    jsonProperty: "password",
    format: (t) => String(t)
  },
  EMAIL: {
    attribute: "email",
    value: null,
    jsonProperty: "email",
    format: (t) => String(t)
  },
  NAME: {
    attribute: "name",
    value: null,
    jsonProperty: "name",
    format: (t) => String(t)
  },
  PHONE: {
    attribute: "phone",
    value: null,
    jsonProperty: "phone",
    format: (t) => String(t)
  },
  PERMISSIONS: {
    attribute: "permissions",
    value: [],
    jsonProperty: "permissions",
    format: (t) => Array.isArray(t) ? t : []
  },
  STATUS: {
    attribute: "status",
    value: !0,
    jsonProperty: "status",
    format: (t) => p(t)
  },
  CREATED_AT: {
    attribute: "created_at",
    value: null,
    jsonProperty: "createdAt",
    format: (t) => t ? new Date(t) : null
  },
  IS_DELETED: {
    attribute: "is_deleted",
    value: !1,
    jsonProperty: "isDeleted",
    format: (t) => p(t)
  },
  FP_TOKEN: {
    attribute: "fp_token",
    value: null,
    jsonProperty: "fpToken",
    format: (t) => String(t)
  },
  FP_DURATION: {
    attribute: "fp_duration",
    value: null,
    jsonProperty: "fpDuration",
    format: (t) => t ? new Date(t) : null
  },
  IS_ADMIN: {
    attribute: "is_admin",
    value: !1,
    jsonProperty: "isAdmin",
    format: (t) => p(t)
  }
}, R = {
  NAME: {
    attribute: "name",
    value: null,
    jsonProperty: "name",
    format: (t) => String(t)
  },
  PASSWORD: {
    attribute: "password",
    value: null,
    jsonProperty: "password",
    format: (t) => String(t)
  },
  EMAIL: {
    attribute: "email",
    value: null,
    jsonProperty: "email",
    format: (t) => String(t)
  },
  PASSCODE: {
    attribute: "passcode",
    value: null,
    jsonProperty: "passcode",
    format: (t) => String(t)
  },
  PERMISSIONS: {
    attribute: "permissions",
    value: [],
    jsonProperty: "permissions",
    format: (t) => Array.isArray(t) ? t : []
  }
}, W = {
  TAKE_AWAY: "TAKE_AWAY",
  DELIVERY: "DELIVERY",
  DINE_IN: "DINE_IN",
  WEBSITE_BOOKING: "WEBSITE_BOOKING",
  COLLECTION: "COLLECTION",
  TABLE_BOOKING: "TABLE_BOOKING",
  VALUES: [
    "TAKE_AWAY",
    "DELIVERY",
    "DINE_IN",
    "COLLECTION",
    "TABLE_BOOKING",
    "WEBSITE_BOOKING"
  ]
}, E = (t, e, a = !1, o = !0) => {
  const s = {};
  return Object.values(t).forEach((r) => {
    let u = null;
    e[r.attribute] ? u = r.format(e[r.attribute].value) : a && (u = r.value), o ? s[r.jsonProperty] = u : s[r.jsonProperty] = { ...r, value: u };
  }), s;
}, J = Object.values(
  P
).map((t) => t.jsonProperty), x = Object.values(
  P
).map((t) => t.attribute);
async function Z(t, e, a, o, s = !1) {
  const r = {};
  for (const c of t)
    r[c.id] = c;
  r[e] = {
    id: e,
    type: v.PARTNER,
    parent: null
  }, await U(r, a, o);
  const u = L(r), i = h(r);
  return T(i, r, u), B(r, u), M(r), s || delete r[e], r;
}
const D = async (t, e, a) => {
  const o = await e(t), s = {};
  for (const i of o) {
    const c = i.partnerId;
    let f = s[c];
    f || (f = {}, s[c] = f), f[i.name] = i;
  }
  const r = /* @__PURE__ */ new Set();
  for (const i of Object.keys(s)) {
    const c = s[i];
    for (const f of Object.values(c))
      r.add(f);
  }
  const u = await a(t);
  for (const i of u) {
    const c = s[i == null ? void 0 : i.partnerId];
    if (!c) continue;
    const f = c[i == null ? void 0 : i.profileName];
    f && (f.attributes || (f.attributes = {}), f.attributes[i.name] = i);
  }
  return r;
}, L = (t) => {
  const e = {};
  for (const a of Object.values(t)) {
    const o = a != null && a.parent ? t[a.parent] : null;
    o && (e[o.id] || (e[o.id] = []), e[o.id].push(a.id));
  }
  return e;
}, h = (t) => {
  let e = null;
  for (const a of Object.values(t))
    if (!a.parent)
      if (!e) e = a;
      else throw new Error("find root faild: more than one root parent found");
  if (!e) throw new Error("No root partner found");
  return e;
}, U = async (t, e, a) => {
  const o = Object.keys(t), s = await D(o, e, a);
  for (const r of s) {
    const u = t[r.partnerId], i = w(r, u);
    u.privateProfile = i;
  }
  for (const r of Object.keys(t)) {
    const u = t[r];
    u != null && u.privateProfile;
  }
}, M = (t) => {
  const e = [];
  for (const a of Object.values(t)) {
    const o = a == null ? void 0 : a.privateProfile;
    if (o) {
      const s = (o == null ? void 0 : o.attributes) || {}, r = {};
      for (const u of Object.keys(s)) {
        const i = s[u];
        r[u] = i.value ?? i.overriden;
      }
      o.attributes = { ...r };
    } else
      e.push(a.id), console.warn("no user assigned this partner", JSON.stringify(a));
  }
  for (const a of e)
    delete t[a];
}, B = (t, e) => {
  var o, s, r;
  const a = /* @__PURE__ */ new Set();
  for (const u of Object.values(t))
    if ((r = (s = (o = u.privateProfile) == null ? void 0 : o.attributes) == null ? void 0 : s.isDeleted) != null && r.value && (a.add(u.id), e[u.id]))
      for (const i of e[u.id])
        a.add(i);
  for (const u of a)
    delete t[u];
}, w = (t, e) => {
  const a = {
    name: t.name,
    partnerId: e.id,
    type: t.type,
    attributes: t.attributes
  };
  let o = {};
  e.type === v.PARTNER ? o = E(P, t.attributes, !1, !1) : e.type === v.LOCATION ? o = E(C, t.attributes, !1, !1) : e.type === v.DEVICE ? o = E(O, t.attributes, !1, !1) : e.type === v.USER ? o = E(_, t.attributes, !1, !1) : e.type === v.STAFF && (o = E(R, t.attributes, !1, !1));
  for (const s of Object.values(o))
    s.owner = e.id, s.profile = a.name;
  return a.attributes = o, a;
}, F = (t, e) => {
  if (!t || !e) return;
  const a = t.attributes || {}, o = e.attributes || {};
  for (const s of Object.keys(a)) {
    const r = a[s], u = o[s];
    u && (u && r && u.value === null && u.override === !0 && r.value ? o[s] = { ...r } : o[s] = { ...u });
  }
  e.attributes = o;
}, Y = (t, e) => {
  F(t, e);
}, G = (t, e) => {
  const a = t == null ? void 0 : t.parent;
  if (!a) return;
  const s = e[a].privateProfile || null, r = t.privateProfile || null;
  r && s && Y(s, r), t.privateProfile = r || void 0;
}, T = (t, e, a) => {
  G(t, e);
  const o = a[t.id];
  if (o)
    for (const s of o)
      T(e[s], e, a);
};
export {
  H as AdminProfileAttributes,
  O as DeviceProfileAttributes,
  C as LocationProfileAttributes,
  P as PartnerProfileAttributes,
  x as PartnerProfileAttributesDbKeys,
  J as PartnerProfileAttributesJsonKeys,
  R as StaffProfileAttributes,
  _ as UserProfileAttributes,
  V as applyInvoice,
  E as deserializeProfileAttribute,
  Z as generateProfile,
  K as partnerModes,
  v as partnerTypes,
  k as profileTypes,
  W as serviceTypes
};
