export const serviceTypes = {
  TAKE_AWAY: "TAKE_AWAY",
  DELIVERY: "DELIVERY",
  DINE_IN: "DINE_IN",
  WEBSITE_BOOKING: "WEBSITE_BOOKING",
  COLLECTION: "COLLECTION",
  TABLE_BOOKING: "TABLE_BOOKING",
  VALUES: [
    "TAKE_AWAY",
    "DELIVERY",
    "DINE_IN",
    "COLLECTION",
    "TABLE_BOOKING",
    "WEBSITE_BOOKING",
  ] as const,
};

export type ServiceType = (typeof serviceTypes.VALUES)[number];
