import {
  AddGridsOutput,
  GetGridsByNbInput,
  GridInput,
  GridType,
  GridTypeData,
  SECTION_MENU,
  SprintInput,
  SprintType
} from './sprint.types';
const getGrids = async (
  _: undefined,
  { author }: { author: string },
  { GridModel, _lodash }: { GridModel: any, _lodash: { uniq: (arg: [string]) => [string] } }
): Promise<{ success: boolean, grids: Array<string> } | undefined> => {


  try {
    const grids = await GridModel.find({ author }).sort({ souraNb: 1 }).lean().exec();
    if (typeof grids !== 'undefined' && grids.length > 0) {
      const souraName = await grids.map((gr: GridType) => gr.arabName)

      return { success: true, grids: _lodash.uniq(souraName) }
    } else {
      return { success: false, grids: [] };
    }
  } catch (error: unknown) {
    throw error;
  }
};
const getGridsByNb = async (
  _: undefined,
  { input }: { input: GetGridsByNbInput },
  { GridModel, _lodash }: { GridModel: any, _lodash: { filter: (arg: [GridTypeData]) => [GridTypeData] } }
): Promise<{ success: boolean, grids: Array<GridTypeData> } | undefined> => {

  const { author, souraNb } = input

  try {
    const grids = await GridModel.find({ author }).sort({ souraNb: 1 }).lean().exec();
    console.log({ author, souraNb, grids });

    if (typeof grids !== 'undefined' && grids.length > 0) {
      const _grids = await _lodash.filter(grids, (grid: GridTypeData) => grid.souraNb === souraNb)
      console.log(_grids)

      return { success: true, grids: _grids }
    } else {
      return { success: false, grids: [] };
    }
  } catch (error: unknown) {
    throw error;
  }
};
const getGridsPlus = async (
  _: undefined,
  { author }: { author: string },
  { GridModel, _lodash }: { GridModel: any, _lodash: { uniqBy: (arg: any) => [any] } }
): Promise<{
  success: boolean, grids: Array<{
    arabName: string,
    nb: number
  }>
} | undefined> => {


  try {
    const grids = await GridModel.find({ author: "3jtczfl93BWlud2t3Q44KdC0EVJ3" }).sort({ souraNb: 1 }).lean().exec();
    if (typeof grids !== 'undefined' && grids.length > 0) {
      const gridsId = await grids.map((gr: GridType) => {
        return { arabName: gr.arabName, nb: gr.souraNb }
      })
      const uniqGridsId = _lodash.uniqBy(gridsId, 'nb')

      return { success: true, grids: uniqGridsId }
    } else {
      return { success: false, grids: [] };
    }
  } catch (error: unknown) {
    throw error;
  }
};
const sprints = async (
  _: undefined,
  { input }: { input: { menu: string; author: string } },
  { GridModel }: { GridModel: any }
): Promise<Array<GridType> | undefined> => {
  const { menu, author } = input;
  console.log({ input });
  try {
    const sprints = await GridModel.find({ author }).sort({ souraNb: 1 }).lean().exec();
    if (typeof sprints !== 'undefined' && sprints.length > 0) {
      if (menu == SECTION_MENU.TIWAL) {
        const newTiwal = await sprints.filter((gr: GridType) => {
          return gr.souraNb > 0 && gr.souraNb <= 7;
        });
        return newTiwal;
      } else if (menu == SECTION_MENU.MIIN) {
        // sprints = await GridModel.find({ author}).where('souraNb').gt(7).lte(18).sort({souraNb:1}).lean().exec();
        const newMiin = await sprints.filter((gr: GridType) => {
          return gr.souraNb > 7 && gr.souraNb <= 18;
        });

        return newMiin;
      } else if (menu == SECTION_MENU.MATHANI) {
        // sprints = await GridModel.find({ author}).where('souraNb').gt(18).lte(50).sort({souraNb:1}).lean().exec();
        const newMathani = await sprints.filter((gr: GridType) => {
          return gr.souraNb > 18 && gr.souraNb <= 50;
        });

        return newMathani;
      } else if (menu == SECTION_MENU.MOFASAL) {
        //sprints = await GridModel.find({ author}).where('souraNb').gt('50').sort({souraNb:1}).lean().exec();
        const newGrids = await sprints.filter((gr: GridType) => {
          return gr.souraNb > 50;
        });

        return newGrids;
      } else {
        return;
      }
    } else {
      return;
    }
  } catch (error: unknown) {
    throw error;
  }
};
const guests = async (
  _: undefined,
  { input }: { input: { menu: string; author: string } },
  { GridModel }: { GridModel: any }
): Promise<Array<GridType> | undefined> => {
  const { menu, author } = input;
  console.log({ input });
  try {
    const sprints = await GridModel.find({ author }).sort({ souraNb: 1 }).lean().exec();
    if (typeof sprints !== 'undefined' && sprints.length > 0) {
      if (menu == SECTION_MENU.TIWAL) {
        const newTiwal = await sprints.filter((gr: GridType) => {
          return gr.souraNb > 0 && gr.souraNb <= 7;
        });
        return newTiwal;
      } else if (menu == SECTION_MENU.MIIN) {
        // sprints = await GridModel.find({ author}).where('souraNb').gt(7).lte(18).sort({souraNb:1}).lean().exec();
        const newMiin = await sprints.filter((gr: GridType) => {
          return gr.souraNb > 7 && gr.souraNb <= 18;
        });

        return newMiin;
      } else if (menu == SECTION_MENU.MATHANI) {
        // sprints = await GridModel.find({ author}).where('souraNb').gt(18).lte(50).sort({souraNb:1}).lean().exec();
        const newMathani = await sprints.filter((gr: GridType) => {
          return gr.souraNb > 18 && gr.souraNb <= 50;
        });

        return newMathani;
      } else if (menu == SECTION_MENU.MOFASAL) {
        //sprints = await GridModel.find({ author}).where('souraNb').gt('50').sort({souraNb:1}).lean().exec();
        const newGrids = await sprints.filter((gr: GridType) => {
          return gr.souraNb > 50;
        });

        return newGrids;
      } else {
        return;
      }
    } else {
      return;
    }
  } catch (error: unknown) {
    throw error;
  }
};
const sprint = async (
  _: undefined,
  { author }: { author: string },
  { SprintModel }: { SprintModel: any }
): Promise<Array<SprintType> | null> => {
  try {
    const sprint = await SprintModel.find({
      author
    })
      .lean()
      .exec();

    return sprint;
  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};

const sprintsByAuthor = async (
  _: undefined,
  { author }: { author: string },
  { GridModel }: { GridModel: any }
): Promise<Array<GridType> | null> => {
  try {
    const sprints = await GridModel.findOne({ author }).lean().exec();
    return sprints;
  } catch (error: unknown) {
    throw error;
  }
};

const sprintsByMenu = async (
  _: undefined,
  { input }: { input: { menu: string; author: string } },
  { GridModel }: { GridModel: any }
): Promise<Array<GridType> | undefined> => {
  const { menu, author } = input;
  console.log({ input });
  try {
    const sprints = await GridModel.find({ author }).sort({ souraNb: 1 }).lean().exec();
    if (typeof sprints !== 'undefined' && sprints.length > 0) {
      if (menu == SECTION_MENU.TIWAL) {
        const newTiwal = await sprints.filter((gr: GridType) => {
          return gr.souraNb > 0 && gr.souraNb <= 7;
        });
        return newTiwal;
      } else if (menu == SECTION_MENU.MIIN) {
        // sprints = await GridModel.find({ author}).where('souraNb').gt(7).lte(18).sort({souraNb:1}).lean().exec();
        const newMiin = await sprints.filter((gr: GridType) => {
          return gr.souraNb > 7 && gr.souraNb <= 18;
        });

        return newMiin;
      } else if (menu == SECTION_MENU.MATHANI) {
        // sprints = await GridModel.find({ author}).where('souraNb').gt(18).lte(50).sort({souraNb:1}).lean().exec();
        const newMathani = await sprints.filter((gr: GridType) => {
          return gr.souraNb > 18 && gr.souraNb <= 50;
        });

        return newMathani;
      } else if (menu == SECTION_MENU.MOFASAL) {
        //sprints = await GridModel.find({ author}).where('souraNb').gt('50').sort({souraNb:1}).lean().exec();
        const newGrids = await sprints.filter((gr: GridType) => {
          return gr.souraNb > 50;
        });

        return newGrids;
      } else {
        return;
      }
    } else {
      return;
    }
  } catch (error: unknown) {
    throw error;
  }
};
const gridsByMenu = async (
  _: undefined,
  { input }: { input: { menu: string; author: string } },
  { GridModel }: { GridModel: any }
): Promise<Array<GridType> | undefined> => {
  const { menu, author } = input;
  console.log({ input });
  try {
    const sprints = await GridModel.find({ author }).sort({ souraNb: 1 }).lean().exec();
    if (typeof sprints !== 'undefined' && sprints.length > 0) {
      if (menu == SECTION_MENU.TIWAL) {
        const newTiwal = await sprints.filter((gr: GridType) => {
          return gr.souraNb > 0 && gr.souraNb <= 7;
        });
        return newTiwal;
      } else if (menu == SECTION_MENU.MIIN) {
        // sprints = await GridModel.find({ author}).where('souraNb').gt(7).lte(18).sort({souraNb:1}).lean().exec();
        const newMiin = await sprints.filter((gr: GridType) => {
          return gr.souraNb > 7 && gr.souraNb <= 18;
        });

        return newMiin;
      } else if (menu == SECTION_MENU.MATHANI) {
        // sprints = await GridModel.find({ author}).where('souraNb').gt(18).lte(50).sort({souraNb:1}).lean().exec();
        const newMathani = await sprints.filter((gr: GridType) => {
          return gr.souraNb > 18 && gr.souraNb <= 50;
        });

        return newMathani;
      } else if (menu == SECTION_MENU.MOFASAL) {
        //sprints = await GridModel.find({ author}).where('souraNb').gt('50').sort({souraNb:1}).lean().exec();
        const newGrids = await sprints.filter((gr: GridType) => {
          return gr.souraNb > 50;
        });
        //console.log({ newGrids });


        return newGrids;
      } else {
        return;
      }
    } else {
      return;
    }
  } catch (error: unknown) {
    throw error;
  }
};


// Mutations
// ADD TO FIRESTORE AUTHOR
const addGridOnFireStore = async (
  _: undefined,
  { uid, grid_title }: { uid: string; grid_title: string },
  { dbFirestore }: { dbFirestore: Firestore }
): Promise<boolean | undefined> => {
  try {
    const dbProfiles = dbFirestore.collection('profiles');
    const profileRef = await dbProfiles.doc(`${uid}`);
    const profileSnapshot = await profileRef.get();

    if (profileSnapshot?.exists) {
      await profileRef.collection('grids').doc(grid_title).set({ title: grid_title });
      return true;
    } else {
      return false;
    }
  } catch (error: unknown) {
    throw error;
  }
};
// MUTATIONS
export const addGrids = async (
  _: undefined,
  { input }: { input: GridInput },
  { GridModel, dbFirestore }: { GridModel: any; dbFirestore: Firestore }
): Promise<AddGridsOutput | undefined> => {
  const { title, description, arabName, souraName, souraNb, tabletWords = [], author, ayahs, grid, group } = input;

  try {
    const oldGrid = await GridModel.findOneAndUpdate({ author, title: title }, {
      author,
      title,
      description,
      arabName,
      souraName,
      souraNb,
      tabletWords,
      ayahs,
      grid,
      group
    }, { new: true, upsert: true })
    console.log({ oldGrid, nmb: Number(souraNb) });

    if (typeof oldGrid !== 'undefined' && oldGrid) {
      const res = await addGridOnFireStore(_, { uid: author, grid_title: title }, { dbFirestore });
      if (res) {
        return { success: true, message: `${title} added to tablet and profile` };
      } else {
        return {
          success: false,
          message: `${title} added to tablet database, 
          but can not add a reference to the profile`
        };
      }
    }
  } catch (error: unknown) {
    throw error;
  }
};

const addSprint = async (
  _: undefined,
  { input }: { input: SprintInput },
  { SprintModel, slug, moment }: { moment: any, SprintModel: any; slug: (arg: string) => string }
): Promise<AddGridsOutput | undefined> => {
  try {
    const { title, description, author, stages, endDate, startDate } = input;
    console.log({ startDate, endDate });
    const newSprint = await SprintModel.findOneAndUpdate({ _id: slug(title), author }, {
      title,
      author, description, stages, startDate,
      endDate
    }, { new: true, upsert: true });
    console.log({ newSprint });
    return { success: true, message: JSON.stringify(newSprint.title) };
  } catch (error: any) {
    throw error;
  }
};

// UPDATE PRODUCT
const updateSprint = async (
  _: undefined,
  { input }: { input: SprintInput },
  { SprintModel }: { SprintModel: any }
): Promise<AddGridsOutput | undefined> => {
  try {
    const { author, description, stages, title, endDate, startDate } = input;
    const sprintToUpdate = await SprintModel.findOne({
      title
    });
    if (sprintToUpdate) {
      {
        sprintToUpdate.description = description ?? description;
        sprintToUpdate.stages = stages;
        sprintToUpdate.endDate = endDate;
        sprintToUpdate.startDate = startDate;
      }

      await sprintToUpdate.save();
      return { success: true, message: JSON.stringify(sprintToUpdate) };
    } else {
      return { message: 'No sprint found', success: false };
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

//
const removeSprint = async (
  _: undefined,
  { title }: { title: string },
  { SprintModel }: { SprintModel: any }
): Promise<AddGridsOutput | undefined> => {
  try {
    const sprintUsed = await SprintModel.findOne({ title }).exec();
    sprintUsed.stages = sprintUsed.stages.splice(id, 0);
    sprintUsed.save();
    return { success: true, message: `${sprintUsed.title} was modified` };
  } catch (error: any) {
    console.log({ error });
    return { success: false, message: JSON.stringify(error) };
  }
};


const SprintResolver = {
  Query: {
    getGrids,
    getGridsByNb,
    getGridsPlus,
    sprints,
    guests,
    sprint,
    sprintsByAuthor,
    sprintsByMenu,
    gridsByMenu,

  },
  Mutation: {
    addGrids,
    addSprint,
    updateSprint,
    removeSprint,
  }
};
export default SprintResolver;
