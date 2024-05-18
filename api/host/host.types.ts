


type ImageType = {
  public_id: string,
  url: string
}

export type HostTypeData = {
  _id: string;
  uid: string;
  flag: string;
  token: string;
  cha3bi?: number;
  guests?: string[];
  coords?: CoordsType;
  addressGeo?: string;
  contact?: string;
  country?: string;
  updatedAt?: string;
  createdAt?: string;
};
export type CoordsType = {
  long: number,
  lat: number
}

export enum EVENT_STATUS_ENUM {
  ADMIN = "ADMIN",
  COLL = 'COLL',
  ORGA = 'ORGA',
  LIIS = 'LIIS',
  DELIVER = 'DELIVER',
  GUEST = 'GUEST',
  LIBRARY = 'LIBRARY',
}
export enum PROFILE_STATUS_ENUM {
  ADMIN = "ADMIN",
  COLL = 'COLL',
  ORGA = 'ORGA',
  LIIS = 'LIIS',
  LIISIL = 'LIISIL',
  DELIVER = 'DELIVER',
  GUEST = 'GUEST',
  USER = 'USER',
  DISCOUNT = 'DISCOUNT',
  LIBRARY = 'LIBRARY',
  LIISMAIIL_GUEST = 'LIISMAIIL_GUEST'
}

export enum PROFILE_ENROLLMENT_NAMES_ENUM {
  ADMIN = "ADMIN",
  LIIS = "liismanager",
  COLL = "collaborator",
  ORGA = "organisator",
  GUEST = "guest",
  LIBRARY = "library",
  LIISIL = "liismaiil",
  DISCOUNT = "discount",
  DELIVER = "deliver",
  USER = "user",
  LIISMAIIL_GUEST = 'liismaiil_guest'
}

export enum PROFILE_ENROLLMENT_COLOR_ENUM {
  GUEST = "primary",
  COLL = "warning",
  ORGA = "success",
  LIIS = "secondary",
  DELIVER = "info",
  USER = "info",
  LIISIL = "secondary",
  ADMIN = "error",
  DISCOUNT = "error",
  LIBRARY = "info",
  LIISMAIIL_GUEST = "info",
}
export enum CARDS_LEVEL_ENUM {
  SOBH = 'SOBH',
  DOHR = 'DOHR',
  ASR = 'ASR',
  MAGH = 'MAGH',
  ICHA = 'ICHA'
}

export enum CARDS_LEVEL_COLOR_ENUM {
  SOBH = "primary",
  DOHR = "warning",
  ASR = "success",
  MAGH = "secondary",
  ICHA = "info"
}
export enum APP_ENV {
  WEB = "WEB",
  BOX = 'BOX',
}