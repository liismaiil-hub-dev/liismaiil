export const stageDefs = `
type Stage {
  id: Int
  title: String
  published: Boolean
  authorId: Int
  grids: [GridType]
  categories: [String]
  sprints: [String]
  createdAt: String
  }

 input GridInput {
  title: String!
  arabName: String
  author: String!
  ayahs:[String]
  description: String
  grid: Int
  group: Int
  souraName: String
  souraNb: Int
 }
  type GridType {
  title: String!
  arabName: String
  author: String!
  ayahs:[String]
  description: String
  grid: Int
  group: Int
  souraName: String
  souraNb: Int
 } 
   
type SprintPrismaType  {
  sprintId: String
  createdAt: String
  souraName: String
  souraNb: Int
  grid: Int
  startOn: String
  createdById: String
  published: Boolean
  guests: [GuestPrismaType]
  stages: [StagePrismaType]

}
type  StagePrismaType  {
  id: Int
  stageId: Int
  createdAt: String
  souraName: String
  souraNb: Int
  grid: Int
  startOn: String
  createdById: String
  guests: [GuestPrismaType]
  ayahs: String
}
type  GuestPrismaType {
  id: Int
  tokenId: Int
  host: Int
  flag: String
  password: String
  collaboratorId: String
  status: String
  country: String
  onLine: Boolean
  startDate: String
  endDate: String
  stage: [StagePrismaType]
  sprints: [SprintPrismaType]
}

type Ayah {
  id: Int
  juz: Int
  order: Int
  text: String
}
input UpdateStageInput {
   id: Int
  title: String
  published: Boolean
  authorId: Int
  grids: [GridInput]
  categories: [String]
  sprints: [String]
  createdAt: String
}
input PromoteStageInput {
   id: Int
  title: String
  published: Boolean
  authorId: Int
  
}
input StageInput {
  id: Int
  title: String
  published: Boolean
  authorId: Int
  grids: [GridInput]
  categories: [String]
  sprints: [String]
  createdAt: String
  }
input StagePrismaInput {
   id: Int
  stageId: Int
  createdAt: String
  souraName: String
  souraNb: Int
  grid: Int
  startOn: String
  createdById: String
  
  ayahs: String
  }

input AddGuestPrismaInput {
  tokenId: Int!
  password: String
  host:Int
  country: String
  collaboratorId:String
}
type  AddGuestPrismaOutput {
  tokenId: Int!
  flag: String
  host:Int
  country: String
  status: String
  success:Boolean
 }

input RemoveStageInput  {
  int: Int
  authorId: Int
}
  
type RegisterPrismaGridsMenuOutput{
    souraName:String
    souraNb:Int
}
type GetGridsByNbOutput{
    success:Boolean
    grids:[GridType]
}


input Input  {
  int: Int
  authorId: Int
}
type SuccessOutput {
  success: Boolean
  message: String
}
type Query {
    stages: [Stage!]
    getGridsByNb(souraNb:Int): GetGridsByNbOutput

    hostsForDashboard: [GuestPrismaType!]
    stagesById(id:Int): [Stage!]
    stagesByToken(token:Int): [Stage!]
    stagesByCategory(category:String): [Stage!]
   }

type Mutation {
    addStage(input: StageInput): Stage!
    addStagePrisma(input: StagePrismaInput): StagePrismaType!
    addGuestPrisma(input: AddGuestPrismaInput) : AddGuestPrismaOutput
    }
enum StageCategory {
  SOBH
  DOHR
  ADIUM
  HIGH
 }
`;
