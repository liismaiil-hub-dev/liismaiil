import { SendTelegramStageInput, StageType, SprintType, GridsType, SECTION_MENU, GridsInput, AddGridsOutput, SprintInput, GuestType } from './sprint.types';


const sprints = async (
  _: undefined,
  { __ }: { __: string },
  { SprintModel, slug }: { SprintModel: any, slug: any }
): Promise<Array<SprintType> | null> => {
  try {
    const sprints = await SprintModel.find({}).lean().exec();

    console.log({ sprints })

    if (typeof sprints !== 'undefined' && sprints && sprints.length > 0) {

      if (sprints && sprints.length > 0) {
        return sprints


      } else {
        return []
      }
    }

  } catch (error) {
    throw new Error(error)
  }

};
const guests = async (
  _: undefined,
  { __ }: { __: string },
  { GuestModel, slug }: { GuestModel: any, slug: any }
): Promise<Array<GuestType> | null> => {
  try {
    const guests = await GuestModel.find({}).lean().exec();
    console.log({ guests })
    if (typeof guests !== 'undefined' && guests && guests.length > 0) {
      if (guests && guests.length > 0) {
        return guests

      } else {
        return []
      }
    }

  } catch (error) {
    throw new Error(error)
  }

};
const sprintsByAuthor = async (
  _: undefined,
  { author }: { author: string },
  { SprintModel }: { SprintModel: any }
): Promise<Array<SprintType> | null> => {
  try {
    const sprints = await SprintModel.find({
      author
    }).lean().exec();

    return sprints

  } catch (error) {
    console.log({ error });
    return Promise.reject(error);
  }
};


const sprint = async (
  _: undefined,
  { titleSlug }: { titleSlug: string },
  { SprintModel, slug }: { SprintModel: any, slug: any }
): Promise<Array<SprintType> | null> => {
  try {
    const sprints = await SprintModel.find({}).lean().exec();

    console.log({ sprints, titleSlug, ttSlug: slug(titleSlug) })

    if (typeof sprints !== 'undefined' && sprints && sprints.length > 0) {
      const slugestSprints = await sprints.filter((spr: SprintType) => {
        return spr._id == slug(titleSlug)
      })
      console.log({ slugestSprints })
      if (slugestSprints && slugestSprints.length > 0) {
        return slugestSprints[0]


      } else {
        return []
      }
    }

  } catch (error) {
    throw new Error(error)
  }

};

const gridsByAuth = async (
  _: undefined,
  { author }: { author: string },
  { GridModel }: { GridModel: any }
): Promise<Array<GridsType> | null> => {
  try {
    const grids = await GridModel.findOne({ author }).lean().exec();
    return grids

  } catch (error: unknown) {
    throw error;
  }
}



const addSprint = async (
  _: undefined,
  { input }: { input: SprintInput },
  { SprintModel, slug }: { SprintModel: any; slug: (arg: string) => string }
): Promise<AddGridsOutput | undefined> => {
  try {
    const { title, description, author, stages, endDate, startDate } = input;
    console.log({ input });

    // const newSprint = new SprintModel({ _id: slug(title), author, title, description, stages, startDate, endDate })
    // await newSprint.save();
    return { success: true, message: JSON.stringify(input) }
  } catch (error: any) {
    throw error;
  }
}


// UPDATE PRODUCT
const updateSprint = async (
  _: undefined,
  { input }: { input: SprintInput },
  { SprintModel }: { SprintModel: any }
): Promise<AddGridsOutput | undefined> => {
  try {
    const { author, description, stages, title, endDate, startDate } = input
    const sprintToUpdate = await SprintModel.findOne({
      title
    })
    if (sprintToUpdate) {
      {
        sprintToUpdate.description = description ?? description
        sprintToUpdate.stages = stages
        sprintToUpdate.endDate = endDate
        sprintToUpdate.startDate = startDate

      }


      await sprintToUpdate.save()
      return { success: true, message: JSON.stringify(sprintToUpdate) }

    } else {
      return { message: 'No sprint found', success: false }


    }
  } catch (error: any) {
    throw new Error(error)

  };
}
//
const validateSprint = async (
  _: undefined,
  { title }: { title: string },
  { SprintModel, }: { SprintModel: any, }): Promise<Output | undefined> => {

  try {

    const sprintUsed = await SprintModel.findOne({ title }).exec();
    sprintUsed.stages = sprintUsed.stages.splice(id, 0)
    sprintUsed.save()
    return { success: true, message: `${sprintUsed.title} was modified` }
  } catch (error: any) {
    console.log({ error })
    return { success: false, message: JSON.stringify(error) }
  }
};
const SprintResolver = {

  Query: {
    sprints,
    sprint,
    sprintsByAuthor,
    guests,
  },
  Mutation: {
    addSprint,
    updateSprint,
    validateSprint,


    //sendTelegramStage,
  },
};
export default SprintResolver;
