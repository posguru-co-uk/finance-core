function k(t, r, o) {
  var i, p, f, S, N;
  let n = 0, s = 0, a = 0, u = (((i = t.items) == null ? void 0 : i.reduce((e, b) => b.id && b.id > e ? b.id : e, 0)) || 0) + 1;
  if ((p = t.items) == null || p.forEach((e, b) => {
    var I, T, _, g;
    let v = Number((e == null ? void 0 : e.amount) || 0);
    const E = r[e.productId];
    E && !(e != null && e.isManualPrice) && ((I = E == null ? void 0 : E.serviceTypeCharges) != null && I[t.serviceType] ? v = (T = E == null ? void 0 : E.serviceTypeCharges) == null ? void 0 : T[t.serviceType].salesPrice : v = E.salesPrice), e.id || (e.id = u++);
    const d = Number(v) * Number(e.quantity);
    e.amount = Number(v), e.totalAmount = d, e != null && e.isManualPrice || (e.totalCost = d);
    let O = (((_ = e.addons) == null ? void 0 : _.reduce((l, y) => y.id && y.id > l ? y.id : l, 0)) || 0) + 1;
    if ((g = e.addons) == null || g.forEach((l, y) => {
      Number((l == null ? void 0 : l.amount) || 0), l != null && l.id || (l.id = O++), l.orderItemsId = e.id, e != null && e.isManualPrice && (l.totalAmount = 0), e.totalCost += l.totalAmount;
    }), a = a + e.totalCost, e != null && e.discountId) {
      const l = o[e == null ? void 0 : e.discountId];
      let y = 0;
      l.discountType === "PERCENT" ? y = Number((e.totalCost * (Number(l.discount) / 100)).toFixed(2)) : e.totalCost >= Number(l.discount) ? y = e.totalCost - Number(l.discount) : (e.discountId = null, e.discount = null), s = s + y, e.discountAmount = y, e.totalCost = e.totalCost - y;
    }
    n += e.totalCost;
  }), t.subTotal = n, t.totalAmount = a, t.totalDiscount = s, t.billAmount = n, Number(t == null ? void 0 : t.carryBagQuantity) && Number(t.carryBagFee) && (t.billAmount = Number(t.billAmount) + (Number(t == null ? void 0 : t.carryBagQuantity) && Number(t.carryBagFee))), t != null && t.serviceChargePercent && Number(t.serviceChargePercent)) {
    const e = Number(n) * (Number(t.serviceChargePercent) / 100);
    t.billAmount = Number(t.billAmount) + e, t.serviceCharge = e;
  }
  if ((t == null ? void 0 : t.serviceType) === "DELIVERY" && (t != null && t.deliveryChargeId) && (t != null && t.deliveryCharge)) {
    const e = Number(t == null ? void 0 : t.deliveryCharge);
    t.billAmount = Number(t.billAmount) + e;
  }
  if ((f = t == null ? void 0 : t.tables) != null && f.length && (t == null ? void 0 : t.serviceType) === "DINE_IN") {
    let e = (((S = t.tables) == null ? void 0 : S.reduce((b, v) => v.id && v.id > b ? v.id : b, 0)) || 0) + 1;
    (N = t.tables) == null || N.forEach((b, v) => {
      b.id || (b.id = e++);
    });
  }
  return t;
}
const P = {
  PARTNER: "PARTNER",
  USER: "USER",
  LOCATION: "LOCATION",
  DEVICE: "DEVICE",
  STAFF: "STAFF",
  VALUES: ["PARTNER", "USER", "LOCATION", "DEVICE", "STAFF"]
}, H = {
  CLOUDE_KITCHEN: "CLOUDE_KITCHEN",
  RESTAURANT: "RESTAURANT",
  VALUES: ["CLOUDE_KITCHEN", "RESTAURANT"]
}, J = {
  PRIVATE: "PRIVATE",
  STYLE: "STYLE",
  APPLICATION: "APPLICATION"
}, c = (t) => typeof t == "string" ? t.toLowerCase() === "true" : !!t, C = {
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
}, R = {
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
}, D = {
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
}, W = {
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
}, L = {
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
}, x = {
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
}, m = (t, r, o = !1, n = !0) => {
  const s = {};
  return Object.values(t).forEach((a) => {
    let u = null;
    r[a.attribute] ? u = a.format(r[a.attribute].value) : o && (u = a.value), n ? s[a.jsonProperty] = u : s[a.jsonProperty] = { ...a, value: u };
  }), s;
}, Z = Object.values(
  A
).map((t) => t.jsonProperty), z = Object.values(
  A
).map((t) => t.attribute);
async function Q(t, r, o, n, s = !1) {
  const a = {};
  for (const p of t)
    a[p.id] = p;
  a[r] = {
    id: r,
    type: P.PARTNER,
    parent: null
  }, await B(a, o, n);
  const u = U(a), i = M(a);
  return j(i, a, u), w(a, u), F(a), s || delete a[r], a;
}
const h = async (t, r, o) => {
  const n = await r(t), s = {};
  for (const i of n) {
    const p = i.partnerId;
    let f = s[p];
    f || (f = {}, s[p] = f), f[i.name] = i;
  }
  const a = /* @__PURE__ */ new Set();
  for (const i of Object.keys(s)) {
    const p = s[i];
    for (const f of Object.values(p))
      a.add(f);
  }
  const u = await o(t);
  for (const i of u) {
    const p = s[i == null ? void 0 : i.partnerId];
    if (!p) continue;
    const f = p[i == null ? void 0 : i.profileName];
    f && (f.attributes || (f.attributes = {}), f.attributes[i.name] = i);
  }
  return a;
}, U = (t) => {
  const r = {};
  for (const o of Object.values(t)) {
    const n = o != null && o.parent ? t[o.parent] : null;
    n && (r[n.id] || (r[n.id] = []), r[n.id].push(o.id));
  }
  return r;
}, M = (t) => {
  let r = null;
  for (const o of Object.values(t))
    if (!o.parent)
      if (!r) r = o;
      else throw new Error("find root faild: more than one root parent found");
  if (!r) throw new Error("No root partner found");
  return r;
}, B = async (t, r, o) => {
  const n = Object.keys(t), s = await h(n, r, o);
  for (const a of s) {
    const u = t[a.partnerId], i = Y(a, u);
    u.privateProfile = i;
  }
  for (const a of Object.keys(t)) {
    const u = t[a];
    u != null && u.privateProfile;
  }
}, F = (t) => {
  const r = [];
  for (const o of Object.values(t)) {
    const n = o == null ? void 0 : o.privateProfile;
    if (n) {
      const s = (n == null ? void 0 : n.attributes) || {}, a = {};
      for (const u of Object.keys(s)) {
        const i = s[u];
        a[u] = i.value ?? i.overriden;
      }
      n.attributes = { ...a };
    } else
      r.push(o.id), console.warn("no user assigned this partner", JSON.stringify(o));
  }
  for (const o of r)
    delete t[o];
}, w = (t, r) => {
  var n, s, a;
  const o = /* @__PURE__ */ new Set();
  for (const u of Object.values(t))
    if ((a = (s = (n = u.privateProfile) == null ? void 0 : n.attributes) == null ? void 0 : s.isDeleted) != null && a.value && (o.add(u.id), r[u.id]))
      for (const i of r[u.id])
        o.add(i);
  for (const u of o)
    delete t[u];
}, Y = (t, r) => {
  const o = {
    name: t.name,
    partnerId: r.id,
    type: t.type,
    attributes: t.attributes
  };
  let n = {};
  r.type === P.PARTNER ? n = m(A, t.attributes, !1, !1) : r.type === P.LOCATION ? n = m(D, t.attributes, !1, !1) : r.type === P.DEVICE ? n = m(C, t.attributes, !1, !1) : r.type === P.USER ? n = m(R, t.attributes, !1, !1) : r.type === P.STAFF && (n = m(L, t.attributes, !1, !1));
  for (const s of Object.values(n))
    s.owner = r.id, s.profile = o.name;
  return o.attributes = n, o;
}, G = (t, r) => {
  if (!t || !r) return;
  const o = t.attributes || {}, n = r.attributes || {};
  for (const s of Object.keys(o)) {
    const a = o[s], u = n[s];
    u && (u && a && u.value === null && u.override === !0 && a.value ? n[s] = { ...a } : n[s] = { ...u });
  }
  r.attributes = n;
}, V = (t, r) => {
  G(t, r);
}, K = (t, r) => {
  const o = t == null ? void 0 : t.parent;
  if (!o) return;
  const s = r[o].privateProfile || null, a = t.privateProfile || null;
  a && s && V(s, a), t.privateProfile = a || void 0;
}, j = (t, r, o) => {
  K(t, r);
  const n = o[t.id];
  if (n)
    for (const s of n)
      j(r[s], r, o);
};
export {
  W as AdminProfileAttributes,
  C as DeviceProfileAttributes,
  D as LocationProfileAttributes,
  A as PartnerProfileAttributes,
  z as PartnerProfileAttributesDbKeys,
  Z as PartnerProfileAttributesJsonKeys,
  L as StaffProfileAttributes,
  R as UserProfileAttributes,
  k as applyInvoice,
  m as deserializeProfileAttribute,
  Q as generateProfile,
  H as partnerModes,
  P as partnerTypes,
  J as profileTypes,
  x as serviceTypes
};
