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

export const StaffPermissions = [1001, 1002, 1003, 1004] as const;

export type StaffPermission = (typeof StaffPermissions)[number];

export type StaffPermissionList = StaffPermission[];

export const AddonFeatures = [1000] as const;

export type AddonFeature = (typeof AddonFeatures)[number];

export type AddonFeatureList = AddonFeature[];