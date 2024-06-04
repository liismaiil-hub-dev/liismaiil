export const tabletDefs = `
#scalar type
scalar DateTime
type Tablet {
    id: String!
    title: String!
    description: String
    arabName: String
    soura: String
    souraNumber: Int
    tabletWords: [TabletWord]
    ayahs:[AyahTemplateType]
    createdAt:DateTime
    updatedAt:DateTime
}
type TabletGrid {
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

type TabletTemplate {
    uid:String
    souraNb: Int
    souraName:String!
    arabName: String
    ayahs: [AyahTemplateType]
   
}
type WordsCommentType {
 word: String
 comment: String
  index: Int 
  ayah: Int 
}
input TabletFilter {
    limit: Int
    page: Int
}
input BookingInput {
  limit:Int
  page:Int
}
type TabletWord {
 text: String
  number: Int 
}

type TabletAyahGridType {
 text: String
numberInSurah: Int
number: Int
juz: Int
soura: String
slice:String
}

type StatType {
 guests: Int
  time: Int
  suggestions: [Int]
  coll: [String]
  soura: String
}

input TabletInput {
   id: String!
    title: String!
    description: String
    arabeName: String
    soura: String
    souraNumber: Int
    tabletWords: [TabletWordInput]
    ayahs:[TabletAyahInput]
}

input AyahTemplateInput {
    order:Int
    text: String
    juz: Int
    souraName: String
    }

input TabletTemplateInput {
  uid:String  
  souraNb: Int
  souraName:String!
  arabName: String
  ayahs: [AyahTemplateInput]
}
input WordCommentInput {
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

type WordCommentType {
  word: String
  comment: String
   index: Int 
   ayah: Int 
 }
 

input ValidateTabletInput {
   id: String!
   idProfile: String!
}
input TabletWordInput {
  text: String
  number: Int 
}
input TabletAyahInput {
  text: String
  numberInSurah: Int
  number: Int
  juz: Int
  souraName: String
  slice:String
}
input AyahTabletInput {
  text: String
  order: Int
  juz: Int
  slice:String
}
input SouraNameNb {
    souraName: String
    souraNb: Int
}

input CreateSourasSectionsInput {
  section: String
  names: [SouraNameNb]
} 
type CreateSourasSectionsOutput {
  success: Boolean
}
type AddTabletOutput{
  success:Boolean
  message:String
}
type RemoveOutput {
  success:Boolean
}

type Query {
    tablets: [Tablet!]
    getTabletsBySoura(soura: String): [Tablet!]
    getTabletTemplates: [TabletTemplate!]
    getTemplateBySoura(soura: String):  [TabletTemplate!]
    
    getTabletsByWord(word: String):[Tablet!]
    getStats(id: String): StatType
  }
  type Mutation {
    addTabletTemplate(input:TabletTemplateInput):AddTabletOutput
    removeAllTemplate:RemoveOutput
    removeAllTabletGrids:RemoveOutput
    updateTablet(input:TabletInput): Tablet
    validateTablet(input:ValidateTabletInput):Tablet
   
    removeTemplate(souraNb:Int):RemoveOutput
   
    createSourasSections(input:CreateSourasSectionsInput): CreateSourasSectionsOutput 
}
enum TabletStatus{
    SOBH
    DOHR
    ASR
    MAGH
    ICHA
  }
`;
