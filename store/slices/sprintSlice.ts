// third-party
import { GridType, SprintStateProps, SprintType, StageType } from '@/api/graphql/sprint/sprint.types';
import { AyahTabletType } from '@/api/graphql/tablet/tablet.types';
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
const initialState: SprintStateProps = {
  sprints: [
    {}
  ],
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
  spaceGridsSelected: [{
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
  gridsAyahsSelected: [{
    order: -1,
    text: '',
    juz: -1
  }
  ],
  gridSelected: {
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
  boardGridIndex: -1,
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
  validGrids: [''],
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
    setSpaceSprint(state: SprintStateProps, action: PayloadAction<{ sprint: string }>) {
      state.spaceSprint = action.payload.sprint
    },

    setSpaceStage(state: SprintStateProps, action: PayloadAction<{ stage: StageType }>) {
      state.spaceStage = action.payload.stage
    },
    setSprintsTitles(state: SprintStateProps, action: PayloadAction<{ sprints: [string] }>) {
      state.sprintsTitles = action.payload.sprints
    },
    setSpaceGrids(state: SprintStateProps, action: PayloadAction<{ grids: [GridType] }>) {
      console.log({ spaceGrids: action.payload.grids });

      state.spaceGridsSelected = action.payload.grids
    },
    setGridSelected(state: SprintStateProps,
      action: PayloadAction<{ grid: GridType }>) {
      console.log({ gridSelected: action.payload.grid });

      state.gridSelected = action.payload.grid
    },
    setGridsAyahsSelected(state: SprintStateProps,
      action: PayloadAction<{ gridsAyahsSelected: [AyahTabletType] }>) {

      state.gridsAyahsSelected = action.payload.gridsAyahsSelected
    },
    setBoardGridIndex(state: SprintStateProps,
      action: PayloadAction<{ index: number }>) {
      console.log({ grid: action.payload.index })
      state.boardGridIndex = action.payload.index
    },
    emptySprintsTitles(state: SprintStateProps) {
      state.sprintsTitles = initialState.sprintsTitles
    },

    emptySprints(state: SprintStateProps) {
      state.sprints = initialState.sprints
    },

    showSideBarMenu(state: SprintStateProps, action: PayloadAction<{ show: boolean }>) {
      state.showMenu = action.payload.show
    },

    setStageSelected(state: SprintStateProps, action: PayloadAction<{ stage: StageType }>) {
      console.log({ state: current(state), stage: action.payload.stage })
      state.stageSelected = action.payload.stage
    },
    setStage(state: SprintStateProps, action: PayloadAction<{ stage: string }>) {

      state.stage = action.payload.stage
    },


    setAyahsGridSelected(state: SprintStateProps,
      action: PayloadAction<{ ayahsGridSelected: AyahTabletType[] }>) {

      state.ayahsGridSelected = action.payload.ayahsGridSelected
    },


    validateStage(state, action: PayloadAction<{ stage: string }>) {

      state.validStages.push(action.payload.stage)
    },

    validateGrid(state: SprintStateProps, action: PayloadAction<{ grid: string }>) {
      state.validGrids.push(action.payload.grid)
    },
    setGrids(state: SprintStateProps, action: PayloadAction<{ grids: GridType[] }>) {

      state.grids = action.payload.grids
    },

    emptySprint(state) {
      state.sprints = initialState.sprints
    },
  },
});

// Reducer
export const sprintActions = sprintSlice.actions
export default sprintSlice.reducer;

