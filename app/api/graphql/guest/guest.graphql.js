export const guestDefs = `

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

type Query {
    guest(id:Int): Guest
    guests: [Guest]
    flagToken:FlagTokenType
    signOut(id:Int): SuccessMessageOutput
}
type Mutation {
    addGuest(input:GuestInput):Guest
    updateGuest(input:GuestInput):Guest
    promoteStages:SuccessMessageOutput
  }
  
enum GuestStatus {
  HOST
  GUEST
  LIIS
  ORGA
  ADMIN
 }
`;
