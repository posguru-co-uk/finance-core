export declare const partnerTypes: {
    PARTNER: string;
    USER: string;
    LOCATION: string;
    DEVICE: string;
    STAFF: string;
    DRIVER: string;
    VALUES: readonly ["PARTNER", "USER", "LOCATION", "DEVICE", "STAFF", "DRIVER"];
};
export type PartnerType = (typeof partnerTypes.VALUES)[number];
export declare const partnerModes: {
    CLOUDE_KITCHEN: string;
    RESTAURANT: string;
    VALUES: readonly ["CLOUDE_KITCHEN", "RESTAURANT"];
};
export type PartnerMode = (typeof partnerModes.VALUES)[number];
export declare const profileTypes: {
    readonly PRIVATE: "PRIVATE";
    readonly STYLE: "STYLE";
    readonly APPLICATION: "APPLICATION";
};
export type ProfileType = keyof typeof profileTypes;
export declare const staffPermissions: {
    readonly TILL_APP: false;
    readonly CLOSE_TILL: false;
    readonly ADJUST_FLOAT: false;
    readonly REFUND: false;
    readonly NO_SALE_PETTY_CASH: false;
};
export type StaffPermission = keyof typeof staffPermissions;
export type StaffPermissionMap = Record<StaffPermission, boolean>;
