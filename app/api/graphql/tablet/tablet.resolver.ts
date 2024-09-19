import { AddTabletOutput, TabletInput, TabletTypeData, TemplateInput, ValidateTabletInput } from './tablet.types';

import { Firestore } from 'firebase-admin/firestore';
export const tablets = async (
  _: undefined,
  __: undefined,
  { TabletModel }: { TabletModel: any }
): Promise<TabletTypeData[] | undefined> => {
  try {
    let results;
    results = await TabletModel.find({}).lean().exec();

    return results;
  } catch (error: unknown) {
    console.log({ error });
  }
};

export const getTabletsBySoura = async (
  _: undefined,
  soura: string,
  { TabletModel }: { TabletModel: any }
): Promise<TabletTypeData | undefined> => {
  try {
    const tablet = await TabletModel.findOne({ soura: soura }).lean().exec();
    return tablet;
  } catch (error) {
    throw error;
  }
};
export const getTabletTemplates = async (
  _: undefined,
  __: undefined,
  { TemplateModel }: { TemplateModel: any }
): Promise<TemplateInput[] | undefined> => {
  try {
    const tabletTemplates = await TemplateModel.find().sort({ souraNb: 1 }).lean().exec();
    //console.log({tabletTemplates})
    return tabletTemplates;
  } catch (error) {
    throw error;
  }
};
export const getTemplateBySoura = async (
  _: undefined,
  { soura }: { soura: string },
  { TemplateModel }: { TemplateModel: any }
): Promise<TemplateInput[] | undefined> => {
  console.log({ soura });
  try {
    const template = await TemplateModel.find({ souraName: `${soura}` })
      .lean()
      .exec();
    console.log({ template });
    return [...template];
  } catch (error) {
    throw error;
  }
};
export const getGridsBySoura = async (
  _: undefined,
  { soura }: { soura: string },
  { TabletGridModel }: { TabletGridModel: any }
): Promise<GridsInput[] | undefined> => {
  console.log({ soura });
  try {
    const grids = await TabletGridModel.find({ souraName: `${soura}` })
      .lean()
      .exec();
    console.log({ grids });
    return [...grids];
  } catch (error) {
    throw error;
  }
};

export const getTabletsByWord = async (
  _: undefined,
  word: string,
  { TabletModel }: { TabletModel: any }
): Promise<TabletTypeData | undefined> => {
  try {
    const tablet = await TabletModel.findOne({ tabletWords: word }).lean().exec();
    return tablet;
  } catch (error) {
    throw error;
  }
};
export const getStats = async (
  _: undefined,
  id: string,
  { TabletModel }: { TabletModel: any }
): Promise<
  | {
    guests: number;
    time: number;
    suggestions: [string];
    coll: [string];
    soura: string;
  }
  | undefined
> => {
  try {
    const tablet = await TabletModel.findOne({ id }).lean().exec();
    if (tablet) {
      return {
        guests: 0,
        time: 0,
        suggestions: [''],
        coll: [''],
        soura: ''
      };
    } else {
      throw 'the tablet don t exits';
    }
  } catch (error) {
    throw error;
  }
};
// MUTATIONS

/* export const addTablet = async (
  _: undefined,
  { input }: { input: AddTabletInput },
  { TabletGridModel }: { TabletGridModel: any }
): Promise<TabletGridsTypeData | undefined> => {
  const { title, description, arabName, souraName, souraNb, wordsComment, ayahsGrids, grid, createdAt } = input;
  console.log({ input })
  try {
    const oldGrid = await TabletGridModel.find({ title }).lean().exec()

    if (oldGrid.length === 1 && oldGrid[0]['title'] === title) {
      return oldGrid as TabletGridsTypeData
    } else {
      const tabletGrids = new TabletGridModel({ title, description, arabName, souraName, souraNb, wordsComment, ayahsGrids, grid, createdAt });
      const tabletGridsSaved = await tabletGrids.save();

      return tabletGridsSaved;
    }
  } catch (error: unknown) {
    throw error
  }
}; */
const registerOnFireStore = async (
  _: undefined,
  { input }: { input: TemplateInput },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<{ success: boolean; message: string } | undefined> => {
  const { souraNb, souraName, arabName, ayahs, uid } = input;
  console.log({ souraNb, souraName, arabName, ayahs });
  try {
    const dbProfiles = dbFirestore.collection('profiles');
    const profileRef = await dbProfiles.doc(`${uid}`);
    const profileSnapshot = await profileRef.get();

    if (profileSnapshot?.exists) {
      await profileRef.collection('templates').doc(`${souraNb}-${souraName}`).set({
        souraNb,
        souraName,
        arabName,
        ayahs
      });
      return {
        success: true,
        message: 'OK'
      };
    } else {
      return {
        success: true,
        message: 'NO profile found'
      };
    }
  } catch (error: unknown) {
    throw error;
  }
};
export const addTabletTemplate = async (
  _: undefined,
  { input }: { input: TemplateInput },
  { TemplateModel, dbFirestore }: { TemplateModel: any; dbFirestore: Firestore }
): Promise<AddTabletOutput | undefined> => {
  const { souraNb, souraName, arabName, ayahs, uid } = input;
  // console.log({ souraNb, souraName,  arabName, ayahs })
  try {
    const templateExists = await TemplateModel.find({ souraNb }).exec();
    if (templateExists) {
      console.log({ templateExists });
      await TemplateModel.findOneAndRemove({ souraNb }).exec();
    }

    try {
      const tablet = new TemplateModel({
        uid,
        souraNb,
        souraName,
        arabName,
        ayahs
      });
      await tablet.save();
      return await registerOnFireStore(_, { input }, { dbFirestore });
    } catch (error: unknown) {
      throw error;
    }
  } catch (error: unknown) {
    throw error;
  }
};

export const updateTablet = async (
  _: undefined,
  input: TabletInput,
  { TabletModel }: { TabletModel: any }
): Promise<TabletTypeData | undefined> => {
  try {
    const { id, title, description, arabeName, soura, souraNumber, tabletWords, ayahs } = input;
    const tablet = await TabletModel.findOneAndUpdate(
      { id: id },
      { title, description, arabeName, soura, souraNumber, tabletWords, ayahs },
      { new: true }
    );
    return tablet;
  } catch (error: unknown) {
    throw error;
  }
};
//dbFirestore }: { dbFirestore: unknown
export const validateTablet = async (
  _: undefined,
  input: ValidateTabletInput,
  { TabletModel, dbFirestore, FieldValue }: { dbFirestore: Firestore; TabletModel: any; FieldValue: any }
): Promise<TabletTypeData | undefined> => {
  try {
    const { id, idProfile } = input;
    const tablet = await TabletModel.findOne({ id: id }).lean().exec();
    if (tablet) {
      const dbProfiles = dbFirestore.collection('profiles');

      const profileRef = await dbProfiles.doc(`${idProfile}`);
      profileRef.update({
        tabletsValidated: FieldValue!.arrayUnion(`{id}`)
      });
      return tablet;
    } else throw 'the tablet don t exists';
  } catch (error: unknown) {
    // console.error(error);
    throw error;
  }
};

const removeTemplate = async (_: undefined, { souraNb }: { souraNb: number },
  { TemplateModel }: { TemplateModel: any }):
  Promise<{ success: boolean } | undefined> => {
  try {
    await TemplateModel.findOneAndRemove({ souraNb });

    return { success: true };
  } catch (error: unknown) {
    throw error;
  }
};

const removeAllTemplate = async (_: undefined, __: undefined, { TemplateModel }: { TemplateModel: any }): Promise<{ success: boolean }> => {
  try {
    console.log('removeAllTemplate');
    await TemplateModel.deleteMany({});

    return { success: true };
  } catch (error: unknown) {
    throw error;
  }
};

type SectionSourasType = {
  section: string;
  names: [
    {
      souraName: string;
      souraNb: number;
    }
  ];
};
const removeAllTabletGrids = async (
  _: undefined,
  __: undefined,
  { TabletGridModel }: { TabletGridModel: any }
): Promise<{ success: boolean }> => {
  try {
    await TabletGridModel.deleteMany({});

    return { success: true };
  } catch (error: unknown) {
    throw error;
  }
};

const createSourasSections = async (
  _: undefined,
  {
    input
  }: {
    input: SectionSourasType;
  },
  { createSourasSectionsFile }: { createSourasSectionsFile: () => {} }
): Promise<{ success: boolean } | undefined> => {
  try {
    await createSourasSectionsFile(input);

    return { success: true };
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error(`${error}`);
  }
};

const tabletResolver = {
  Query: {
    tablets,
    getTabletsBySoura,
    getTemplateBySoura,
    getTabletTemplates,

    getTabletsByWord,
    getStats
  },
  Mutation: {
    addTabletTemplate,
    updateTablet,
    validateTablet,
    removeTemplate,
    removeAllTemplate,
    removeAllTabletGrids,
    createSourasSections
  }
};
export default tabletResolver