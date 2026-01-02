
import { isBoolean } from '../../utils'
import { AttributeConfig } from './type'

export const DriverProfileAttributes = {
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

    PHONE: {
        attribute: "phone",
        value: null,
        jsonProperty: "phone",
        format: (value: any) => String(value),
    } as AttributeConfig<string | null>,

    ADDRESS_LINE_1: {
        attribute: "address_line_1",
        value: null,
        jsonProperty: "addressLine1",
        format: (value: any) => String(value),
    } as AttributeConfig<string | null>,

    ADDRESS_LINE_2: {
        attribute: "address_line_2",
        value: null,
        jsonProperty: "addressLine2",
        format: (value: any) => String(value),
    } as AttributeConfig<string | null>,

    CITY: {
        attribute: "city",
        value: null,
        jsonProperty: "city",
        format: (value: any) => String(value),
    } as AttributeConfig<string | null>,

    POSTCODE: {
        attribute: "postcode",
        value: null,
        jsonProperty: "postcode",
        format: (value: any) => String(value),
    } as AttributeConfig<string | null>,

    IS_DELETED: {
        attribute: "is_deleted",
        value: false,
        jsonProperty: "isDeleted",
        format: (value: any) => isBoolean(value),
        override: true,
    } as AttributeConfig<boolean>,

    NOTES: {
        attribute: "notes",
        value: null,
        jsonProperty: "notes",
        format: (value: any) => String(value),
    } as AttributeConfig<string | null>,

}