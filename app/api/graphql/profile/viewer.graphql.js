export const viewerDefs = `
#scalar type
scalar DateTime
type Viewer {
  _id: ID!
  login: String
  loginSlug: String
  uid: String
  bio: String,
  email: String
  password: String
  hasWallet:Boolean
  phone:String
  avatar:AvatarType
  flagToken:FlagTokenType 
  organisation: String
  status: String
  website: String
  instagram: String
  telegram: String

  cha3bi:Int
  bookings:[BookingType]
 
  coords:CoordsType
  addressGeo:String
  contact:String
  city:String
  country:String
  state:String
  continent:String
 
  rewards: [String]
  updatedAt: DateTime
  createdAt: DateTime
}
type AvatarType {
  public_id: String!
  url: String!
}


type FlagTokenType {
  flag: String!
  token: String!
}

type CoordsType {
  lat:Float
  long:Float
}

input CoordsTypeInput {
  lat:Float
  long:Float
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


type qrCodeOutput {
  qrCodeUrl: String
} 



type GetGuestsOutput {
  success: Boolean
  message:[Guest]
}


type OkSuccess {
  success: Boolean
  message:String
}


  type Query {
    viewer(email:String): Viewer
    viewerById(id:String): Viewer
    getGuests(email:String): [Guest]
    frontCollaborators:[Viewer]
    }
 
`;
