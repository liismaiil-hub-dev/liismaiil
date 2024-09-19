
// third-party
import { Ayah, EVAL_STATE, GridJsoned, GridMenu, SprintPrismaType, StageStateProps, StagePrismaType } from '@/api/graphql/stage/stage.types';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
const initialState: StageStateProps = {
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
    ayahs: [''],
    id: 0
  },

  stageGridSelected: {
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
  stageOrderedAyahsContext: [{
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
  stageShuffeledAyahsContext: [{
    id: 0,
    juz: 0,
    order: 0,
    text: ''
  }],
  shuffeledFirstAyahsContext: [{
    id: 0,
    juz: 0,
    order: 0,
    text: ''
  }],

  stageShuffeledFirstAyahsContext: [{
    id: 0,
    juz: 0,
    order: 0,
    text: ''
  }],
  stageGridsContext: [{
    id: -1,
    stageId: '',
    createdAt: '',
    souraName: '',
    souraNb: -1,
    grid: -1,
    startOn: '',
    createdById: '',
    ayahs: '',
    guests: []
  }],
  

  gridIndexContext: 0,
  hideNbContext: false,
  faultsNbContext: 0,
  correctsNbContext: 0,
  evalContext: EVAL_STATE.ORDER,
  validContext: false,
  menuSouraNb: [{ souraName: '', souraNb: -1 }],
  gridsContext: [[
    {
      id: -1,
      juz: 0,
      order: 0,
      text: ''
    }
  ]],
  //____________________________________


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


const stageSlice = createSlice({
  name: 'stage',
  initialState,
  reducers: {

    setSprints(state: StageStateProps, action: PayloadAction<{ sprints: [SprintPrismaType] }>) {
      state.sprints = action.payload.sprints
    },
    setGridMenuSouraNb(state: StageStateProps, action: PayloadAction<{ menuSouraNb: GridMenu[] }>) {
      state.menuSouraNb = action.payload.menuSouraNb
    },
    setEvalIndex(state: StageStateProps, action: PayloadAction<{ index: number }>) {
      state.evalIndex = action.payload.index
    },
    setGridSelected(state: StageStateProps,
      action: PayloadAction<{ grid: GridJsoned }>) {
      //      console.log({ gridSelected: action.payload.grid });
      state.gridSelected = action.payload.grid
    },

    setOrderedAyahsContext(state: StageStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      state.orderedAyahsContext = action.payload.ayahs
    },

    setShuffeledAyahsContext(state: StageStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      state.shuffeledAyahsContext = action.payload.ayahs
    },
    setShuffeledFirstAyahsContext(state: StageStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      state.shuffeledFirstAyahsContext = action.payload.ayahs
    },
    //@begin
    setStageGridsContext(state: StageStateProps,
      action: PayloadAction<{ stages: StagePrismaType[] }>) {
      console.log({ grid: action.payload.stages })
      state.stageGridsContext = action.payload.stages
    },

    setStageGridSelected(state: StageStateProps,
      action: PayloadAction<{ grid: StagePrismaType }>) {
      //      console.log({ gridSelected: action.payload.grid });
      state.stageGridSelected = action.payload.grid
    },

    setStageOrderedAyahsContext(state: StageStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      state.stageOrderedAyahsContext = action.payload.ayahs
    },

    setStageShuffeledAyahsContext(state: StageStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      state.stageShuffeledAyahsContext = action.payload.ayahs
    },
    setStageShuffeledFirstAyahsContext(state: StageStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      state.stageShuffeledFirstAyahsContext = action.payload.ayahs
    },
    //@end
    setGridIndexContext(state: StageStateProps,
      action: PayloadAction<{ index: number }>) {
      console.log({ grid: action.payload.index })
      state.gridIndexContext = action.payload.index
    },
    setGridsContext(state: StageStateProps,
      action: PayloadAction<{ grids: [[Ayah]] }>) {
      console.log({ grid: action.payload.grids })
      state.gridsContext = action.payload.grids
    },

    setHideNbContext(state: StageStateProps,
      action: PayloadAction<{ hide: boolean }>) {
      state.hideNbContext = action.payload.hide
    },
    setValidContext(state: StageStateProps,
      action: PayloadAction<{ validCtxt: boolean }>) {
      state.validContext = action.payload.validCtxt
    },
    setEvalContext(state: StageStateProps,
      action: PayloadAction<{ eval: EVAL_STATE }>) {
      state.evalContext = action.payload.eval
    },

    setFaultsNbContext(state: StageStateProps,
      action: PayloadAction<{ nb: number }>) {
      state.faultsNbContext = action.payload.nb
    },
    setCorrectsNbContext(state: StageStateProps,
      action: PayloadAction<{ nb: number }>) {
      state.correctsNbContext = action.payload.nb
    },
    setSpaceGrids(state: StageStateProps, action: PayloadAction<{ grids: GridJsoned[] }>) {
      console.log({ spaceGrids: action.payload.grids });
      state.spaceGridsSelected = action.payload.grids
    },
    setSpaceSprint(state: StageStateProps, action: PayloadAction<{ sprint: SprintPrismaType }>) {
      state.spaceSprint = action.payload.sprint
    },

    setSpaceStage(state: StageStateProps, action: PayloadAction<{ stage: StageTypeData }>) {
      state.spaceStage = action.payload.stage
    },
    setStageSelected(state: StageStateProps, action: PayloadAction<{ stage: StageTypeData }>) {
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
export const stageActions = stageSlice.actions
export default stageSlice.reducer;

