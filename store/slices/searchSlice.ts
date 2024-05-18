import { PayloadAction, createSlice } from '@reduxjs/toolkit';
type SearchGuestType = {
  login: string,
  status: string,
  token: string,
  flag: string
}
type SearchViewerType = {
  login: string,
  status: string,
}
type SearchStateType = {
  state: string,
  states: string[],
  viewers: SearchViewerType[] | null,
  guests: SearchGuestType[] | null,
}
const initialSearchState: SearchStateType = {
  state: '',
  states: [''],
  guests: [{ flag: '', login: '', status: '', token: '' }],
  viewers: [{ login: '', status: '' }],

};
const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
  reducers: {
    setState(state, action: PayloadAction<{ state: string }>) {
      state.state = action.payload.state
    },
    setStates(state, action: PayloadAction<{ states: string[] }>) {
      state.states = action.payload.states
    },
    setGuests(state, action: PayloadAction<{ guests: SearchGuestType[] }>) {
      state.guests = action.payload.guests
    },
    setViewers(state, action: PayloadAction<{ viewers: SearchViewerType[] }>) {
      state.viewers = action.payload.viewers
    },
  }
})
export const searchActions = searchSlice.actions
export default searchSlice.reducer
