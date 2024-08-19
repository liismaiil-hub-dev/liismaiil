// third-party
import { Ayah, EVAL_STATE, GridJsoned, SprintStateProps, SprintType, StageTypeData } from '@/api/graphql/stage/stage.types';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
const initialState: SprintStateProps = {
  spaceGridsSelected: [{
    grid: -1,
    group: -1,
    title: '',
    souraNb: -1,
    arabName: '',
    souraName: '',
    ayahs: '',
    id: 0
  }
  ],
  gridSelected: {
    grid: -1,
    group: -1,
    title: '',
    souraNb: -1,
    arabName: '',
    souraName: '',
    ayahs: '',
    id: 0
  },
  evalIndex: 0,
  sprints: [
    { id: 0, author: '', description: '', endDate: '', stages: [''], startDate: '', title: '' }
  ],
  orderedAyahsContext: [{
    id: 0,
    juz: 0,
    order: 0,
    text: ''
  }
  ],
  shuffeledAyahsContext: [{
    id: 0,
    juz: 0,
    order: 0,
    text: ''
  }],
  gridIndexContext: 0,
  hideNbContext: false,
  faultsNbContext: 0,
  correctsNbContext: 0,
  evalContext: EVAL_STATE.ORDER,

  //____________________________________

  sprintsTitles: [''],
  showMenu: false,
  stages: [{}],
  validGrids: [''],
  stage: '',
  spaceSprint: '',
  //validStages: [''],
  // minmax: { min: -1, max: -1 },
  stageSelected: {
    id: -1,
    title: '',
    grids: [{
      author: '',
      grid: -1,
      group: [-1],
      title: '',
      description: '',
      souraNb: -1,
      arabName: '',
      souraName: '',
      ayahs: [[{
        order: -1,
        text: '',
        juz: -1
      }
      ]]
    }
    ],
    author: '',

  },

  gridsAyahsSelected: [{
    order: -1,
    text: '',
    juz: -1
  }
  ],


  grid: {
    author: '',
    grid: -1,
    group: [-1],
    title: '',
    description: '',
    souraNb: -1,
    arabName: '',
    souraName: '',
    ayahs: [[{
      order: -1,
      text: '',
      juz: -1
    }
    ]]
  },
  ayHided: [{ id: -1, order: -1 }],
  ayahArraySelected: undefined,

  dueDate: '',
  gridName: '',
  author: 'kazdhicham@gmail.com',
  title: '',
  newBoard: true,
  openSprint: false,
  guests: [{
    collaboratorId: '', flag: '', tokenId: '',
    startDate: '',
    endDate: ''
  }],
  description: '',
  sprintStages: [],
  selectedTablet: '',
  selectedStageId: 0,
  selectedStage: ''
};


const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {

    setSprints(state: SprintStateProps, action: PayloadAction<{ sprints: [SprintType] }>) {
      state.sprints = action.payload.sprints
    },
    setEvalIndex(state: SprintStateProps, action: PayloadAction<{ index: number }>) {
      state.evalIndex = action.payload.index
    },
    setGridSelected(state: SprintStateProps,
      action: PayloadAction<{ grid: GridJsoned }>) {
      //      console.log({ gridSelected: action.payload.grid });
      state.gridSelected = action.payload.grid
    },

    setOrderedAyahsContext(state: SprintStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      state.orderedAyahsContext = action.payload.ayahs
    },

    setShuffeledAyahsContext(state: SprintStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      state.shuffeledAyahsContext = action.payload.ayahs
    },
    setGridIndexContext(state: SprintStateProps,
      action: PayloadAction<{ index: number }>) {
      console.log({ grid: action.payload.index })
      state.gridIndexContext = action.payload.index
    },

    setHideNbContext(state: SprintStateProps,
      action: PayloadAction<{ hide: boolean }>) {
      state.hideNbContext = action.payload.hide
    },
    setEvalContext(state: SprintStateProps,
      action: PayloadAction<{ eval: EVAL_STATE }>) {
      state.evalContext = action.payload.eval
    },

    setFaultsNbContext(state: SprintStateProps,
      action: PayloadAction<{ nb: number }>) {
      state.faultsNbContext = action.payload.nb
    },
    setCorrectsNbContext(state: SprintStateProps,
      action: PayloadAction<{ nb: number }>) {
      state.correctsNbContext = action.payload.nb
    },
    setSpaceGrids(state: SprintStateProps, action: PayloadAction<{ grids: GridJsoned[] }>) {
      console.log({ spaceGrids: action.payload.grids });
      state.spaceGridsSelected = action.payload.grids
    },
    setSpaceSprint(state: SprintStateProps, action: PayloadAction<{ sprint: SprintType }>) {
      state.spaceSprint = action.payload.sprint
    },

    setSpaceStage(state: SprintStateProps, action: PayloadAction<{ stage: StageTypeData }>) {
      state.spaceStage = action.payload.stage
    },
    setStageSelected(state: SprintStateProps, action: PayloadAction<{ stage: StageTypeData }>) {
      console.log({ state: current(state), stage: action.payload.stage })
      state.stageSelected = action.payload.stage
    },
    validateStage(state, action: PayloadAction<{ stage: string }>) {

      state.validStages.push(action.payload.stage)
    },


    emptySprint(state) {
      state.sprints = initialState.sprints
    },
  },
});

// Reducer
export const sprintActions = sprintSlice.actions
export default sprintSlice.reducer;

