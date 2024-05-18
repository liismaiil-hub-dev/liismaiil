export const viewerDefs = `
#scalar type
scalar DateTime
type Viewer {
  _id: ID!
  bio: String,
  login: String
  uid: String
  loginSlug: String
  email: String
  password: String
  phone:String
  avatar:AvatarType
  flagAvatar: String
  organisation: String
  status: String
  website: String
  instagram: String
  telegram: String
  events:[EventType]
  cha3bi:Int
  discountProducts:[DiscountProductType]
  bookings:[BookingType]
  guestProfiles:[ConnexionProfileType]
  libraryProfiles:[ConnexionProfileType]
  guests:[String]
  coords:CoordsType
  contact:String
  addressGeo:String
  city:String
  country:String
  state:String
  rewards: [String]
  token: String
  updatedAt: DateTime
  createdAt: DateTime
}
 type RegistredListing {
  email: String
  date: String
 }

type EventType {
    id:String
    title: String
    content: String
    startDate: String
    endDate: String
    status: String
    contact: String
}

type DiscountProductType {
    title:String
    stock:Int
    price:Int
  }
type AvatarType {
  public_id: String!
  url: String!
}

type StudType {
  flag: String
  pass:String
  }

type ConnexionProfileType {
    title: String
    description: String
    token: String
    status:String
    profileEmail: String
    profileId: String
    flag: String
    price:Int
    startDate:String
    endDate:String
   }

type CoordsType {
  lat:Float
  long:Float
}
input CoordsTypeInput {
  lat:Float
  long:Float
}
type OrderType {
      cart: String
      total:Int
}

type BookingType  {
  bookingStartDate: String
  bookingEndDate: String
}

type Address {
    name: String
    destination: String
    building: String
    street: String
    city: String
    state: String
    country: String
    contact:String
    zip: String
    isdefault:Boolean
}

input AddViewerInput {
  login:String
  email:String
  phone:String  
  status:String
  uid:String
  city: String
  state: String
  country: String
  contact: String
   
}

type ViewerOutput {
  _id:String
  login:String
  email:String
  phone:String
  status:String
  uid:String
  city: String
  state: String
  country: String
  contact: String
} 

type UpdateViewerStatusOutput {
  status:String,
  success: Boolean
}   
input UpdateViewerInput {
  email:String  
  login:String
  bio:String
  instagram:String
  website:String
  phone:String
  role:[String]
  organisation: String
  avatar:AvatarTypeInput
}

input UpdateViewerStatusInput {
  email:String  
  status:String
}

input AvatarTypeInput {
  public_id: String!
  url: String!
}

input UpdateViewerAddressInput {
    email:String
    coords:CoordsTypeInput
    addressGeo:String
}

input ConnectPayoutInput {
    email: String
    id: String
}
type ConnectPayoutOutput {
    link: String
}
input SendMessageViewerInput {
    date:String  
    sender: String
    token: String
    product:String
    rec:String
    content: String
}

type SuccessBoolean {
  success: Boolean
}
type SuccessBoolean {
  success: Boolean
}
type qrCodeOutput {
  qrCodeUrl: String
} 

input SetFlagAvatarInput {
  id: String
  name: String
}
input PassFlagInput {
  id: String
  email: String
}

input EnrollmentInput {
  title: String
  description:String
  profileId: String
  profileEmail: String
  token: String
  flag: String
  status:String
  price:Int
  collaboratorEmail: String
  collaboratorId: String
  startDate:String
  endDate:String
}

type AccountStatusOutput {
  success:Boolean
  status: String
}

type GetConnexionProfileOutput {
  success: Boolean
  message:[ConnexionProfileType]
}

type ValidateProfileStatusOutput {
  success: Boolean
  message:String
}

input UpdateEnrollmentInput {
  id: String
  title: String
  description:String
  price:Int
  image:AvatarTypeInput
  enrollmentStatus: [String]
  max: Int
  startDate:String
  endDate:String
}

input RemoveEnrollmentInput {
  collaboratorEmail: String
  profileId: String
  token: String
  status:String
}

input EventTypeInput {
    id: String
    title: String
    content: String
    startDate: String
    endDate: String
    status: String
    contact: String
}
input RegisterEventInput {
   collaboratorEmail: String
   collaboratorId: String
  event: EventTypeInput
  }

input RemoveEventInput {
  collaboratorEmail: String
  collaboratorId: String
  id:String
  status:String
 }
  
input GetDiscountInput {
  affiliator: String
  discountToken: String
}
input CardBackInput {
  id:String
  card:Int
}
input AccountStatusInput {
  accountId:String
  email:String
}
input AffiliateRequestInput {
  email:String
  id:String
}

input SyncInput {
  email:String
  id:String
}
type OkSuccess {
  success: Boolean
  message:String
}
type EnrollmentOutput {
  success: Boolean
  message:String
}
type EventOutput {
  success: Boolean
  message:String
}

type Mutation {
      notifySite(email:String):SuccessBoolean
    }

  type Query {
    viewer(email:String): Viewer
    viewerById(id:String): Viewer
    viewers: [Viewer!]
    getEvents(id:String):EventOutput 
    enrollmentsByEmail(email:String): [EnrollmentOutput]
    getGuestProfiles(email:String): GetConnexionProfileOutput
    getLibraryProfiles(email:String): GetConnexionProfileOutput
    }
 
`;
