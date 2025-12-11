export const partnerTypes = {
  PARTNER: "PARTNER",
  USER: "USER",
  LOCATION: "LOCATION",
  DEVICE: "DEVICE",
  STAFF: "STAFF",
  VALUES: ["PARTNER", "USER", "LOCATION", "DEVICE", "STAFF"] as const,
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
