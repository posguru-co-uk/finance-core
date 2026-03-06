export declare const serviceTypes: {
    TAKE_AWAY: string;
    DELIVERY: string;
    DINE_IN: string;
    WEBSITE_BOOKING: string;
    COLLECTION: string;
    TABLE_BOOKING: string;
    ROOM_BOOKING: string;
    VALUES: readonly ["TAKE_AWAY", "DELIVERY", "DINE_IN", "COLLECTION", "TABLE_BOOKING", "WEBSITE_BOOKING", "ROOM_BOOKING"];
};
export type ServiceType = (typeof serviceTypes.VALUES)[number];
