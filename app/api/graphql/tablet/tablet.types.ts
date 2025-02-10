import { AyahInterface } from '../coran/coran.types';

export enum ProgressStatus {
  SOBH,
  DOHR,
  ASR,
  MAGH,
  ICHA
}
export enum TabletStatus {
  SOBH,
  DOHR,
  ASR,
  MAGH,
  ICHA
}
// ^release
export type TemplateInput = {
  uid: string;
  souraNb: number;
  souraName: string;
  arabName: string;
  ayahs: AyahTemplateType[];
};

export type TabletTypeData = {
  id: string;
  title: string;
  description: string;
  arabeName: string;
  soura: string;
  souraNumber: number;
  tabletWords?: TabletWord[];
  ayahs: AyahTabletType[];
  createdAt?: string;
  updatedAt?: string;
};

export type GuestTabletInput = {
  title: string;
  souraNb: number;
  arabName: string;
  souraName: string;
  grid: number;
  ayahs: [AyahTabletType][];
  createdAt?: string;
  updatedAt?: string;
};
export type TabletAyahAccordionType = {
  souraNb: number;
  arabName: string;
  souraName: string;
  ayahs: [IAyahForWordsType[]];
};

// release
export type AyahTemplateType = {
  order: number;
  text: string;
  juz: number;
  souraName: string;
  slice?: string;
};
export type AyahTabletType = {
  order: number;
  text: string;
  juz: number;
  slice?: string;
};
export interface IAyahForWordsType extends AyahInterface {
  order: number;
  slice?: string;
  accordionIndex?: number;
}
export type AyahTabletWithAccordionIndexType = {
  order: number;
  text: string;
  juz: number;
  slice?: string;
  accordionIndex: number;
};
export type TabletTemplateInput = {
  uid: string;
  souraNb: number;
  souraName: string;
  arabName: string;
  ayahs: [AyahTemplateType];
};
export type WordsCommentType = {
  word: string;
  comment: string;
  index: number;
  ayah: number;
  lang: string;
};

export type AddTabletOutput = {
  success: boolean;
  message: string;
};
export type WordSelectedType = {
  word: string;
  ayah: number;
  index: number;
  soura?: string;
};
export type CharSelectedType = {
  char: string;
  ayah: number;
  index: number;
  soura?: string;
};
export type TabletSouraType = {
  souraName: string;
  souraArabName: string;
  ayahs: AyahTabletType[];
  _id: number;
};

export type TabletWord = {
  text: string;
  index: number;
  comment?: string;
};

export type ValidateTabletInput = {
  id: string;
  idProfile: string;
};
export type TabletInput = {
  id: string;
  title: string;
  description: string;
  arabeName: string;
  soura: string;
  souraNumber: number;
  tabletWords: [TabletWord];
  ayahs: [AyahTabletType];
};


export type TabletComment = {
  id: string;
  comment: string;
  profileId: string;
};

//release $
