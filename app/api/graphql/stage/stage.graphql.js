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
input RemoveStageInput  {
  int: Int
  authorId: Int
}

type SuccessOutput {
  success: Boolean
  message: String
}
type Query {
    stages: [Stage!]
    stagesById(id:Int): [Stage!]
    stagesByToken(token:Int): [Stage!]
    stagesByCategory(category:String): [Stage!]
   }

type Mutation {
    addStage(input: StageInput): Stage!
}
enum StageCategory {
  SOBH
  DOHR
  ASR
  MAGHRB
  ICHA
  LOW
  MEDIUM
  HIGH
 }
`;
