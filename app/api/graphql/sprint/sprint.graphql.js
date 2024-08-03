export const sprintDefs = `
type SprintType {
  _id:String
  title:String
  description:String
  startDate:String
  endDate:String
  author:String
  stages: [StageType]
}
type GridType {
    author: String
    grid: Int
    group: [Int]
    title: String
    description: String
    souraNb: Int
    arabName: String
    souraName: String
    tabletWords: [WordsCommentType]
    ayahs:[[AyahTemplateType]]
    createdAt:DateTime
    updatedAt:DateTime
}

type SprintComment {
      id: Int
    comment: String
    tokenId: Int
  }
type SprintGuest {
    tokenId: Int
    flag: String
    name: String
    time: String
  }
type GuestType {
    tokenId: Int
    host: Int
    flag: String
    price:String
    collaboratorId: String
    enrollmentStatus:String
    startDate:String
    endDate:String
    stages:[String]
  }

type StageType  { 
      id: Int
      title: String
      grids: [TabletGrid]
      author: String
      startDate:String
      endDate:String
      guests:[String]
  }
 
 
input StageInput {
  id:Int
  title: String!
  description:String
  section:String
  author: String
  grids:[GridInput]
  }

input SprintInput {
  author:String!
  description:String
  endDate:String
  stages:[StageInput]
  startDate:String
  title: String!
  }

input UpdateStageInput {
  author:String!
  title: String!
  grids:[GridInput]
  }
input RemoveStageInput {
  sprintId:String
  id:Int
  author:String!
  
  }

input GridsByMenuInput {
  author:String
  menu:String
}

input GetGridsByNbInput {
  author:String
  souraNb:Int
}
input GridInput {
  arabName: String
  author: String!
  ayahs:[[AyahTabletInput]]
  description: String
  grid: Int
  group: [Int]
  souraName: String
  souraNb: Int
  tabletWords: [WordCommentInput]
  title: String!
 }

type SprintOutput{
  success:Boolean
  message:String!
  }
type GridDetails {
  arabName:String
   souraNb:Int
   nbAyahs:Int 
}
type GridsOutput{
  success:Boolean
  grids:[String]!
  }
  type PlusType {
    arabName: String
    nb:Int
  }
type GridsPlusOutput{
  success:Boolean
  grids:[PlusType]!
  } 
type GetGridsByNbOutput{
  success:Boolean
  grids:[GridType]!
  } 
type SuccessMessageOutput {
  success: Boolean
  message:String
}

type Query {
    getGrids(author:String): GridsOutput
    getGridsByNb(input:GetGridsByNbInput): GetGridsByNbOutput
    getGridsPlus(author:String): GridsPlusOutput
    sprints(author:String): [SprintType]
    guests(author:String): [GuestType]
    sprint(titleSlug:String): SprintType
    sprintsByAuthor(author:String): [SprintType]
    sprintsByMenu(menu:String): [SprintType]
    gridsByMenu(input:GridsByMenuInput):[TabletGrid]
    }

type Mutation {
    addGrids(input:GridInput):SuccessMessageOutput 
    addSprint(input:SprintInput):SuccessMessageOutput 
    updateSprint(input:SprintInput): SuccessMessageOutput
    removeSprint(title:String): SuccessMessageOutput
 
}
`;

