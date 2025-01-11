
// third-party
import { Ayah, EVAL_STATE, GiftType, GridJsoned, GridMenu, GridTypeData, PRODUCT_STATUS_ENUM, SprintPrismaType, StagePrismaType, StageStateProps } from '@/api/graphql/stage/stage.types';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { GRIDS_NAME, GRIDS_TLD } from '../constants/constants';
const initialState: StageStateProps = {
  
  categoryContext:GRIDS_NAME[GRIDS_TLD.TIWAL],
  spaceGridsSelected: [{
    grid: -1,
    group: -1,
    title: '',
    souraNb: -1,
    arabName: '',
    souraName: '',
    ayahs: [''],
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
  isDraggedContext: false,
  isDroppedContext: false,

  stageGridSelected: {
    grid: -1,
    group: -1,
   souraNb: -1,
    arabName: '',
    souraName: '',
    ayahs: '',
    id: 0,
    stageId: '',
    createdAt: ''
  },
  evalIndex: 0,
  stagedContext: false,
  reorderedAyahsContext:[-1],
  stageReorderedAyahsContext:[-1],
  sprintRandomHidden:[-1],
  sprintsContext: [
    {
      sprintId: '', published: false,
      stageId: ''
    }
  ],
  sprintSelected: {
    sprintId: '', published: false,
    stageId: ''
  },

  orderedAyahsContext: [{
    id: 0,
    juz: 0,
    order: 0,
    text: '',
    numberInSurah: 0
  }
  ],
  stageOrderedAyahsContext: [{
    id: 0,
    juz: 0,
    order: 0,
    text: '',
    numberInSurah: 0
  }
  ],
  shuffeledAyahsContext: [{
    id: 0,
    juz: 0,
    order: 0,
    text: '',
    numberInSurah: 0
  }],
  stageShuffeledAyahsContext: [{
    id: 0,
    juz: 0,
    order: 0,
    text: '',
    numberInSurah: 0
  }],
  shuffeledFirstAyahsContext: [{
    id: 0,
    juz: 0,
    order: 0,
    text: '',
    numberInSurah: 0
  }],

  stageShuffeledFirstAyahsContext: [{
    id: 0,
    juz: 0,
    order: 0,
    text: '',
    numberInSurah: 0
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
  catStages: [{
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
  localStages: [{
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
  spaceStages: [{
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
  spaceStageSelected: {
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
  },
  //spa
  //space drag & drop
  draggedIndex: 0,
  errorNbContext: 0,
  firstStateContext: false,
  showStepsContext: false,
  gridsStaged:[''],
  selectedGifts:[{
    author: '',
    title: '',
    titleSlug: '',
    selection: '',
    stock: -1,
    price: -1,
    productStatus: PRODUCT_STATUS_ENUM.ORGA,
    description: '',
    image: {
      public_id: '',
      url: ''
    },
    rate: 0
  }],
  gridIndexContext: 0,
  stepIndexContext:0,
  stageEvalIndexContext: 0,
  hideNbContext: false,
  blurContext: false,
  firstGridContext: false,
  stageHideNbContext: false,
  faultsNbContext: 0,
  correctsNbContext: 0,
  evalContext: EVAL_STATE.ORDER,
  stageEvalContext: EVAL_STATE.ORDER,
  validContext: false,
  stageValidContext: false,
  menuSouraNb: [{ souraName: '', souraNb: -1 }],
  spaceStageAyahsContext:[
    {
      id: -1,
      juz: 0,
      order: 0,
      text: '',
      numberInSurah: 0
    }
  ],
  gridsContext: [[
    {
      id: -1,
      juz: 0,
      order: 0,
      text: '',
      numberInSurah: 0
    }
  ]],
  stageSelected: {
    id: 0,
    stageId: '',
    createdAt: '',
    souraName: '',
    arabName: undefined,
    souraNb: 0,
    grid: 0,
    group: undefined,
    startOn: undefined,
    createdById: undefined,
    guests: undefined,
    ayahs: '',
    sprints: undefined
  },
  spaceSprint: {
    sprintId: '',
    createdAt: undefined,
    startOn: undefined,
    finishOn: undefined,
    createdById: undefined,
    published: undefined,
    guests: undefined,
    stage: undefined
  },
  spaceStage: {
    id: 0,
    stageId: '',
    createdAt: '',
    souraName: '',
    arabName: undefined,
    souraNb: 0,
    grid: 0,
    group: undefined,
    startOn: undefined,
    createdById: undefined,
    guests: undefined,
    ayahs: '',
    sprints: undefined
  },
  validStages: ['']
};


const stageSlice = createSlice({
  name: 'stage',
  initialState,
  reducers: {

    setSprintsContext(state: StageStateProps, action: PayloadAction<{ sprints: SprintPrismaType[] }>) {
      state.sprintsContext = action.payload.sprints
    },

    setSprintSelected(state: StageStateProps, action: PayloadAction<{ sprint: SprintPrismaType }>) {
      state.sprintSelected = action.payload.sprint
    },

    emptySprintsContext(state) {
      state.sprintsContext = initialState.sprintsContext
    },

    setGridMenuSouraNb(state: StageStateProps, action: PayloadAction<{ menuSouraNb: GridMenu[] }>) {
      state.menuSouraNb = action.payload.menuSouraNb
    },
    setEvalIndex(state: StageStateProps, action: PayloadAction<{ index: number }>) {
      state.evalIndex = action.payload.index
    },
    setIsDraggedContext(state: StageStateProps, action: PayloadAction<{ drag: boolean }>) {
      state.isDraggedContext = action.payload.drag
    },
    setIsDroppedContext(state: StageStateProps, action: PayloadAction<{ drop: boolean }>) {
      state.isDroppedContext = action.payload.drop
    },
    setGridSelected(state: StageStateProps,
      action: PayloadAction<{ grid: GridJsoned }>) {
          console.log({ gridSelected: action.payload.grid });
      state.gridSelected = action.payload.grid;
      state.reorderedAyahsContext = [-1];
      state.firstGridContext = true;
    },
    setSpaceStageSelected(state: StageStateProps,
      action: PayloadAction<{ grid: StagePrismaType }>) {
          console.log({ gridSelected: action.payload.grid });
      state.spaceStageSelected = action.payload.grid;
      state.reorderedAyahsContext = [-1];
      state.firstGridContext = true;
    },

    setOrderedAyahsContext(state: StageStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      console.log({ordrdAyhsCon: action.payload.ayahs});
      
      state.orderedAyahsContext = action.payload.ayahs
    },
    setReorderedAyahsContext(state: StageStateProps, action: PayloadAction<{ reorderedAyahsContext: number[] }>) {
      state.reorderedAyahsContext = action.payload.reorderedAyahsContext
    },
    setStageReorderedAyahsContext(state: StageStateProps, action: PayloadAction<{ reorderedAyahsContext: number[] }>) {
      state.stageReorderedAyahsContext = action.payload.reorderedAyahsContext
    },

    setShuffeledAyahsContext(state: StageStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      state.shuffeledAyahsContext = action.payload.ayahs
    },
    setShuffeledFirstAyahsContext(state: StageStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      state.shuffeledFirstAyahsContext = action.payload.ayahs
    },
    //@begin stage 
    setStageGridsContext(state: StageStateProps,
      action: PayloadAction<{ stages: StagePrismaType[] }>) {
      console.log({ stageGrids: action.payload.stages })
      state.stageGridsContext = action.payload.stages
    },
    setCategoryContext(state: StageStateProps,
      action: PayloadAction<{ cat: GRIDS_NAME }>) {
      console.log({ categoryContext: action.payload.cat })
      state.categoryContext = action.payload.cat
      state.showStepsContext = true
    },
    setShowStepsContext(state: StageStateProps,
      action: PayloadAction<{ show: boolean }>) {
      console.log({ showStepsContext: action.payload.show })
      state.showStepsContext = action.payload.show
    },
    setFirstGridContext(state: StageStateProps,
      action: PayloadAction<{ first: boolean }>) {
      state.firstGridContext = action.payload.first
    },
    setStageGridSelected(state: StageStateProps,
      action: PayloadAction<{ stage: StagePrismaType }>) {
          console.log({ stageSelected: action.payload.stage, gridsContext:current(state).gridsContext });
      state.stageGridSelected = action.payload.stage;
      state.showStepsContext = false;
       state.errorNbContext = initialState.errorNbContext;
       state.reorderedAyahsContext =  initialState.reorderedAyahsContext;
       state.gridSelected =  initialState.gridSelected;
       state.gridsContext =  initialState.gridsContext;
       state.orderedAyahsContext =  initialState.orderedAyahsContext;
       state.shuffeledFirstAyahsContext =  initialState.shuffeledFirstAyahsContext;
       state.shuffeledAyahsContext =  initialState.shuffeledAyahsContext;
    },
    setCatStages(state: StageStateProps,
      action: PayloadAction<{ stages: StagePrismaType[] }>) {
         // console.log({ stages: action.payload.stages, gridsContext:current(state).gridsContext });
      state.catStages = action.payload.stages;
    },
    setLocalStages(state: StageStateProps,
      action: PayloadAction<{ stages: StagePrismaType[] }>) {

      state.localStages = action.payload.stages;
    },
    setGridsStaged(state: StageStateProps,
      action: PayloadAction<{ stageIds: string[] }>) {
        console.log({currentGridsStaged : current(state).gridsStaged, stageIds:action.payload.stageIds});
         
      state.gridsStaged = action.payload.stageIds;
    },
    setStageOrderedAyahsContext(state: StageStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      state.stageOrderedAyahsContext = action.payload.ayahs
    },

    setStageShuffeledAyahsContext(state: StageStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      console.log({
        shuffeledAyahs: action.payload.ayahs
      });
      
      state.stageShuffeledAyahsContext = action.payload.ayahs
    },
    setStageShuffeledFirstAyahsContext(state: StageStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      state.stageShuffeledFirstAyahsContext = action.payload.ayahs
    },
    setStepIndexContext(state: StageStateProps,
      action: PayloadAction<{ index: number }>) {
      console.log({ stepIndex: action.payload.index })
      state.stepIndexContext = action.payload.index
    },
        setStagedContext(state: StageStateProps,
      action: PayloadAction<{ stagedContext: boolean }>) {
    
      state.stagedContext = action.payload.stagedContext
    },
    setStageEvalIndexContext(state: StageStateProps,
      action: PayloadAction<{ index: number }>) {
      console.log({ stageEvalIndexContextInput: action.payload.index })
      state.stageEvalIndexContext = action.payload.index
    },
    setStageHideNbContext(state: StageStateProps,
      action: PayloadAction<{ hide: boolean }>) {
      state.stageHideNbContext = action.payload.hide
    },
    setStageValidContext(state: StageStateProps,
      action: PayloadAction<{ validCtxt: boolean }>) {
      state.stageValidContext = action.payload.validCtxt
    },
    setStageEvalContext(state: StageStateProps,
      action: PayloadAction<{ eval: EVAL_STATE }>) {
      state.stageEvalContext = action.payload.eval
    },
  // sprint
  setSprintRandomHiddenContext(state: StageStateProps,
    action: PayloadAction<{ randomHidden: number[] }>) {
    state.sprintRandomHidden = action.payload.randomHidden
  },
    //@end
    // space - drag & drop
  
 
    setDraggedIndex(state: StageStateProps,
      action: PayloadAction<{ index: number }>) {
      console.log({ grid: action.payload.index })
      state.draggedIndex = action.payload.index
    },
    setErrorNbContext(state: StageStateProps,
      action: PayloadAction<{ errorNb: number }>) {
      console.log({ nb: action.payload.errorNb })
      state.errorNbContext = action.payload.errorNb
    },
    setFirstStateContext(state: StageStateProps,
      action: PayloadAction<{ first: boolean }>) {
      console.log({ first: action.payload.first})
      state.firstStateContext = action.payload.first
    },
    setGridIndexContext(state: StageStateProps,
      action: PayloadAction<{ index: number }>) {
      console.log({ grid: action.payload.index })
      state.gridIndexContext = action.payload.index
    },
    setGridsContext(state: StageStateProps,
      action: PayloadAction<{ grids: [[Ayah]] }>) {
      console.log({ gridsContext: action.payload.grids })
      state.gridsContext = action.payload.grids
    },
    setSpaceStageAyahsContext(state: StageStateProps,
      action: PayloadAction<{ ayahs: [Ayah] }>) {
      //console.log({ gridsContext: action.payload.grids })
      state.spaceStageAyahsContext = action.payload.ayahs
    },

    setHideNbContext(state: StageStateProps,
      action: PayloadAction<{ hide: boolean }>) {
      state.hideNbContext = action.payload.hide
    },
    setBlurContext(state: StageStateProps,
      action: PayloadAction<{ blur: boolean }>) {
      state.blurContext = action.payload.blur
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
    setSpaceGrids(state: StageStateProps, action: PayloadAction<{ grids: GridTypeData[] }>) {
      console.log({ spaceGrids: action.payload.grids });
      state.spaceGridsSelected = action.payload.grids
    },
    setSpaceSrages(state: StageStateProps, action: PayloadAction<{ grids: StagePrismaType[] }>) {
      console.log({ spaceGrids: action.payload.grids });
      state.spaceStages = action.payload.grids
    },
    setSpaceSprint(state: StageStateProps, action: PayloadAction<{ sprint: SprintPrismaType }>) {
      state.spaceSprint = action.payload.sprint
    },

    setSpaceStage(state: StageStateProps, action: PayloadAction<{ stage: StagePrismaType }>) {
      state.spaceStage = action.payload.stage
    },
    setStageSelected(state: StageStateProps, action: PayloadAction<{ stage: StagePrismaType }>) {
      console.log({ state: current(state), stage: action.payload.stage })
      state.stageSelected = action.payload.stage
    },
    validateStage(state, action: PayloadAction<{ stage: string }>) {

      state.validStages.push(action.payload.stage)
    },
// host
    selecteGifts(state: StageStateProps, action: PayloadAction<{ gift: GiftType }>) {
      if(current(state).selectedGifts.length === 1 && current(state).selectedGifts[0].title === '' ) {
      state.selectedGifts = [action.payload.gift]
      
      }else {
      state.selectedGifts = [...current(state).selectedGifts,action.payload.gift ]
      }
},

  },
});

// Reducer
export const stageActions = stageSlice.actions
export default stageSlice.reducer;

