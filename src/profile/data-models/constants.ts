export const partnerTypes = {
  PARTNER: "PARTNER",
  USER: "USER",
  LOCATION: "LOCATION",
  DEVICE: "DEVICE",
  STAFF: "STAFF",
  DRIVER: "DRIVER",
  VALUES: ["PARTNER", "USER", "LOCATION", "DEVICE", "STAFF","DRIVER"] as const,
};

export type PartnerType = (typeof partnerTypes.VALUES)[number];

export const partnerModes = {
  CLOUDE_KITCHEN: "CLOUDE_KITCHEN",
  RESTAURANT: "RESTAURANT",
  VALUES: ["CLOUDE_KITCHEN", "RESTAURANT"] as const,
};

export type PartnerMode = (typeof partnerModes.VALUES)[number];

export const profileTypes = {
  PRIVATE: "PRIVATE",
  STYLE: "STYLE",
  APPLICATION: "APPLICATION",
} as const;

export type ProfileType = keyof typeof profileTypes;

export const staffPermissions = {
  TILL_APP: false,
  CLOSE_TILL: false,
  ADJUST_FLOAT: false,
  REFUND: false,
  NO_SALE_PETTY_CASH: false,
} as const;

export type StaffPermission = keyof typeof staffPermissions;

export type StaffPermissionMap = Record<StaffPermission, boolean>;


export const addonFeatures = {
  1000: false,
} as const;

export type AddonFeatures = keyof typeof addonFeatures;

export type AddonFeaturesMap = Record<AddonFeatures, boolean>;