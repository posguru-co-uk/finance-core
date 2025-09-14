import { partnerModes, partnerTypes, profileTypes } from "./constants";
import { DeviceProfileAttributes } from "./device";
import { UserProfileAttributes } from "./user";
import { LocationProfileAttributes } from "./location";
import { PartnerProfileAttributes } from "./partner";
import {serviceTypes} from './serviceTypes'

export interface AttributeConfig<T = any> {
  attribute: string;
  value: T;
  jsonProperty: string;
  format: (value: any) => T;
  cast?: (value: T) => any;
  override?: boolean;
}

export type AttributesMap = Record<string, AttributeConfig<any>>;

/**
 * Deserialize profile attributes into either formatted values or full objects
 * @param attributes - Attributes config
 * @param values - Values to deserialize
 * @param overrideSettings - Whether to use default values if missing
 * @param onlyFormat - Return only formatted values (true) or full attribute objects (false)
 * @returns Object with formatted values or full attribute objects
 */
export const deserializeProfileAttribute = (
  attributes: AttributesMap,
  values: Record<string, { value: any }>,
  overrideSettings = false,
  onlyFormat = true
): Record<string, any> => {
  const result: Record<string, any> = {};

  Object.values(attributes).forEach((item) => {
    let formattedValue: any = null;

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

// Extract JSON keys and DB keys from PartnerProfileAttributes
export const PartnerProfileAttributesJsonKeys: string[] = Object.values(
  PartnerProfileAttributes
).map((item) => item.jsonProperty);

export const PartnerProfileAttributesDbKeys: string[] = Object.values(
  PartnerProfileAttributes
).map((item) => item.attribute);

export {
  partnerModes,
  partnerTypes,
  profileTypes,
  serviceTypes,
  PartnerProfileAttributes,
  UserProfileAttributes,
  LocationProfileAttributes,
  DeviceProfileAttributes,
};
