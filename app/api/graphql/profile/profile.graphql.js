export const profileDefs = `
#scalar type
scalar String
type Profile {
  _id: ID!
  email: String!
  login: String
  verified:Boolean
  phone: String
  address:Address
  status:String
  productsPromoted: [ProductPromoted]
  favoriteConnections: [FavoritesConnectionsType]
  messages:[String]
  carts:[String]
  products:[String]
  selections:[String] 
  guests:[Guest]
  library:[Guest]
  deliverProfiles:[Guest]
  enrollments:[EnrollmentType]
  createdAt: DateTime
}
 
type Guest {
  id: ID!
  tokenId: Int!
  flag: String
  price:Int
  collaboratorId:String
  host:Int
  status:GuestStatus
  enrollmentStatus: String
  startDate:String
  endDate:String
  stages:[StageType]
  sprints:[SprintType]
}
input GuestInput {
  id: ID!
  tokenId: Int!
  flag: String
  price:Int
  collaboratorId:String
  host:Int
  status:String
  enrollmentStatus: String
  startDate:String
  endDate:String
  stages:[StageInput]
  sprints:[SprintInput]
}
  type FlagTokenType {
     flag: String
    token: String
  }

type FavoritesConnectionsType {
    title: String
    token: String
    profileEmail: String
    profileId: String
    flag: String
    startDate:String
    status:String
   }


type EnrollmentType {
  title: String!
  description: String!
  collaboratorEmail: String!
  collaboratorId: String!
  status:String
  token: String
  flag: String
  price: Int
  startDate:String
  endDate:String
  payment: Boolean
}


type ProductPromoted {
  titleSlug:String 
  selectionSlug: String
  rate: Int
}
type AffiliationType {
    token:String
    collaboratorEmail:String
    flag:String
    status:String
}
type ProductOrderType {
  title:String
  price:Int
  quantity: Int
  promo: Int
}
input CopyFromViewerInput {
  id:String
  email:String
  
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
   
input AddressInput {
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
   
type AddProfileOutput {
    _id: ID!
    email: String!
}
type SendMessageOutput {
    success: Boolean
    message:String
    }
  
input AddProfileInput {
    id: String!
    email: String!
    
  }
  input UpdateProfileInput {
    id: String!
    login: String!
    phone:String
    
  }
    input UpdateAddressInput {
    id: String!
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
  
input SendMessageInput {
    profileId: String
    profileEmail: String
    product:String
    collaboratorEmail:String
    collaboratorId:String
    subject: String
    content: String
    parent: String
  }
  type MessageType {
    profileId: String
    profileEmail: String
    product:String
    collaboratorEmail:String
    collaboratorId:String
    subject: String
    content: String
    parent: String
  }
input PromoteInput {
  id: String!
  login: String!
  titleSlug: String!
  selectionSlug: String!
}
input GuestEnrollmentInput {
   title: String!
  collaboratorEmail: String!
  collaboratorId: String!
  status:String
  token: String
  flag: String
  price: Int
  startDate:String
  endDate:String
  id:String
  profileEmail:String
}
input AddStatusInput {
  title:String
  price:Int
  collaboratorEmail: String
  id:String
  status:String
  token:String
  flag:String
  startDate:String
  endDate:String
}
input UpdateProductsCartsInput {
    profileId: String
    productTitles: [String]
    cart: String
   
}
input UpdateEnrollmentsCartsInput {
    enrollment:EnrollmentInput
    profileId: String
    cart: String
  }

input UpdateProfileAddressGeoCoordsInput {
    id:String
    coords:CoordsTypeInput
    addressGeo:String
}

input EnrollmentInput {
        title: String
        description: String
        name: String
        collaboratorEmail: String
        collaboratorId: String
        status: String
        token: String
        flag: String
        price: Int
        priceId: String
        payment:String
        startDate: String
        endDate: String
}
type AddStatusOutput {
    token: String
    flag: String
    success: Boolean
    title:String
}
type FlagTokenOutput {
    success: Boolean
    flag: String
    token: String
  }
  type ProfileStatusOutput {
    success: Boolean
    message: EnrollmentType
  }
  type FlagTokenType {
     flag: String
    token: String
  }
  type AllFlagsOutput {
     success: Boolean
    flags: [String]
  }
type UpdateProductsCarts {
  success:Boolean
  enrollment:Boolean
 productTitles:[String]
  cart:String
}
type SetEmailVerifiedOutput {
   success:Boolean
  email:String
}
type EmailVerifiedOutput {
   success:Boolean
  verified:Boolean
}
type SignOutOutput {
  success:Boolean
}
type UpdateProductsCartsOutput {
  success: Boolean
  message:String
}
type FrontConnexionLiisilOutput{
  success:Boolean
  liisil:[Guest]
}

type FrontConnexionLibraryOutput{
  success:Boolean
  library:[Guest]
}
type FrontConnexionDiscountOutput{
  success:Boolean
  discount:[Guest]
}
type FrontConnexionDeliveryOutput{
  success:Boolean
  delivery:[Guest]
}
type FrontConnexionAdminCollaboratorOutput{
  success:Boolean
  adminCollaborator:[Guest]
}
type FrontConnexionAdminOrganisatorOutput{
  success:Boolean
  adminOrganisator:[Guest]
}
type EnrollmentOutput {
  success:Boolean
  title: String!
  description:String!
  collaboratorEmail: String!
  collaboratorId: String!
  status:String
  token: String
  flag: String
  price: Int
  startDate:String
  endDate:String
  id:String
  profileEmail:String
}
type GetEventsOutput{
  success:Boolean
  events:[EventType]
}
type UpdateProfileAddressGeoCoordsOutput{
  success:Boolean
  message:String
}
input AddFavoriteConnectionsInput {
    id: String
    title: String
    token: String
    profileEmail: String
    profileId: String
    flag: String
    price:Int
    startDate:String
    status:String
}

type Query {
    profile(id:String): Profile
    profiles: [Profile!]
    guests:[Guest!]
    getEmailVerified(id:String):EmailVerifiedOutput 
    flagToken: FlagTokenOutput
    profileStatus(id:String): ProfileStatusOutput
    signOut(id:String):SignOutOutput
    profileEnrollments(id:String):[EnrollmentType!]

    organisatorLiisilById(id:String):FrontConnexionLiisilOutput
    organisatorLibraryById(id:String):FrontConnexionLibraryOutput
    collaboratorDiscountById(id:String):FrontConnexionDiscountOutput
    collaboratorDeliveryById(id:String):FrontConnexionDeliveryOutput
    adminCollaboratorById(id:String):FrontConnexionAdminCollaboratorOutput
    adminOrganisatorById(id:String):FrontConnexionAdminOrganisatorOutput

}
type Mutation {
    addProfile(input:AddProfileInput):AddProfileOutput
    updateProfile(input:UpdateProfileInput):[Profile]
    updateProductsCarts(input:UpdateProductsCartsInput): UpdateProductsCartsOutput
    updateEnrollmentsCarts(input:UpdateEnrollmentsCartsInput): UpdateProductsCartsOutput
    
    updateAddress(input:UpdateAddressInput):Profile
    updateProfileAddressGeoCoords(input:UpdateProfileAddressGeoCoordsInput):UpdateProfileAddressGeoCoordsOutput
    
    sendMessage(input:SendMessageInput):SendMessageOutput
    removeMessage(id:String):SendMessageOutput
    removeProfile:Boolean
    promote(input: PromoteInput):Profile

    setEmailVerified(id:String):SetEmailVerifiedOutput 
    
    guestEnrollment(input:GuestEnrollmentInput): EnrollmentOutput
    
    addStatus(input:AddStatusInput): AddStatusOutput
    addFavoriteConnections(input:AddFavoriteConnectionsInput): SendMessageOutput
    copyFromViewer(input:CopyFromViewerInput):SignOutOutput
  }
  
enum GuestStatus {
  HOST
  GUEST
  LIIS
  ORGA
  ADMIN
 }
enum ProfileStatus {
  USER
  GUEST
  LIIS
  ORGA
  DELIVER
  ADMIN
  COLL
  DISCOUNT
LIBRARY
 }
`;
