export const hostDefs = `
#scalar type
scalar DateTime
type Host {
  _id: ID!
  uid: String
  flag: String
  token: String
  cha3bi:Int
  guests:[String]
  coords:CoordsType
  addressGeo:String
  country:String
 
  updatedAt: DateTime
  createdAt: DateTime
}
input AddHostInput {
  uid:String
  country: String
  contact: String
   
}

type HostOutput {
  uid:String
  country: String
  contact: String
} 

type UpdateHostStatusOutput {
  status:String,
  success: Boolean
}   
type GuestsOutput {
  success:Boolean
  guests:String
} 

type Mutation {
      notifySite(email:String):SuccessBoolean
    }

  type Query {
    host(email:String): Host
    hostById(id:String): Host
    hosts: [Host!]
    getGuests(token:String):GuestsOutput
    }
 
`;
