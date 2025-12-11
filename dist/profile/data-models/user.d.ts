import { AttributeConfig } from './type';

export declare const UserProfileAttributes: {
    PASSWORD: AttributeConfig<string | null>;
    EMAIL: AttributeConfig<string | null>;
    NAME: AttributeConfig<string | null>;
    PHONE: AttributeConfig<string | null>;
    PERMISSIONS: AttributeConfig<string[]>;
    STATUS: AttributeConfig<boolean>;
    IS_DELETED: AttributeConfig<boolean>;
    FP_TOKEN: AttributeConfig<string | null>;
    FP_DURATION: AttributeConfig<Date | null>;
    IS_OWNER: AttributeConfig<boolean>;
};
