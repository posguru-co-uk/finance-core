function W(t, r, n) {
  var p, f, S, N, I;
  let a = 0, s = 0, o = 0, u = (((p = t.items) == null ? void 0 : p.reduce((e, b) => b.id && b.id > e ? b.id : e, 0)) || 0) + 1;
  (f = t.items) == null || f.forEach((e, b) => {
    var T, _, g, O;
    let v = Number((e == null ? void 0 : e.amount) || 0);
    const P = r[e.productId];
    P && !(e != null && e.isManualPrice) && ((T = P == null ? void 0 : P.serviceTypeCharges) != null && T[t.serviceType] ? v = (_ = P == null ? void 0 : P.serviceTypeCharges) == null ? void 0 : _[t.serviceType].salesPrice : v = P.salesPrice), e.id || (e.id = u++);
    const d = Number(v) * Number(e.quantity);
    e.amount = Number(v), e.totalAmount = d, e != null && e.isManualPrice || (e.totalCost = d);
    let C = (((g = e.addons) == null ? void 0 : g.reduce((l, y) => y.id && y.id > l ? y.id : l, 0)) || 0) + 1;
    if ((O = e.addons) == null || O.forEach((l, y) => {
      let R = Number((l == null ? void 0 : l.amount) || 0);
      l != null && l.id || (l.id = C++), l.orderItemsId = e.id, e != null && e.isManualPrice ? l.totalAmount = 0 : l.totalAmount = R * Number(l.quantity), e.totalCost += l.totalAmount;
    }), o = o + e.totalCost, e != null && e.discountId) {
      if (!(e != null && e.isManualPrice)) {
        const l = n[e == null ? void 0 : e.discountId];
        let y = 0;
        l.discountType === "PERCENT" ? y = Number((e.totalCost * (Number(l.discount) / 100)).toFixed(2)) : e.totalCost >= Number(l.discount) ? y = Number(l.discount) : (e.discountId = null, e.discount = null), s = s + y, e.discountAmount = y, e.totalCost = e.totalCost - y;
      }
    } else
      e.discountId = null, e.discount = null;
    a += e.totalCost;
  });
  let i = 0;
  if (t != null && t.discountId) {
    const e = n[t == null ? void 0 : t.discountId];
    e && ((e == null ? void 0 : e.discountType) === "PERCENT" ? i = Number((a * (Number(e.discount) / 100)).toFixed(2)) : a >= Number(e.discount) ? i = Number(e.discount) : t.discountId = null);
  }
  if (a = Number(a) - Number(i), t.subTotal = a, t.totalAmount = o, t.totalDiscount = s, t.discountAmount = i, t.billAmount = a, Number(t == null ? void 0 : t.carryBagQuantity) && Number(t.carryBagFee) && (t.billAmount = Number(t.billAmount) + (Number(t == null ? void 0 : t.carryBagQuantity) && Number(t.carryBagFee))), t != null && t.serviceChargePercent && Number(t.serviceChargePercent)) {
    const e = Number(a) * (Number(t.serviceChargePercent) / 100);
    t.billAmount = Number(t.billAmount) + e, t.serviceCharge = e;
  }
  if ((t == null ? void 0 : t.serviceType) === "DELIVERY" && (t != null && t.deliveryChargeId) && (t != null && t.deliveryCharge)) {
    const e = Number(t == null ? void 0 : t.deliveryCharge);
    t.billAmount = Number(t.billAmount) + e;
  }
  if ((S = t == null ? void 0 : t.tables) != null && S.length && (t == null ? void 0 : t.serviceType) === "DINE_IN") {
    let e = (((N = t.tables) == null ? void 0 : N.reduce((b, v) => v.id && v.id > b ? v.id : b, 0)) || 0) + 1;
    (I = t.tables) == null || I.forEach((b, v) => {
      b.id || (b.id = e++);
    });
  }
  return t;
}
const E = {
  PARTNER: "PARTNER",
  USER: "USER",
  LOCATION: "LOCATION",
  DEVICE: "DEVICE",
  STAFF: "STAFF",
  VALUES: ["PARTNER", "USER", "LOCATION", "DEVICE", "STAFF"]
}, x = {
  CLOUDE_KITCHEN: "CLOUDE_KITCHEN",
  RESTAURANT: "RESTAURANT",
  VALUES: ["CLOUDE_KITCHEN", "RESTAURANT"]
}, Z = {
  PRIVATE: "PRIVATE",
  STYLE: "STYLE",
  APPLICATION: "APPLICATION"
}, c = (t) => typeof t == "string" ? t.toLowerCase() === "true" : !!t, D = {
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
    format: (t) => c(t),
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
    format: (t) => c(t),
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
}, L = {
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
    format: (t) => c(t),
    override: !0
  },
  IS_DELETED: {
    attribute: "is_deleted",
    value: !1,
    jsonProperty: "isDeleted",
    format: (t) => c(t),
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
    format: (t) => c(t)
  }
}, h = {
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
    format: (t) => c(t),
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
    format: (t) => c(t),
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
    format: (t) => c(t),
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
}, A = {
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
    format: (t) => c(t)
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
    format: (t) => c(t),
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
}, z = {
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
    format: (t) => c(t)
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
    format: (t) => c(t)
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
    format: (t) => c(t)
  }
}, U = {
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
  PASSCODE: {
    attribute: "passcode",
    value: null,
    jsonProperty: "passcode",
    format: (t) => String(t)
  },
  HOURLY_RATE: {
    attribute: "hourly_rate",
    value: 0,
    jsonProperty: "hourlyRate",
    format: (t) => Number(t),
    cast: (t) => Number(t)
  },
  PERMISSIONS: {
    attribute: "permissions",
    value: [],
    jsonProperty: "permissions",
    format: (t) => JSON.parse(t),
    cast: (t) => JSON.stringify(t)
  },
  IS_DELETED: {
    attribute: "is_deleted",
    value: !1,
    jsonProperty: "isDeleted",
    format: (t) => c(t),
    override: !0
  }
}, q = {
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
}, m = (t, r, n = !1, a = !0) => {
  const s = {};
  return Object.values(t).forEach((o) => {
    let u = null;
    r[o.attribute] ? u = o.format(r[o.attribute].value) : n && (u = o.value), a ? s[o.jsonProperty] = u : s[o.jsonProperty] = { ...o, value: u };
  }), s;
}, Q = Object.values(
  A
).map((t) => t.jsonProperty), X = Object.values(
  A
).map((t) => t.attribute);
async function $(t, r, n, a, s = !1) {
  const o = {};
  for (const p of t)
    o[p.id] = p;
  o[r] = {
    id: r,
    type: E.PARTNER,
    parent: null
  }, await w(o, n, a);
  const u = B(o), i = F(o);
  return j(i, o, u), V(o, u), Y(o), G(o), s || delete o[r], o;
}
const M = async (t, r, n) => {
  const a = await r(t), s = {};
  for (const i of a) {
    const p = i.partnerId;
    let f = s[p];
    f || (f = {}, s[p] = f), f[i.name] = i;
  }
  const o = /* @__PURE__ */ new Set();
  for (const i of Object.keys(s)) {
    const p = s[i];
    for (const f of Object.values(p))
      o.add(f);
  }
  const u = await n(t);
  for (const i of u) {
    const p = s[i == null ? void 0 : i.partnerId];
    if (!p) continue;
    const f = p[i == null ? void 0 : i.profileName];
    f && (f.attributes || (f.attributes = {}), f.attributes[i.name] = i);
  }
  return o;
}, B = (t) => {
  const r = {};
  for (const n of Object.values(t)) {
    const a = n != null && n.parent ? t[n.parent] : null;
    a && (r[a.id] || (r[a.id] = []), r[a.id].push(n.id));
  }
  return r;
}, F = (t) => {
  let r = null;
  for (const n of Object.values(t))
    if (!n.parent)
      if (!r) r = n;
      else throw new Error("find root faild: more than one root parent found");
  if (!r) throw new Error("No root partner found");
  return r;
}, w = async (t, r, n) => {
  const a = Object.keys(t), s = await M(a, r, n);
  for (const o of s) {
    const u = t[o.partnerId], i = K(o, u);
    u.privateProfile = i;
  }
  for (const o of Object.keys(t)) {
    const u = t[o];
    u != null && u.privateProfile;
  }
}, Y = (t) => {
  const r = [];
  for (const n of Object.values(t)) {
    const a = n == null ? void 0 : n.privateProfile;
    if (a) {
      const s = (a == null ? void 0 : a.attributes) || {}, o = {};
      for (const u of Object.keys(s)) {
        const i = s[u];
        o[u] = i.value ?? i.overriden;
      }
      a.attributes = { ...o };
    } else
      r.push(n.id), console.warn("no user assigned this partner", JSON.stringify(n));
  }
  for (const n of r)
    delete t[n];
}, G = (t) => {
}, V = (t, r) => {
  var a, s, o;
  const n = /* @__PURE__ */ new Set();
  for (const u of Object.values(t))
    if ((o = (s = (a = u.privateProfile) == null ? void 0 : a.attributes) == null ? void 0 : s.isDeleted) != null && o.value && (n.add(u.id), r[u.id]))
      for (const i of r[u.id])
        n.add(i);
  for (const u of n)
    delete t[u];
}, K = (t, r) => {
  const n = {
    name: t.name,
    partnerId: r.id,
    type: t.type,
    attributes: t.attributes
  };
  let a = {};
  r.type === E.PARTNER ? a = m(A, t.attributes, !1, !1) : r.type === E.LOCATION ? a = m(h, t.attributes, !1, !1) : r.type === E.DEVICE ? a = m(D, t.attributes, !1, !1) : r.type === E.USER ? a = m(L, t.attributes, !1, !1) : r.type === E.STAFF && (a = m(U, t.attributes, !1, !1));
  for (const s of Object.values(a))
    s.owner = r.id, s.profile = n.name;
  return n.attributes = a, n;
}, k = (t, r) => {
  if (!t || !r) return;
  const n = t.attributes || {}, a = r.attributes || {};
  for (const s of Object.keys(n)) {
    const o = n[s], u = a[s];
    u && (u && o && u.value === null && u.override === !0 && o.value ? a[s] = { ...o } : a[s] = { ...u });
  }
  r.attributes = a;
}, H = (t, r) => {
  k(t, r);
}, J = (t, r) => {
  const n = t == null ? void 0 : t.parent;
  if (!n) return;
  const s = r[n].privateProfile || null, o = t.privateProfile || null;
  o && s && H(s, o), t.privateProfile = o || void 0;
}, j = (t, r, n) => {
  J(t, r);
  const a = n[t.id];
  if (a)
    for (const s of a)
      j(r[s], r, n);
};
export {
  z as AdminProfileAttributes,
  D as DeviceProfileAttributes,
  h as LocationProfileAttributes,
  A as PartnerProfileAttributes,
  X as PartnerProfileAttributesDbKeys,
  Q as PartnerProfileAttributesJsonKeys,
  U as StaffProfileAttributes,
  L as UserProfileAttributes,
  W as applyInvoice,
  m as deserializeProfileAttribute,
  $ as generateProfile,
  x as partnerModes,
  E as partnerTypes,
  Z as profileTypes,
  q as serviceTypes
};
