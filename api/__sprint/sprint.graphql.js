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

type SprintComment {
      id: Int
    comment: String
    token: String
  }
type SprintGuest {
    token: String
    flag: String
    name: String
    time: String
  }

type TabletGrid {
    author: String
    title: String
    description: String
    grid: Int
    group: [Int]
    souraNb: Int
    souraName: String
    arabName: String
    tabletWords: [WordsCommentType]
    ayahs:[[AyahTemplateType]]
    createdAt:DateTime
    updatedAt:DateTime
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
 type GuestType  { 
      token: String
      flag: String
      uid: String
      time: String
      stages:[String]
}
  
 
input StageInput {
  id:Int
  title: String!
  section: String
  author: String
  grids:[GridInput]
  }

input SprintInput {
   author:String!
  title: String!
  description:String
  stages:[StageInput]
  startDate:String
  endDate:String
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

type WordsCommentType {
 word: String
 comment: String
  index: Int 
  ayah: Int 
}
type AyahTemplateType {
    order:Int
    text: String
    juz: Int
    souraName: String
}
input AyahTabletInput {
  text: String
  order: Int
  juz: Int
  slice:String
}


input WordCommentInput {
 word: String
 comment: String
  index: Int 
  ayah: Int 
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
type SuccessMessageOutput {
  success: Boolean
  message:String
}

type Query {
    sprints: [SprintType]
    guests: [GuestType]
    sprint(titleSlug:String): SprintType
    sprintByAuthor(author:String): [SprintType]
    
  }

type Mutation {
    addSprint(input:SprintInput):SuccessMessageOutput 
    updateSprint(input:SprintInput): SuccessMessageOutput
    validateSprint(title:String): SuccessMessageOutput
    }`;
