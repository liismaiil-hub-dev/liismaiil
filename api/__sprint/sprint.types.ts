export type SprintStateProps = {
  title: string;
  sprints: SprintType[];
  showMenu: boolean,
  validStages: string[];
  validGrids: string[];
  stageSelected?: StageType,
  stages?: StageType[],
  gridsSelected?: { stageId: number, gridId: string, index: number }[],
  gridSelected?: GridsType,
  minmax: { min: number, max: number },
  grid?: AyahTabletType[],
  ayHided?: [{ order: number, id: number }] | null,
  ayahArraySelected?: AyahTabletType[],
  sprintStages: [string][];
  description: string;
  newBoard: boolean;
  openSprint: boolean;
  author: string;
  selectedTablet: string;
  selectedStageId: number;
  selectedStage: '';
  grids?: GridInput[];
  gridName?: string;
  guests?: SprintGuest[];
  dueDate?: string;
}
export type SprintType = {
  _id?: string;
  title: string;
  description: string;
  author: string;
  stages: StageType[];
  startDate?: string,
  endDate?: string,

}
export type StageType = {
  id: number,
  title: string,
  section: string,
  grids?: GridInput[],
  author: string,
  guests?: string[],
}
export type SprintComment = {
  id: string;
  comment: string;
  token: string;
};


export type SprintInput = {
  author: string;
  title: string;
  description?: string;
  stages: [StageType]
  startDate?: string,
  endDate?: string,
}
export type UpdateStageInput = {
  sprintId: string;
  id: number;
  author: string;
  title?: string;
  grids: [GridInput]
}

export type removeStageInput = {
  sprintId: string;
  id: number;
  author: string;
}
export type PromoteStageInput = {
  id: number;
  author: string;
  title: string;
  description: string;
}
export type SprintOutput = {
  success: boolean
  id: string;
  author: string;
  title: string;
  description: string;
  stages: [StageType]
}

export type SendTelegramStageInput = {
  title: string;
  soura: string;
  tablets: number;
  cards: number
}
export type GridsType = {
  id?: number;
  author: string;
  grid: number;
  group: [number];
  title: string;
  description: string;
  souraNb: number;
  arabName: string;
  souraName: string;
  tabletWords?: [WordsCommentType];
  ayahs: [AyahTabletType][]
  createdAt?: string;
  updatedAt?: string;
};
export type GridInput = {
  id?: number,
  arabName: string;
  author: string;
  ayahs: [AyahTabletType][];
  description: string;
  grid: number;
  group: [number];
  souraName: string;
  souraNb: number;
  title: string;
  tabletWords?: [WordsCommentType];
  createdAt?: string;
  updatedAt?: string;
};
export type SprintGuest = {
  token: string;
  flag: string;
  uid: string;
  time: string;
  stages?: [string];
};
export type HostType = {
  flag: string;
  token: string,
  uid: string,
  cha3bi: number,
  coords: CoordsType,
  addressGeo?: string,
  continent?: string,
  stages?: [string],
  grids?: [string],
}
export type CoordsType = { long: number, lat: number }

export type AddGridsOutput = {
  success: boolean,
  message: string
}
export type Output = {
  success: boolean,
  message: string
}
export type AyahTemplateType = {
  order: number,
  text: string,
  juz: number,
  souraName: string,
  slice?: string
}
export type AyahTabletType = {
  order: number,
  text: string,
  juz: number,
  slice?: string
  _id?: string
}

export type WordsCommentType = {
  word: string;
  comment: string;
  index: number;
  ayah: number;
  lang: string;
};

export enum PRIORITY {
  LOW = 'LOW',
  HEIGH = 'HEIGH',
  MEDIUM = 'MEDIUM'
}
export enum SECTION_MENU {
  //0  <= 7
  TIWAL = 'TIWAL',
  // > 7 <= 18 
  MIIN = 'MIIN',
  //> 18 && soura.souraNb <= 50
  MATHANI = 'MATHANI',
  // >50
  MOFASAL = 'MOFASAL'
}

