import { GRIDS_NAME } from '@/store/constants/constants';
import { LIISMAIIL_STATUS_ENUM } from './../profile/profile.types';
export type ImageType = {
  public_id: string;
  url: string;
};

export enum PRODUCT_STATUS_ENUM {
  ORGA = 'ORGA',
  FAMI = 'FAMI',
  LIBRARY = 'LIBRARY',
  VRAC = 'VRAC',
  DISC = 'DISC'
}

export enum PRODUCT_STATUS_NAME_ENUM {

  ORGA = 'Organisator',
  FAMI = 'Familly',
  LIBRARY = 'Library',
  VRAC = 'Vrac',
  DISC = 'Discount'
}

export type GiftType = {
    title: string;
    titleSlug: string;
    description: string;
    price: number;
    author: string;
    image: ImageType;
    productStatus: PRODUCT_STATUS_ENUM;
    selection: string;
    stock: number;
    rate: number;
    quantity?: number;
  } 
export type StageStateProps = {
  spaceGridsSelected: GridJsoned[],
  gridSelected: GridJsoned,
  stageSelected: StagePrismaType,
  isDraggedContext: boolean,
  isDroppedContext: boolean,
  evalIndex: number,
  stagedContext: boolean,
  firstGridContext: boolean,
  categoryContext:GRIDS_NAME,
  stageOrderedAyahsContext: Ayah[],
  stageShuffeledAyahsContext: Ayah[],
  stageShuffeledFirstAyahsContext: Ayah[],
  stageGridSelected: StagePrismaType,
  catStages: StagePrismaType[],
  localStages: StagePrismaType[],
  gridsStaged: string[],
  stageGridsContext: StagePrismaType[],
  stageHideNbContext: boolean,
  stageEvalContext: EVAL_STATE,
  sprintRandomHidden: number[],
  stageValidContext: boolean,
  showStepsContext: boolean,
  stepIndexContext: number,
  stageEvalIndexContext: number,
  //host
  selectedGifts:GiftType[], 
  
  // sprint
  sprintsContext: SprintPrismaType[],
  sprintSelected: SprintPrismaType,
  // space
  reorderedAyahsContext:number[],
  stageReorderedAyahsContext:number[],
  orderedAyahsContext: Ayah[],
  shuffeledAyahsContext: Ayah[],
  shuffeledFirstAyahsContext: Ayah[],
  gridIndexContext: number,
  hideNbContext: boolean,
  blurContext: boolean,
  faultsNbContext: number,
  correctsNbContext: number,
  spaceSprint: SprintPrismaType,
  spaceStage: StagePrismaType,
  validStages: [string],
  evalContext: EVAL_STATE,
  validContext: boolean,
  menuSouraNb: GridMenu[],
  gridsContext: [[Ayah]],
  // drag & drop
  draggedIndex: number,
  errorNbContext: number,
  firstStateContext: boolean,
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
  createdAt?: string,
  startOn?: string,
  finishOn?: string,
  createdById?: string,
  published?: boolean,
  guests?: GuestSprintType[],
  stageId: string,

}

export type SprintPrismaSessionInputType = {
  sprintId: string,
  guests: number[],
  stageId: string,
}
export type GuestSprintType = {  
  tokenId: number,
sprintId:string,
rate?:number,
review?:string,
addedAt? :string,
}

export type SprintSpaceType = {
  sprintId: string,
  guests: GuestPrismaType[],
  stage: StagePrismaType,
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
  guestPassword?: string;
  collaboratorId: string;
  country: string;
};
export type SignInPrismaInput = {
  tokenId: number;
  host: number;
  password: string;
  country: string;
};

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
  group?: number;
  startOn?: string
  createdById?: string;
  guests?: GuestPrismaType[];
  ayahs: string;
  sprints?: SprintPrismaType[]
}
export type AyahPrismaType = {
  index: number;
  juz: number;
  order: number;
  text: string;
  stages: StagePrismaType[]
  slice?: string;
};
export type SuccessMessageOutput = {
  success: boolean,
  message :string,
}
export type GuestTokenStorage = {
  tokenId: number,
  host: number,
  collaboratorId?: string,
  country?: string,
  status: string,
  onLine: boolean,
  flag: string
}
export type GuestPrismaType = {
  id?: number;
  tokenId: number;
  host: number;
  flag: string;
  password?: string;
  collaboratorId?: string;
  status: LIISMAIIL_STATUS_ENUM | string;
  country?: string;
  onLine?: boolean;
  startDate?: string;
  endDate?: string;
  stages?: StagePrismaType[] | [string];
  sprints?: SprintPrismaType[] | [string];
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
  numberInSurah: number;
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
  TIWAL = 'TIWAL',
  MIIN = 'MIIN',
  MATHANI = 'MATHANI',
  MOFASAL = 'MOFASAL',

}


export type GuestStageRel = {
  tokenId: number,
  stageId: string,
  rate?: number,
  review?: string,
}