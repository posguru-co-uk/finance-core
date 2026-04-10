import { isBoolean } from '../../utils';
import {AttributeConfig} from './type'

export const DeviceProfileAttributes = {
  NAME: {
    attribute: "name",
    value: null,
    jsonProperty: "name",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,

  DESCRIPTION: {
    attribute: "description",
    value: null,
    jsonProperty: "description",
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

  STATUS: {
    attribute: "status",
    value: true,
    jsonProperty: "status",
    format: (value: any) => isBoolean(value),
    override: true,
  } as AttributeConfig<boolean>,

  CURRENCY: {
    attribute: "currency",
    value: "GBP",
    jsonProperty: "currency",
    format: (value: any) => String(value),
    override: true,
  } as AttributeConfig<string>,

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
    override: true,
  } as AttributeConfig<number>,

  VAT: {
    attribute: "vat",
    value: 0,
    jsonProperty: "vat",
    format: (value: any) => Number(value),
    override: true,
  } as AttributeConfig<number>,

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

  SERVICE_TYPES: {
    attribute: "service_types",
    value: [] as string[], // ✅ fixed instead of false
    jsonProperty: "serviceTypes",
    format: (value: any) => JSON.parse(value),
    cast: (value: any) => JSON.stringify(value),
    override: true,
  } as AttributeConfig<string[]>,

  TYPE: {
    attribute: "type",
    value: null,
    jsonProperty: "type",
    format: (value: any) => String(value),
} as AttributeConfig<string|null>,

};