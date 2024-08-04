import { PROFILE_STATUS_ENUM } from "../viewer/viewer.types";

export type SprintType = {
  _id: number;
  title: String;
  description: String;
  startDate: String;
  endDate: String;
  author: String;
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

export type GuestType = {
  tokenId: number; //112
  flag: string;
  price?: number;
  collaboratorId: string;
  host: number;
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
  author:string, 
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
export type Ayah = {
  id: number;
  juz: number;
  order: number;
  text: number;
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