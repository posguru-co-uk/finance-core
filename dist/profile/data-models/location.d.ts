import { AttributeConfig } from './type';

export declare const LocationProfileAttributes: {
    NAME: AttributeConfig<string | null>;
    EMAIL: AttributeConfig<string | null>;
    LANGUAGES: AttributeConfig<string[]>;
    PHONE: AttributeConfig<string | null>;
    COUNTRY: AttributeConfig<string | null>;
    ADDRESS: AttributeConfig<string | null>;
    DESCRIPTION: AttributeConfig<string | null>;
    POSTCODE: AttributeConfig<string | null>;
    STATUS: AttributeConfig<boolean>;
    CURRENCY: AttributeConfig<string>;
    MINIMUM_CASH_ORDER: AttributeConfig<number>;
    CARRY_BAG_FEE: AttributeConfig<number>;
    VAT: AttributeConfig<number>;
    TIME_ZONE: AttributeConfig<string | null>;
    IS_DELETED: AttributeConfig<boolean>;
    SERVICE_TYPES: AttributeConfig<string[]>;
    START_TOKEN_NUMBER: AttributeConfig<boolean>;
    LATITUDE: AttributeConfig<string | null>;
    LONGITUDE: AttributeConfig<string | null>;
};
