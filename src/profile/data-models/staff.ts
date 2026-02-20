
import { isBoolean } from '../../utils'
import { StaffPermissionList } from './constants'
import { AttributeConfig } from './type'

export const StaffProfileAttributes = {
    NAME: {
        attribute: "name",
        value: null,
        jsonProperty: "name",
        format: (value: any) => String(value)
    } as AttributeConfig<string | null>,

    EMAIL: {
        attribute: "email",
        value: null,
        jsonProperty: "email",
        format: (value: any) => String(value),
    } as AttributeConfig<string | null>,

    PASSCODE: {
        attribute: "passcode",
        value: null,
        jsonProperty: "passcode",
        format: (value: any) => String(value),
    } as AttributeConfig<string | null>,

    HOURLY_RATE: {
        attribute: "hourly_rate",
        value: 0,
        jsonProperty: "hourlyRate",
        format: (value: any) => Number(value),
        cast: (value: any) => Number(value),
    } as AttributeConfig<number>,

    PERMISSIONS: {
    attribute: "permissions",
    value: [] as StaffPermissionList,
    jsonProperty: "permissions",
    format: (value: string): StaffPermissionList => JSON.parse(value),
    cast: (value: StaffPermissionList) => JSON.stringify(value),

    } as AttributeConfig<StaffPermissionList>,

    IS_DELETED: {
        attribute: "is_deleted",
        value: false,
        jsonProperty: "isDeleted",
        format: (value: any) => isBoolean(value),
        override: true,
    } as AttributeConfig<boolean>,

    LOCATIONS:{
        attribute:"locations",
        value:[] as String[],
        jsonProperty: "locations",
        format: (value: any) => JSON.parse(value),
        cast: (value: any) => JSON.stringify(value),
        override: false,
    } as AttributeConfig<String[]>,

    DEVICES:{
        attribute:"devices",
        value:[] as String[],
        jsonProperty: "devices",
        format: (value: any) => JSON.parse(value),
        cast: (value: any) => JSON.stringify(value),
        override: false,
    } as AttributeConfig<String[]>,
   
}