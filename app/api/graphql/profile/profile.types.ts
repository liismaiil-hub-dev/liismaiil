
export type ProfileTypeData = {
  _id: string;
  email: string;
  login: string;
  token?: number;
  tokenId: number;
  vierified?: boolean;
  phone?: string;
  isAdmin?: boolean;
  address?: Address;
  country?: Address;
  coords?: CoordsType;
  addressGeo?: string;
  status: PROFILE_STATUS_ENUM;
  productsPromoted: [
    {
      productSlug: string;
      selectionSlug: string;
      rate: number;
    }
  ];
  avatar: ImageType;
  guests: GuestType[];
  messages?: MessageTypeData[];
  conversationFeed: FeedTypeData[];
  carts: [string];
  products: [string];
  enrollments?: EnrollmentType[];
  updatedAt?: string;
  createdAt?: string;
};
type ImageType = {
  public_id: string,
  url: string
}
export type CoordsType = {
  long: number,
  lat: number
}

export type GuestType = {
  tokenId: number; //112
  flag: string;
  price?: number;
  collaboratorId: string;
  host: number;
  status: PROFILE_STATUS_ENUM;
  enrollmentStatus?: string;
  startDate?: string;
  endDate?: string;
  stages?: [string];
  sprints?: [string];
};
export type UpdateProfileAddressGeoCoordsInput = {
  id: string;
  coords: { long: number; lat: number };
  addressGeo: string;
};
export type GuestEnrollmentOutput = {
  title: string;
  description: string;
  collaboratorEmail: string;
  collaboratorId: string;
  status: string;
  token: string;
  flag: string;
  price: number;
  startDate: string;
  endDate: string;
  id: string;
  profileEmail: string;
  success: boolean;
};
export type ProfileProductsType = {
  date: string;
  title: string;
  price: number;
  quantity: number;
  promo: number;
  author: string;
  productStatus: string;
};
export interface FavoriteConnectionsType {
  token: string;
  title: string;
  profileEmail: string;
  profileId: string;
  price: number;
  flag: string;
  startDate: string;
  status: PROFILE_STATUS_ENUM;
}
export interface AddFavoriteConnectionsInput extends FavoriteConnectionsType {
  id: string;
}

export type MessageTypeData = {
  date: string;
  profileId: string;
  product: string;
  subject: string;
  content: string;
  collaboratorEmail: string;
};
export type FeedTypeData = {
  sender: string;
  feed: string;
  messages: [MessageTypeData];
};
export type Address = {
  name: string;
  destination: string;
  building: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  contact: string | number;
  isdefault: boolean;
};

export type AddProfileOutput = {
  _id: string;
  email: string;
};
export type AddProfileInput = {
  id: string;
  email: string;
};

export type UpdateProductsCartsInput = {
  enrollment: string | EnrollmentType;
  profileId: string;
  products: [string];
  cart: string;
};
export type UpdateEnrollmentsCartsInput = {
  enrollment: EnrollmentType;
  profileId: string;
  cart: string;
};

export type EnrollmentType = {
  price: number | undefined;
  title: string;
  name: string;
  description?: string;
  uid?: string;
  collaboratorEmail: string;
  collaboratorId: string;
  price: number;
  priceId: string;
  status: PROFILE_STATUS_ENUM;
  token: string;
  flag: string;
  startDate: string;
  endDate: string;
  payment: PaymentType;
};

export type EnrollmentInput = {
  title: string;
  description?: string;
  profileId: string;
  profileEmail: string;
  collaboratorEmail: string;
  collaboratorId: string;
  price: number;
  status: PROFILE_STATUS_ENUM;
  token: string;
  flag: string;
  payment: PaymentType;
  startDate: string;
  endDate: string;
};
export type PromoteInputType = {
  id: string;
  login: string;
  titleSlug: string;
  selectionSlug: string;
};

export type UpdateProfileInput = {
  id: string;
  login: string;
  phone: string;
};
export type UpdateAddressInput = {
  id: string;
  name: string;
  destination: string;
  building: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  contact: string | number;
  isdefault: boolean;
};

export type AddStatusInput = {
  title: string;
  price: number;
  collaboratorEmail: string;
  id: string;
  status: PROFILE_STATUS_ENUM;
  token: string;
  flag: string;
  startDate: string;
  endDate: string;
};

export type UpdateProductsCarts = {
  success: boolean;
  enrollment: string;
  productTitles: string;
  cart: string;
};

export type AddStatusOutput = {
  success: boolean;
  token: string;
  flag: string;
  title: string;
};
export type FlagTokenOutput = {
  success: boolean;
  token: string;
  flag: string;
};

export type FlagTokenType = {
  token: string;
  flag: string;
};

export type SendMessageInput = {
  parent?: string;
  profileId: string;
  profileEmail: string;
  product: string;
  collaboratorEmail: string;
  collaboratorId?: string;
  subject: string;
  content: string;
};
export type AddConversationFeedInput = {
  email: string;
  sender: string; // profile.email
  product: string; // titleSlug / subject
  rec: string; // product author === email
  content: string; // message
  date: string;
};
export type DeleteConversationFeedInput = {
  sender: string; // profile.email
  product: string; // titleSlug / subject
  rec: string; // product author === email
};
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
export enum COUNTRY_ENUM {
  FR = "FR",
  DZ = 'DZ',
  SE = 'SE',
  MR = 'MR',
  BF = 'BF',
  PK = 'PK',
  TZ = 'TZ',
  SP = 'SP'
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
