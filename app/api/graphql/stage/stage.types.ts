import { LIISMAIIL_STATUS_ENUM } from "@/api/graphql/profile/profile.types";

export type SprintStateProps = {
  sprints: SprintPrismaType[],
  spaceGridsSelected: GridJsoned[],
  gridSelected: GridJsoned,
  stageSelected: StageTypeData,
  evalIndex: number,
  orderedAyahsContext: Ayah[],
  shuffeledAyahsContext: Ayah[],
  shuffeledFirstAyahsContext: Ayah[],
  gridIndexContext: number,
  hideNbContext: boolean,
  faultsNbContext: number,
  correctsNbContext: number,
  spaceSprint: SprintPrismaType,
  spaceStage: StageTypeData,
  validStages: [string],
  evalContext: EVAL_STATE,
  validContext: boolean,
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
  ayahs: string;
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

export type StageTypeData = {
  id: number;
  title: string;
  published: boolean;
  authorId: number;
  grids: [String];
  categories: [String];
  sprints: [String];
  createdAt?: string;
}


export type StagePrismaType = {
  id: number;
  stageId: number;
  createdAt: string;
  souraName: string;
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
}
export type GuestPrismaType = {
  id?: number;
  tokenId: number;
  host: number;
  flag: string;
  password?: string;
  collaboratorId: string;
  status: LIISMAIIL_STATUS_ENUM;
  country: string;
  onLine?: boolean;
  startDate: string;
  endDate?: string;
  stage?: StagePrismaType[];
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
  id: number;
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


