import { AttributeConfig } from './type';

export declare const DeviceProfileAttributes: {
    NAME: AttributeConfig<string | null>;
    LANGUAGES: AttributeConfig<string[]>;
    STATUS: AttributeConfig<boolean>;
    CURRENCY: AttributeConfig<string>;
    MINIMUM_CASH_ORDER: AttributeConfig<number>;
    CARRY_BAG_FEE: AttributeConfig<number>;
    VAT: AttributeConfig<number>;
    TIME_ZONE: AttributeConfig<string | null>;
    IS_DELETED: AttributeConfig<boolean>;
    SERVICE_TYPES: AttributeConfig<string[]>;
};
