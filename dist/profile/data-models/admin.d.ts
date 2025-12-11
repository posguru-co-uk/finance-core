import { AttributeConfig } from './type';

export declare const AdminProfileAttributes: {
    PASSWORD: AttributeConfig<string | null>;
    EMAIL: AttributeConfig<string | null>;
    NAME: AttributeConfig<string | null>;
    PHONE: AttributeConfig<string | null>;
    PERMISSIONS: AttributeConfig<string[]>;
    STATUS: AttributeConfig<boolean>;
    CREATED_AT: AttributeConfig<Date | null>;
    IS_DELETED: AttributeConfig<boolean>;
    FP_TOKEN: AttributeConfig<string | null>;
    FP_DURATION: AttributeConfig<Date | null>;
    IS_ADMIN: AttributeConfig<boolean>;
};
