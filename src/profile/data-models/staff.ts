
import { isBoolean } from '../../utils'
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
        cast: (value: any) => {
            if (value === null || value === undefined) {
                throw new Error("Invalid hourly_rate: value is null or undefined");
            }

            const num = Number(value);

            if (Number.isNaN(num)) {
                throw new Error("Invalid hourly_rate: not a number");
            }

            return num;
        },
    } as AttributeConfig<number>,


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