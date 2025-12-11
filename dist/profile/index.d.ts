type PartnerMap = Record<string, any>;
type ReadProfilesAdapter = (partnerIds: string[]) => Promise<any>;
type ProfileAttributesAdapter = (partnerIds: string[]) => Promise<any>;
export declare function generateProfile(partners: any[], rootPartner: string, readProfilesAdapter: ReadProfilesAdapter, prfoileAttributesAdapter: ProfileAttributesAdapter, withParent?: boolean): Promise<PartnerMap>;
export * from './data-models';
