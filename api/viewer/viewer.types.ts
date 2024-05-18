


type ImageType = {
  public_id:string,
  url:string
}

export type ViewerTypeData = {
  _id: string;
  login: string;
  uid: string;
  bio?: string;
  email: string;
  password?: string;
  stripe_account_id?: string;
  hasWallet?: boolean;
  phone?: string;
  avatar?: ImageType|string;
  flagToken?: {
    flag:string,
    token:string
  };

  organisation?: string;
  status: PROFILE_STATUS_ENUM;

  website?: string;
  instagram?: string;
  telegram?: string;
  events?: [EventTypeData];
  cha3bi?: number;
 
  bookings?: BookingType[];

  guestProfiles?: ConnexionType[];
 
  liismaiilProfiles?: ConnexionType[];
 
  libraryProfiles?: ConnexionType[];
 
  organisatorProfiles?: ConnexionType[];
 
  coords?: CoordsType;
  addressGeo?: string;
  contact?: string;
  city?: string;
  country?: string;
  state?: string;
  continent?: string;
  rewards?: string[];
  
  updatedAt?: string;
  createdAt?: string;
};
export type CoordsType ={
  long: number, 
  lat: number 
}
export type ConnexionType = {
  token: string,
  title: string,
  profileEmail: string,
  profileId: string,
  price: number,
  flag: string,
  startDate: string,
  endDate: string,
  status: string
}
export type EventTypeData = {
  id: string;
  title: string;
  content: string;
  addressGeo?: string;
  startDate: string;
  endDate: string;
  status: PROFILE_STATUS_ENUM;
  contact: string;

}
export type BookingType = {
  bookingStartDate: string;
  bookingEndDate: string;
}
export type SigninViewerInput = {
  email: string
  password: string
}

export enum EVENT_STATUS_ENUM {
  ADMIN= "ADMIN",
  COLL= 'COLL',
  ORGA= 'ORGA',
  LIIS= 'LIIS',
    DELIVER= 'DELIVER',
  GUEST= 'GUEST',
  LIBRARY= 'LIBRARY',
  }
export enum PROFILE_STATUS_ENUM{
ADMIN =  "ADMIN",
COLL= 'COLL',
ORGA= 'ORGA',
LIIS= 'LIIS',
LIISIL= 'LIISIL',
DELIVER= 'DELIVER',
GUEST= 'GUEST',
USER= 'USER',
DISCOUNT= 'DISCOUNT',
LIBRARY= 'LIBRARY',
LIISMAIIL_GUEST= 'LIISMAIIL_GUEST'
} 
export enum PROFILE_ENROLLMENT_NAMES_ENUM {
  ADMIN= "ADMIN",
  LIIS = "liismanager",
  COLL = "collaborator",
  ORGA = "organisator",
  GUEST = "guest",
  LIBRARY= "library",
  LIISIL = "liismaiil",
  DISCOUNT= "discount",
  DELIVER = "deliver",
  USER = "user",
  LIISMAIIL_GUEST='liismaiil_guest'
}

export enum PROFILE_ENROLLMENT_COLOR_ENUM {
  GUEST= "primary",
  COLL= "warning",
  ORGA= "success",
  LIIS= "secondary",
  DELIVER= "info",
  USER= "info",
  LIISIL= "secondary",
  ADMIN= "error",
  DISCOUNT= "error",
  LIBRARY= "info",
  LIISMAIIL_GUEST= "info",
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
  ASR =  "success",
  MAGH = "secondary",
  ICHA =  "info"
}
