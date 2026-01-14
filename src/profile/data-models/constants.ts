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


export const PERMISSIONS = {
  TILL_APP: "Till App",
  CLOSE_TILL: "Close Till",
  ADJUST_FLOAT: "Adjust Float",
  REFUND: "Refund",
  NO_SALE_PETTY_CASH: "No Sale/Petty Cash",
} as const;

export type PermissionKey = keyof typeof PERMISSIONS;

export type Permissions = Record<PermissionKey,boolean>

export const DEFAULT_PERMISSIONS: Permissions = {
  TILL_APP: false,
  CLOSE_TILL: false,
  ADJUST_FLOAT: false,
  REFUND: false,
  NO_SALE_PETTY_CASH: false,
};



