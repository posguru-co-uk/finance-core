import { partnerModes, partnerTypes, profileTypes } from './constants';
import { DeviceProfileAttributes } from './device';
import { UserProfileAttributes } from './user';
import { LocationProfileAttributes } from './location';
import { PartnerProfileAttributes } from './partner';
import { AdminProfileAttributes } from './admin';
import { DriverProfileAttributes } from './driver';
import { StaffProfileAttributes } from './staff';
import { serviceTypes } from './serviceTypes';

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
export declare const deserializeProfileAttribute: (attributes: AttributesMap, values: Record<string, {
    value: any;
}>, overrideSettings?: boolean, onlyFormat?: boolean) => Record<string, any>;
export declare const PartnerProfileAttributesJsonKeys: string[];
export declare const PartnerProfileAttributesDbKeys: string[];
export { partnerModes, partnerTypes, profileTypes, serviceTypes, PartnerProfileAttributes, UserProfileAttributes, LocationProfileAttributes, DeviceProfileAttributes, AdminProfileAttributes, StaffProfileAttributes, DriverProfileAttributes };
