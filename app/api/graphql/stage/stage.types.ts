import { PROFILE_STATUS_ENUM } from "@/api/graphql/profile/profile.types";

export type SprintStateProps = {
  sprints: SprintType[],
  spaceGridsSelected: GridJsoned[],
  gridSelected: GridJsoned,
  stageSelected: StageTypeData,
  evalIndex: number,
  orderedAyahsContext: Ayah[],
  shuffeledAyahsContext: Ayah[],
  gridIndexContext: number,
  hideNbContext: boolean,
  faultsNbContext: number,
  correctsNbContext: number,
  spaceSprint: SprintType,
  spaceStage: StageTypeData,
  validStages: [string],
  evalContext: EVAL_STATE
}

export enum EVAL_STATE {
  EVAL = 'EVAL',
  ORDER = 'ORDER',
  CLICK = 'CLICK',
}

export type SprintType = {
  _id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  author: string;
  stages: [StageTypeData]
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
export type GuestType = {
  tokenId: number; //112
  flag: string;
  price?: number;
  collaboratorId: string;
  host: number;
  password: string;
  status: PROFILE_STATUS_ENUM;
  enrollmentStatus?: string;
  startDate?: string;
  endDate?: string;
  stages?: [string];
  sprints?: [string];
};
export type AddGuestInput = GuestType;
export type UpdateGuestInput = GuestType;
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