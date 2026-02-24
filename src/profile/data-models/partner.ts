import { isBoolean } from "../../utils";
import { AttributeConfig } from './type'

export const PartnerProfileAttributes = {
  NAME: {
    attribute: "name",
    value: null,
    jsonProperty: "name",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,

  EMAIL: {
    attribute: "email",
    value: null,
    jsonProperty: "email",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,

  TYPE: {
    attribute: "type",
    value: null,
    jsonProperty: "type",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,

  LANGUAGES: {
    attribute: "languages",
    value: ["en-US"],
    jsonProperty: "languages",
    format: (value: any) => JSON.parse(value),
    cast: (value: any) => JSON.stringify(value),
    override: true,
  } as AttributeConfig<string[]>,

  PHONE: {
    attribute: "phone",
    value: null,
    jsonProperty: "phone",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,

  ORDER_TAB_ACCESS_TOKEN: {
    attribute: "order_tab_access_token",
    value: null,
    jsonProperty: "orderTabAccessToken",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,

  MAX_ALLOWED_DEVICES: {
    attribute: "max_allowed_devices",
    value: null,
    jsonProperty: "maxAllowedDevices",
    format: (value: any) => Number(value),
  } as AttributeConfig<number | null>,

  STATUS: {
    attribute: "status",
    value: true,
    jsonProperty: "status",
    format: (value: any) => isBoolean(value),
  } as AttributeConfig<boolean>,

  DOMAIN: {
    attribute: "domain",
    value: null,
    jsonProperty: "domain",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,

  CITY: {
    attribute: "city",
    value: "",
    jsonProperty: "city",
    format: (value: any) => String(value),
  } as AttributeConfig<string>,

  COUNTRY: {
    attribute: "country",
    value: null,
    jsonProperty: "country",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,

  POSTCODE: {
    attribute: "postcode",
    value: null,
    jsonProperty: "postcode",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,

  CURRENCY: {
    attribute: "currency",
    value: "GBP",
    jsonProperty: "currency",
    format: (value: any) => String(value),
    override: true,
  } as AttributeConfig<string>,

  SUBSCRIPTION: {
    attribute: "subscription",
    value: "BASIC",
    jsonProperty: "subscription",
    format: (value: any) => String(value),
  } as AttributeConfig<string>,

  LOGO_URL: {
    attribute: "logo_url",
    value: null,
    jsonProperty: "logoUrl",
    format: (value: any) => String(value),
    override: true,
  } as AttributeConfig<string | null>,

  MINIMUM_CASH_ORDER: {
    attribute: "minimum_cash_order",
    value: 0,
    jsonProperty: "minimumCashOrder",
    format: (value: any) => Number(value),
    override: true,
  } as AttributeConfig<number>,

  CARRY_BAG_FEE: {
    attribute: "carry_bag_fee",
    value: 0,
    jsonProperty: "carryBagFee",
    format: (value: any) => Number(value),
  } as AttributeConfig<number>,

  VAT: {
    attribute: "vat",
    value: 0,
    jsonProperty: "vat",
    format: (value: any) => Number(value),
    override: true,
  } as AttributeConfig<number>,

  CERTIFICATION_DETAILS: {
    attribute: "certification_details",
    value: null,
    jsonProperty: "certificationDetails",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,

  PARTNER_TYPE: {
    attribute: "partner_type",
    value: "",
    jsonProperty: "partnerType",
    format: (value: any) => String(value),
  } as AttributeConfig<string>,

  TIME_ZONE: {
    attribute: "time_zone",
    value: null,
    jsonProperty: "timeZone",
    format: (value: any) => String(value),
    override: true,
  } as AttributeConfig<string | null>,

  IS_DELETED: {
    attribute: "is_deleted",
    value: false,
    jsonProperty: "isDeleted",
    format: (value: any) => isBoolean(value),
    override: true,
  } as AttributeConfig<boolean>,

  ADDRESS: {
    attribute: "address",
    value: null,
    jsonProperty: "address",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,

  SERVICE_TYPES: {
    attribute: "service_types",
    value: [] as string[],
    jsonProperty: "serviceTypes",
    format: (value: any) => JSON.parse(value),
    cast: (value: any) => JSON.stringify(value),
    override: true,
  } as AttributeConfig<string[]>,
  SERVICE_CHARGES: {
    attribute: "service_charges",
    value: [] as number[],
    jsonProperty: "serviceCharges",
    format: (value: any) => JSON.parse(value),
    cast: (value: any) => JSON.stringify(value),
    override: true,
  } as AttributeConfig<number[]>,
  LATITUDE: {
    attribute: 'latitude',
    value: null,
    jsonProperty: "latitude",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,
  LONGITUDE: {
    attribute: 'longitude',
    value: null,
    jsonProperty: "longitude",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,
  ADDON_FEATURES: {
    attribute: "addon_features",
    value: [] as number[],
    jsonProperty: "addonFeatures",
    format: (value: any): number[] => JSON.parse(value),
    cast: (value: number[]) => JSON.stringify(value),
    override: true,
  } as AttributeConfig<number[]>,
  
  DEPARTMENTS : {
    attribute: "departments",
    value: [] as string[],
    jsonProperty: "departments",
    format: (value: any) => JSON.parse(value),
    cast: (value: any) => JSON.stringify(value),
    override: true,
  } as AttributeConfig<string[]>,
};
