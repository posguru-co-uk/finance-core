import { AttributeConfig } from './type';

export declare const StaffProfileAttributes: {
    NAME: AttributeConfig<string | null>;
    EMAIL: AttributeConfig<string | null>;
    PASSCODE: AttributeConfig<string | null>;
    HOURLY_RATE: AttributeConfig<number>;
    PERMISSIONS: AttributeConfig<number[]>;
    IS_DELETED: AttributeConfig<boolean>;
    LOCATIONS: AttributeConfig<String[]>;
    DEVICES: AttributeConfig<String[]>;
    DEPARTMENTS: AttributeConfig<string[]>;
};
