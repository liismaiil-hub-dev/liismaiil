// third-party
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { AyahTabletType, GridInput, SprintStateProps, SprintType, StageType } from 'app/api/sprint/sprint.types';
import * as _ from 'lodash';
const initialState: SprintStateProps = {
  sprints: [],
  sprintsTitles: [''],
  showMenu: false,
  stages: [],
  stage: '',
  spaceSprint: '',
  //validStages: [''],
  // minmax: { min: -1, max: -1 },
  stageSelected: undefined,
  gridsSelected: undefined,
  gridSelected: undefined,
  grid: undefined,
  ayHided: [{ id: -1, order: -1 }],
  ayahArraySelected: undefined,
  validGrids: [''],
  dueDate: '',
  gridName: '',
  author: 'kazdhicham@gmail.com',
  title: '',
  newBoard: true,
  openSprint: false,
  guests: [],
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

    setSprints(state: SprintStateProps, action: PayloadAction<{ sprints: SprintType[] }>) {
      state.sprints = action.payload.sprints
    },
    setSpaceSprint(state: SprintStateProps, action: PayloadAction<{ sprint: string }>) {
      state.spaceSprint = action.payload.sprint
    },

    setSpaceStage(state: SprintStateProps, action: PayloadAction<{ stage: StageType }>) {
      state.spaceStage = action.payload.stage
    },
    setSprintsTitles(state: SprintStateProps, action: PayloadAction<{ sprints: string[] }>) {
      state.sprintsTitles = action.payload.sprints
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
    setGridsSelected(state: SprintStateProps,
      action: PayloadAction<{ grids: { stageId: number, gridId: string, index: number }[] }>) {

      state.gridsSelected = action.payload.grids
    },


    setGridSelected(state: SprintStateProps,
      action: PayloadAction<{ grid: GridInput }>) {
      console.log({ grid: action.payload.grid })
      state.gridSelected = action.payload.grid
    },
    setGrid(state: SprintStateProps,
      action: PayloadAction<{ grid: AyahTabletType[] }>) {
      console.log({ grid: action.payload.grid })
      state.grid = action.payload.grid
    },
    setMinMax(state: SprintStateProps,
      action: PayloadAction<{ minmax: { min: number, max: number } }>) {
      console.log({ minmax: action.payload.minmax })
      state.minmax = action.payload.minmax
    },

    hideAy(state: SprintStateProps,
      action: PayloadAction<{ ayIds: { order: number, id: number } }>) {
      console.log({ ayIds: action.payload.ayIds })
      if (typeof current(state)?.ayHided === 'undefined' || _.isEmpty(current(state)?.ayHided[0])) {

        state.ayHided = [action.payload.ayIds]
      } else if (current(state)?.ayHided[0].order === action.payload.ayIds.order) {
        return state
      } else {
        state.ayHided.push(action.payload.ayIds)
      }
    },
    resetHidedAy(state: SprintStateProps) {
      state.ayHided = initialState.ayHided

    },

    setAyahArraySelected(state: SprintStateProps,
      action: PayloadAction<{ ayahArray: AyahTabletType[] }>) {
      console.log({ ayahArray: action.payload.ayahArray })
      state.ayahArraySelected = action.payload.ayahArray
    },
    validateStage(state, action: PayloadAction<{ stage: string }>) {

      state.validStages.push(action.payload.stage)
    },

    validateGrids(state: SprintStateProps, action: PayloadAction<{ grids: string }>) {
      state.validGrids.push(action.payload.grids)
    },
    setGrids(state: SprintStateProps, action: PayloadAction<{ grids: GridInput[] }>) {

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

