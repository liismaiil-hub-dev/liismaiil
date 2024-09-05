export const stageDefs = `
type Stage {
  id: Int
  title: String
  published: Boolean
  authorId: Int
  grids: [StageGrid]
  categories: [String]
  sprints: [String]
  createdAt: String
  }
type StageGrid {
  id: Int
  arabName: String
  title: String
  souraNb: Int
  souraName: String
  ayahs: [Ayah]
  grid: Int
  group: Int
}
input StageGridInput {
  id: Int
  arabName: String
  title: String
  souraNb: Int
  souraName: String
  ayahs: [AyahTabletInput]
  grid: Int
  group: Int
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
  grids: [StageGridInput]
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
  grids: [StageGridInput]
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
