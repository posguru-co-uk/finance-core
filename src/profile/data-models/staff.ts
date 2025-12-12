
import { isBoolean } from '../../utils'
import { AttributeConfig } from './type'

export const StaffProfileAttributes = {
    NAME: {
        attribute: "name",
        value: null,
        jsonProperty: "name",
        format: (value: any) => String(value)
    } as AttributeConfig<string | null>,

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

    PASSCODE: {
        attribute: "passcode",
        value: null,
        jsonProperty: "passcode",
        format: (value: any) => String(value),
    } as AttributeConfig<string | null>,

    PERMISSIONS: {
        attribute: "permissions",
        value: [] as string[],
        jsonProperty: "permissions",
        format: (value: any) => JSON.parse(value),
        cast: (value: any) => JSON.stringify(value),
    } as AttributeConfig<string[]>,

    IS_DELETED: {
        attribute: "is_deleted",
        value: false,
        jsonProperty: "isDeleted",
        format: (value: any) => isBoolean(value),
        override: true,
    } as AttributeConfig<boolean>,
}