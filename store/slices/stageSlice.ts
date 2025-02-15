import { INSIGHT_STATE, WINDOW_VISUALISATION } from '@/api/graphql/stage/stage.types';

// third-party
import { Ayah, EVAL_STATE, GiftType, GridMenu, GridTypeData, GuestPrismaType, PRODUCT_STATUS_ENUM, SprintGuest, SprintPrismaType, StagePrismaType, StagesSprintType, StageStateProps, StatsTemplateType, statsTemplateType, TemplateTypeData } from '@/api/graphql/stage/stage.types';
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
  exerciseContext: false,
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
  hideEvenNbContext:false,
  hideOddNbContext: false,
  blurContext: false,
  firstGridContext: false,
  stageHideNbContext: false,
  faultsNbContext: 0,
  correctsNbContext: 0,
  evalContext: EVAL_STATE.DISCOVER,
  insightContext: INSIGHT_STATE.SOURA,
  stageEvalContext: EVAL_STATE.DISCOVER,
  windowVisualisationContext:WINDOW_VISUALISATION.ALL,
  validContext: false,
  stageValidContext: false,
  evalValidContext: false,
  dragDropContext:false,
  threeContext:false,
  d3Context:false,
  menuSouraNb: [{ souraName: '', souraNb: -1 }],
  windowContext: -1,
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
  sprintsReady:[''],
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
//          console.log({ gridSelected: action.payload.grid });
      state.spaceStageSelected = action.payload.grid;
      state.reorderedAyahsContext = [-1];
      state.firstGridContext = true;
    },
    setSpaceStages(state: StageStateProps,
      action: PayloadAction<{ stages: StagePrismaType[] }>) {
          console.log({ spaceSouraStages: action.payload.stages });
      state.spaceStages = action.payload.stages;
      state.reorderedAyahsContext = [-1];
      state.firstGridContext = true;
    },
    setOwnSprints(state: StageStateProps,
      action: PayloadAction<{ sprints: SprintPrismaType[] }>) {
          console.log({ ownSprints : action.payload.sprints});
      state.ownSprints = action.payload.sprints;
     
    },
    setAllSprints(state: StageStateProps,
      action: PayloadAction<{ sprints: SprintPrismaType[] }>) {
          console.log({ ownSprints : action.payload.sprints});
      state.sprintsContext = action.payload.sprints;
     
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
    setWindowVisualisationContext(state: StageStateProps, action: PayloadAction<{ windVisu: WINDOW_VISUALISATION }>) {
      state.windowVisualisationContext = action.payload.windVisu
    },
    setShuffeledAyahsContext(state: StageStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      state.shuffeledAyahsContext = action.payload.ayahs
    },
    setShuffeledFirstAyahsContext(state: StageStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      state.shuffeledFirstAyahsContext = action.payload.ayahs
    },
    //@begin Insight 
    setInsightTemplate(state: StageStateProps,
      action: PayloadAction<{ template: TemplateTypeData }>) {
      console.log({insightTemplate : action.payload.template })
      state.insightTemplate = action.payload.template
      state.insightWindow = 0
    },
    setInsightWindow(state: StageStateProps,
      action: PayloadAction<{ window: number }>) {

      state.insightWindow = action.payload.window
    },
    setGridTemplateSelected(state: StageStateProps,
      action: PayloadAction<{ grid:Ayah[]  }>) {
//          console.log({ gridSelected: action.payload.grid });
      state.gridTemplateSelected = action.payload.grid;
     },
     setInsightTemplateAyahsSelected(state: StageStateProps,
      action: PayloadAction<{ ayahs:Ayah[]  }>) {
//          console.log({ gridSelected: action.payload.ayahs });
      state.insightTemplateAyahsSelected = action.payload.ayahs;
     },
     setStatsTemplateContext(state: StageStateProps,
      action: PayloadAction<{ stats:StatsTemplateType[]  }>) {
//          console.log({ gridSelected: action.payload.ayahs });
      state.statsTemplateContext = action.payload.stats;
     },
     setWindowDialogContext(state: StageStateProps,
      action: PayloadAction<{ wind:number  }>) {
//          console.log({ gridSelected: action.payload.ayahs });
      state.windowContext = action.payload.wind;
     },
     setInsightContext(state: StageStateProps,
      action: PayloadAction<{ insight: INSIGHT_STATE }>) {
      state.insightContext = action.payload.insight
      state.windowContext = -1
    },

    //@begin stage 
    setStageGridsContext(state: StageStateProps,
      action: PayloadAction<{ stages: StagePrismaType[] }>) {
      console.log({ stageGrids: action.payload.stages })
      state.stageGridsContext = action.payload.stages
    },
    setStagesSprintsContext(state: StageStateProps,
      action: PayloadAction<{ stages: StagesSprintType[] }>) {
      console.log({ stageGrids: action.payload.stages })
      state.stagesSprintsContext = action.payload.stages
    },
    setCategoryContext(state: StageStateProps,
      action: PayloadAction<{ cat: GRIDS_NAME }>) {
 
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
    setStageSprintSelected(state: StageStateProps,
      action: PayloadAction<{ stage: StagesSprintType }>) {
          console.log({ stageSprintSelected: action.payload.stage});
      state.stageSprintSelected = action.payload.stage;
      state.showStepsContext = false;
       state.errorNbContext = initialState.errorNbContext;
       state.reorderedAyahsContext =  initialState.reorderedAyahsContext;
       state.gridSelected =  initialState.gridSelected;
       state.gridsContext =  initialState.gridsContext;
       state.orderedAyahsContext =  initialState.orderedAyahsContext;
       state.shuffeledFirstAyahsContext =  initialState.shuffeledFirstAyahsContext;
       state.shuffeledAyahsContext =  initialState.shuffeledAyahsContext;
       state.d3Context = initialState.d3Context;
       state.windowContext = initialState.windowContext
       state.threeContext=initialState.threeContext
       state.dragDropContext=initialState.dragDropContext
    
      },
    setExerciseStages(state: StageStateProps,
      action: PayloadAction<{ stages: StagesSprintType[] }>) {
          //console.log({ stageSprintSelected: action.payload.stage});
      state.exerciseStages = action.payload.stages;
       state.errorNbContext = initialState.errorNbContext;
       state.reorderedAyahsContext =  initialState.reorderedAyahsContext;
       state.gridSelected =  initialState.gridSelected;
       state.gridsContext =  initialState.gridsContext;
       state.orderedAyahsContext =  initialState.orderedAyahsContext;
       state.shuffeledFirstAyahsContext =  initialState.shuffeledFirstAyahsContext;
       state.shuffeledAyahsContext =  initialState.shuffeledAyahsContext;
    },
    setCatStages(state: StageStateProps,
      action: PayloadAction<{ stages: StagesSprintType[] }>) {
         // console.log({ stages: action.payload.stages, gridsContext:current(state).gridsContext });
      state.catStages = action.payload.stages;
    },
    setLocalStages(state: StageStateProps,
      action: PayloadAction<{ stages: StagePrismaType[] }>) {
      console.log({localStages : action.payload.stages});
      state.localStages = action.payload.stages;
    },
    setGridsStaged(state: StageStateProps,
      action: PayloadAction<{ stageIds: string[] }>) {
        console.log({currentGridsStaged : current(state).gridsStaged, stageIds:action.payload.stageIds});
         
      state.gridsStaged = action.payload.stageIds;
    },
    initInsight(state: StageStateProps,
      action: PayloadAction<{ insightContext: INSIGHT_STATE }>) {

        
        state.errorNbContext = 0  
        state.gridsStaged = [''];
      state.insightContext = INSIGHT_STATE.SOURA;
    },
    setSprintsReady(state: StageStateProps,
      action: PayloadAction<{ sprintIds: string[] }>) {
         
      state.sprintsReady = action.payload.sprintIds;
    },
    setSprintGuests(state: StageStateProps,
      action: PayloadAction<{ guests: SprintGuest[] }>) {
         
      state.sprintGuests = action.payload.guests;
    },
    emptyGridsStaged(state: StageStateProps ) {
         
      state.gridsStaged = initialState.gridsStaged;
    },
    setStageOrderedAyahsContext(state: StageStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      state.stageOrderedAyahsContext = action.payload.ayahs
    },

    setStageShuffeledAyahsContext(state: StageStateProps, action: PayloadAction<{ ayahs: Ayah[] }>) {
      state.stageShuffeledAyahsContext = action.payload.ayahs
      state.stageReorderedAyahsContext = initialState.stageReorderedAyahsContext
     // state.exerciseContext = initialState.exerciseContext
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
    setDragDropContext(state: StageStateProps,
      action: PayloadAction<{ dragDrop: boolean }>) {
        state.dragDropContext = action.payload.dragDrop
        state.d3Context = initialState.d3Context
        state.threeContext = initialState.threeContext
    },
    setD3Context(state: StageStateProps,
      action: PayloadAction<{ d3: boolean }>) {
      state.d3Context = action.payload.d3
      state.dragDropContext = initialState.dragDropContext
      state.threeContext = initialState.threeContext
    },
    setThreeContext(state: StageStateProps,
      action: PayloadAction<{ three: boolean }>) {
      state.threeContext = action.payload.three
      state.dragDropContext = initialState.dragDropContext
      state.d3Context = initialState.dragDropContext
    },
    setStageValidContext(state: StageStateProps,
      action: PayloadAction<{ validCtxt: boolean }>) {
      state.stageValidContext = action.payload.validCtxt
    },
    setEvalValidContext(state: StageStateProps,
      action: PayloadAction<{ evalCtxt: boolean }>) {
      state.evalValidContext = action.payload.evalCtxt
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
    setHideOddNbContext(state: StageStateProps,
      action: PayloadAction<{ hide: boolean }>) {
        console.log({hideOddNbContext:  action.payload.hide});
        
      state.hideOddNbContext = action.payload.hide
    },
     setHideEvenNbContext(state: StageStateProps,
      action: PayloadAction<{ hide: boolean }>) {
        console.log({hideEvenNbContext:  action.payload.hide});

      state.hideEvenNbContext = action.payload.hide
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

