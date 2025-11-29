import {
  deserializeProfileAttribute,
  DeviceProfileAttributes,
  LocationProfileAttributes,
  PartnerProfileAttributes,
  partnerTypes,
  UserProfileAttributes,
} from "./data-models";

// --- Type overrides to skip strict typing ---
type PartnerMap = Record<string, any>;
type ChildMap = Record<string, any>;
type ReadProfilesAdapter = (partnerIds: string[]) => Promise<any>;
type ProfileAttributesAdapter = (partnerIds: string[]) => Promise<any>;

// --- Main function ---
export async function generateProfile(
  partners: any[],
  rootPartner: string,
  readProfilesAdapter: ReadProfilesAdapter,
  prfoileAttributesAdapter: ProfileAttributesAdapter,
  withParent = false
): Promise<PartnerMap> {
  const partnersMap: PartnerMap = {};

  // Convert key value pairs by id
  for (const partner of partners) {
    partnersMap[partner.id] = partner;
  }

  partnersMap[rootPartner] = {
    id: rootPartner,
    type: partnerTypes.PARTNER,
    parent: null,
  };

  await readDetaildData(partnersMap, readProfilesAdapter, prfoileAttributesAdapter);

  const childMap = generateChildMap(partnersMap);

  const root = findRootPartner(partnersMap);
  applyInheritanceFromParent(root, partnersMap, childMap);
  removeDeletedPartners(partnersMap, childMap);
  alignPrivateProfile(partnersMap);
  alignHorizontalOwnedProfiles(partnersMap);
  if (!withParent) {
    delete partnersMap[rootPartner];
  }

  return partnersMap;
}

// --- Helpers ---
const readProfiles = async (
  partnerIds: string[],
  readProfilesAdapter: ReadProfilesAdapter,
  prfoileAttributesAdapter: ProfileAttributesAdapter
): Promise<Set<any>> => {
  const partnerDBProfiles = await readProfilesAdapter(partnerIds);
  const partnerProfiles: Record<string, Record<string, any>> = {};

  for (const partnerProfile of partnerDBProfiles) {
    const partnerId = partnerProfile.partnerId;
    let profiles = partnerProfiles[partnerId];
    if (!profiles) {
      profiles = {};
      partnerProfiles[partnerId] = profiles;
    }
    profiles[partnerProfile.name] = partnerProfile;
  }

  const profiles: Set<any> = new Set();
  for (const partnerId of Object.keys(partnerProfiles)) {
    const profileForPartner = partnerProfiles[partnerId];
    for (const profile of Object.values(profileForPartner)) {
      profiles.add(profile);
    }
  }

  const profileAttributes = await prfoileAttributesAdapter(partnerIds);
  for (const attr of profileAttributes) {
    const profileForPartner = partnerProfiles[attr?.partnerId];
    if (!profileForPartner) continue;

    const profile = profileForPartner[attr?.profileName];
    if (!profile) continue;

    if (!profile.attributes) profile.attributes = {};
    profile.attributes[attr.name] = attr;
  }

  return profiles;
};

const generateChildMap = (partners: PartnerMap): ChildMap => {
  const result: ChildMap = {};
  for (const partner of Object.values(partners)) {
    const parent = partner?.parent ? partners[partner.parent] : null;
    if (parent) {
      if (!result[parent.id]) result[parent.id] = [];
      result[parent.id].push(partner.id);
    }
  }
  return result;
};

const findRootPartner = (partners: PartnerMap): any => {
  let root: any = null;
  for (const partner of Object.values(partners)) {
    if (!partner.parent) {
      if (!root) root = partner;
      else throw new Error("find root faild: more than one root parent found");
    }
  }
  if (!root) throw new Error("No root partner found");
  return root;
};

const readDetaildData = async (
  partners: PartnerMap,
  readProfilesAdapter: ReadProfilesAdapter,
  prfoileAttributesAdapter: ProfileAttributesAdapter
) => {
  const partnerIds = Object.keys(partners);
  const dbProfilesList = await readProfiles(partnerIds, readProfilesAdapter, prfoileAttributesAdapter);

  for (const dbProfiles of dbProfilesList) {
    const partner = partners[dbProfiles.partnerId];
    const profile = convertProfile(dbProfiles, partner);
    partner.privateProfile = profile;
  }

  for (const partnerId of Object.keys(partners)) {
    const partner = partners[partnerId];
    if (!partner?.privateProfile) {
      // TODO: create a private profile if missing
    }
  }
};

const alignPrivateProfile = (partners: PartnerMap) => {
  const deleted: string[] = [];
  for (const partner of Object.values(partners)) {
    const profile = partner?.privateProfile;
    if (profile) {
      const attributes = profile?.attributes || {};
      const privateAttributes: Record<string, any> = {};
      for (const attrKey of Object.keys(attributes)) {
        const attr = attributes[attrKey];
        privateAttributes[attrKey] = attr.value ?? attr.overriden;
      }
      profile.attributes = { ...privateAttributes };
    } else {
      deleted.push(partner.id);
      console.warn("no user assigned this partner", JSON.stringify(partner));
    }
  }

  for (const partnerId of deleted) {
    delete partners[partnerId];
  }
};

const alignHorizontalOwnedProfiles = (_partners: PartnerMap) => {
  // currently unused
};

const removeDeletedPartners = (partners: PartnerMap, childMap: ChildMap) => {
  const deletedIds = new Set<string>();

  for (const partner of Object.values(partners)) {
    if (partner.privateProfile?.attributes?.isDeleted?.value) {
      deletedIds.add(partner.id);

      if (childMap[partner.id]) {
        for (const childId of childMap[partner.id]) {
          deletedIds.add(childId);
        }
      }
    }
  }

  for (const id of deletedIds) {
    delete partners[id];
  }
};

const convertProfile = (profile: any, partner: any): any => {
  const targetProfile: any = {
    name: profile.name,
    partnerId: partner.id,
    type: profile.type,
    attributes: profile.attributes,
  };

  let result: Record<string, any> = {};

  if (partner.type === partnerTypes.PARTNER) {
    result = deserializeProfileAttribute(PartnerProfileAttributes, profile.attributes, false, false);
  } else if (partner.type === partnerTypes.LOCATION) {
    result = deserializeProfileAttribute(LocationProfileAttributes, profile.attributes, false, false);
  } else if (partner.type === partnerTypes.DEVICE) {
    result = deserializeProfileAttribute(DeviceProfileAttributes, profile.attributes, false, false);
  } else if (partner.type === partnerTypes.USER) {
    result = deserializeProfileAttribute(UserProfileAttributes, profile.attributes, false, false);
  }

  for (const attr of Object.values(result)) {
    attr.owner = partner.id;
    attr.profile = targetProfile.name;
  }

  targetProfile.attributes = result;
  return targetProfile;
};

const mergeProfileAttributes = (sourceProfile: any, destinationProfile: any) => {
  if (!sourceProfile || !destinationProfile) return;

  const sourceAttributes = sourceProfile.attributes || {};
  const destinationAttributes = destinationProfile.attributes || {};

  for (const attrName of Object.keys(sourceAttributes)) {
    const parentAttr = sourceAttributes[attrName];
    const childAttr = destinationAttributes[attrName];

    if (!childAttr) {
      // skip
    } else if (childAttr && parentAttr && childAttr.value === null && childAttr.override === true && parentAttr.value) {
      destinationAttributes[attrName] = { ...parentAttr };
    } else {
      destinationAttributes[attrName] = { ...childAttr };
    }
  }

  destinationProfile.attributes = destinationAttributes;
};

const mergeProfiles = (sourceProfile: any, destinationProfile: any) => {
  mergeProfileAttributes(sourceProfile, destinationProfile);
};

const applyInheritanceRoot = (root: any, partners: PartnerMap) => {
  const parentId = root?.parent;
  if (!parentId) return;

  const parent = partners[parentId];
  const parentProfilesMap = parent.privateProfile || null;
  const childProfilesMap = root.privateProfile || null;

  if (childProfilesMap && parentProfilesMap) {
    mergeProfiles(parentProfilesMap, childProfilesMap);
  }

  root.privateProfile = childProfilesMap || undefined;
};

const applyInheritanceFromParent = (rootPartner: any, partners: PartnerMap, childPartners: ChildMap) => {
  applyInheritanceRoot(rootPartner, partners);

  const children = childPartners[rootPartner.id];
  if (children) {
    for (const childId of children) {
      applyInheritanceFromParent(partners[childId], partners, childPartners);
    }
  }
};

export * from "./data-models";
