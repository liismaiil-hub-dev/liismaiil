export const sprintDefs = `
type SprintType {
    id:Int
  title:String
  description:String
  startDate:String
  endDate:String
  author:String
  stages: [StageType]

}

type SprintComment {
      id: Int
    comment: String
    tokenId: Int
  }
type SprintGuest {
    tokenId: Int
    flag: String
    time: String
  }
type StageType  { 
      id: Int
      title: String
      grids: [GridType]
      author: String
      startDate:String
      endDate:String
      guests:[String]
  }
 
 

input SprintInput {
  author:String!
  description:String
  endDate:String
  stages:[StageInput]
  startDate:String
  title: String!
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
  grids:[GridType!]
}
type StageGridJsoned{
  souraName: String
  arabName: String
  title: String
  souraNb: Int
  author: String
  ayahs: String
  grid: Int
  group: Int
} 
 
type SuccessMessageOutput {
  success: Boolean
  message:String
}

type Query {
    getGrids(author:String): GridsOutput
    sprints(author:String): [SprintType]
    guests(author:String): [Guest]
    sprint(titleSlug:String): SprintType
    sprintsByAuthor(author:String): [SprintType]
    sprintsByMenu(menu:String): [SprintType]
    gridsByMenu(input:GridsByMenuInput):[GridType]
    }

type Mutation {
    addGrids(input:GridInput):SuccessMessageOutput 
    addSprint(input:SprintInput):SuccessMessageOutput 
    updateSprint(input:SprintInput): SuccessMessageOutput
    removeSprint(title:String): SuccessMessageOutput
 
}
`;

