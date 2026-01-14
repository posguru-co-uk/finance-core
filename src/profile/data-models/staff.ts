
import { isBoolean } from '../../utils'
import { DEFAULT_PERMISSIONS, Permissions } from './constants'
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
    value: DEFAULT_PERMISSIONS,
    jsonProperty: "permissions",

    format: (value: any): Permissions => JSON.parse(value),

    cast: (value: Permissions) => JSON.stringify(value),

    } as AttributeConfig<Permissions>,


    IS_DELETED: {
        attribute: "is_deleted",
        value: false,
        jsonProperty: "isDeleted",
        format: (value: any) => isBoolean(value),
        override: true,
    } as AttributeConfig<boolean>,
}