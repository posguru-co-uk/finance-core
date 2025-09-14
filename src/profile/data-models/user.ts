import { isBoolean } from "../../utils";
import {AttributeConfig} from './type'
export const UserProfileAttributes = {
  PASSWORD: {
    attribute: "password",
    value: null,
    jsonProperty: "password",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,

  EMAIL: {
    attribute: "email",
    value: null,
    jsonProperty: "email",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,

  NAME: {
    attribute: "name",
    value: null,
    jsonProperty: "name",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,

  PHONE: {
    attribute: "phone",
    value: null,
    jsonProperty: "phone",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,

  PERMISSIONS: {
    attribute: "permissions",
    value: [] as string[],
    jsonProperty: "permissions",
    format: (value: any) => (Array.isArray(value) ? value : []),
  } as AttributeConfig<string[]>,

  STATUS: {
    attribute: "status",
    value: true,
    jsonProperty: "status",
    format: (value: any) => isBoolean(value),
    override: true,
  } as AttributeConfig<boolean>,

  IS_DELETED: {
    attribute: "is_deleted",
    value: false,
    jsonProperty: "isDeleted",
    format: (value: any) => isBoolean(value),
    override: true,
  } as AttributeConfig<boolean>,

  FP_TOKEN: {
    attribute: "fp_token",
    value: null,
    jsonProperty: "fpToken",
    format: (value: any) => String(value),
  } as AttributeConfig<string | null>,

  FP_DURATION: {
    attribute: "fp_duration",
    value: null,
    jsonProperty: "fpDuration",
    format: (value: any) => (value ? new Date(value) : null),
  } as AttributeConfig<Date | null>,

  IS_OWNER: {
    attribute: "is_owner",
    value: false,
    jsonProperty: "isOwner",
    format: (value: any) => isBoolean(value),
  } as AttributeConfig<boolean>,
};
