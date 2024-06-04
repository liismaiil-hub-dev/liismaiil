
import { WordsCommentType } from '@/api/graphql/tablet/tablet.types';

export type CoordsType = {
  long: number,
  lat: number
}

export type SprintStateProps = {
  spaceStage: StageType;
  spaceSprint: string;
  grid: AyahTabletType[];
  gridSelected: GridInput;
  gridsSelected: { stageId: number; gridId: string; index: number; }[];
  stageSelected: StageType;
  sprints: SprintType[];
  sprintsTitles: string[];
  title: string;
  stages: StageType[];
  stage: string;
  showMenu: boolean,

  sprintStages: [string][];
  description: string;
  newBoard: boolean;
  openSprint: boolean;
  author: string;

  selectedStageId: number;

  grids?: GridInput[];
  gridName?: string;
  guests?: GuestType[];
  dueDate?: string;
};
export type SprintType = {
  _id?: string;
  title: string;
  description: string;
  author: string;
  stages: StageType[];
  startDate?: string;
  endDate?: string;
};
export type StageType = {
  id: number;
  title: string;
  section?: string;
  grids?: GridInput[];
  author: string;
  guests?: string[];
};
export type SprintComment = {
  id: string;
  comment: string;
  token: string;
};
//^ space
export type GetGridsByNbInput = {
  author: string;
  souraNb: number;

};
export type GridTypeData = {
  id?: string;
  author: string;
  grid: number;
  group: [number];
  title: string;
  description: string;
  souraNb: number;
  arabName: string;
  souraName: string;
  tabletWords?: [WordsCommentType];
  ayahs: [AyahTabletType][];
  createdAt?: string;
  updatedAt?: string;
};


//space $ 
export type SprintInput = {
  title: string;
  description?: string;
  author: string;
  startDate?: string;
  endDate?: string;
  stages: [StageType];
};
export type UpdateStageInput = {
  sprintId: string;
  id: number;
  author: string;
  title?: string;
  grids: [GridInput];
};

export type removeStageInput = {
  sprintId: string;
  id: number;
  author: string;
};
export type PromoteStageInput = {
  id: number;
  author: string;
  title: string;
  description: string;
};
export type SprintOutput = {
  success: boolean;
  id: string;
  author: string;
  title: string;
  description: string;
  stages: [StageType];
};
export type AyahTabletType = {
  order: number;
  text: string;
  juz: number;
  slice?: string;
};
export type SendTelegramStageInput = {
  title: string;
  soura: string;
  tablets: number;
  cards: number;
};
export type GridType = {
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
  ayahs: [AyahTabletType][];
  createdAt?: string;
  updatedAt?: string;
};
export type GridInput = {
  id?: number;
  author: string;
  title: string;
  description: string;
  souraNb: number;
  arabName: string;
  souraName: string;
  tabletWords?: [WordsCommentType];
  grid: number;
  group: [number];
  ayahs: [AyahTabletType][];
  createdAt?: string;
  updatedAt?: string;
};
export type GuestType = {
  tokenId: string;
  flag: string;
  price?: number;
  collaboratorId: string;
  enrollmentStatus?: string;
  startDate: string;
  endDate: string;
  stages?: [string];
};

export type GridDetails = {
  arabName: string;
  souraNb: number;
  nbAyahs: number
}
export type GridsOutput = {
  success: boolean;
  grids: [GridDetails]
}
export type AddGridsOutput = {
  success: boolean;
  message: string;
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
