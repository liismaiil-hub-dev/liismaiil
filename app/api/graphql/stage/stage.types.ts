import { LIISMAIIL_STATUS_ENUM } from './../profile/profile.types';

export type StageStateProps = {
  sprints: SprintPrismaType[],
  spaceGridsSelected: GridJsoned[],
  gridSelected: GridJsoned,
  stageSelected: StagePrismaType,

  evalIndex: number,
  // stage

  stageOrderedAyahsContext: Ayah[],
  stageShuffeledAyahsContext: Ayah[],
  stageShuffeledFirstAyahsContext: Ayah[],
  stageGridSelected: StagePrismaType,
  stageGridsContext: StagePrismaType[],



  // space
  orderedAyahsContext: Ayah[],
  shuffeledAyahsContext: Ayah[],
  shuffeledFirstAyahsContext: Ayah[],
  gridIndexContext: number,
  hideNbContext: boolean,
  faultsNbContext: number,
  correctsNbContext: number,
  spaceSprint: SprintPrismaType,
  spaceStage: StagePrismaType,
  validStages: [string],
  evalContext: EVAL_STATE,
  validContext: boolean,
  menuSouraNb: GridMenu[],
  gridsContext: [[Ayah]],
}
export type GridMenu = {
  souraName: string;
  souraNb: number;
}
export enum EVAL_STATE {
  EVAL = 'EVAL',
  ORDER = 'ORDER',
  CLICK = 'CLICK',
}

export type SprintPrismaType = {
  sprintId: string,
  createdAt: string,
  souraName: string
  arabName?: string
  souraNb: number,
  grid: number,
  startOn: string,
  createdById: string,
  published: boolean,
  guests: [GuestPrismaType],
  stages: [StagePrismaType],

}

export type PromoteRateType = {
  guest: number;
  rate: number;
};
export type GridType = {
  id: number;
  arabName: string;
  title: string;
  souraNb: number;
  souraName: string;
  ayahs: Ayah[];
  grid: number;
  group: number;
};
export type GridBrut = {
  id: number;
  arabName: string;
  author: string;
  createdAt: string;
  description: string;
  title: string;
  souraNb: number;
  souraName: string;
  ayahs: [Ayah[]];
  grid: number;
  group: [number];
};
export type GridJsoned = {
  id: number;
  arabName: string;
  title: string;
  souraNb: number;
  souraName: string;
  ayahs: [string];
  grid: number;
  group: number;
};

export type GridAyahsJson = {
  id: number;
  arabName: string;
  title: string;
  souraNb: number;
  souraName: string;
  ayahs: string;
  grid: number;
  group: number | [number];
};

export type AddGuestPrismaInput = {
  tokenId: number;
  host: number;
  password: string;
  collaboratorId: string;
  country: string;
};
;
export type UpdateGuestInput = AddGuestPrismaInput;
export type GetGridsBySouraNbInput = {
  author: string,
  souraNb: number
}
export type PromoteStageInput = {
  stage: number,
  category: STAGE_CATEGORY_ENUM
};



export type StagePrismaType = {
  id: number;
  stageId: string;
  createdAt: string;
  souraName: string;
  arabName?: string;
  souraNb: number;
  grid: number;
  startOn: string
  createdById: string;
  guests: GuestPrismaType[];
  ayahs: string;
}
export type AyahPrismaType = {
  index: number;
  juz: number;
  order: number;
  text: string;
  stages: StagePrismaType[]
  slice?: string;
};
export type AddGuestPrismaOutput = {
  success: boolean,
  tokenId: number,
  country: string,
  host: number,
  flag: string,
  status: LIISMAIIL_STATUS_ENUM,
}
export type GuestPrismaType = {
  id?: number;
  tokenId: number;
  host: number;
  flag: string;
  password?: string;
  collaboratorId: string;
  status: LIISMAIIL_STATUS_ENUM | string;
  country?: string;
  onLine?: boolean;
  startDate?: string;
  endDate?: string;
  stages?: StagePrismaType[];
  sprints?: SprintPrismaType[];
};
export type RegisterPrismaGridsMenuInput = {
  souraName: string;
  souraNb: number;
}
export type AyahTabletType = {
  order: number;
  text: string;
  juz: number;
  slice?: string;
};
export type Ayah = {
  id?: number;
  juz: number;
  order: number;
  text: string;
}
export enum STAGE_CATEGORY_ENUM {
  SOBH = "SOBH",
  DOHR = 'DOHR',
  ASR = 'ASR',
  MAGHRB = 'MAGHRB',
  ICHA = 'ICHA',
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}


export type GuestStageRel = {
  tokenId: number,
  stageId: string,
  rate?: number,
  review?: string,
}