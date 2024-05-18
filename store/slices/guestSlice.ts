
import { CoordsType, HostType, SprintGuest, } from '@/api/__sprint/sprint.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export type GuestStateType = {
  guest: SprintGuest,
  host: HostType,
  guests: SprintGuest[],
  hosts: HostType[],
  time: string,

  token: string,
  flag: string,
  addressGeo: string,
  coords: CoordsType
}

export const initialGuestState: GuestStateType = {
  host: {
    token: '', flag: '',
    uid: '',
    cha3bi: 0,
    coords: {
      long: 0,
      lat: 0
    }
  },
  hosts: [{
    token: '', flag: '',
    uid: '',
    cha3bi: 0,
    coords: {
      long: 0,
      lat: 0
    }
  }],
  guest: {
    token: '', flag: '',
    uid: '',
    time: ''
  },
  guests: [{
    token: '', flag: '',
    uid: '',
    time: ''
  }],
  token: '',
  flag: '',
  time: '',
  addressGeo: '',
  coords: {
    lat: -1, long: -1
  },

}
const guestSlice = createSlice({
  name: 'guest',
  initialState: initialGuestState,
  reducers: {
    setGuest(state, action: PayloadAction<{ guest: GuestType }>) {

      state.guest = action.payload.guest
    },
    connectGuest(state, action: PayloadAction<{ guest: { token: string, host: string } }>) {

      state.host = action.payload.guest.host
      state.token = action.payload.guest.token
    },

    setGuests(state, action: PayloadAction<{ guests: SprintGuest[] }>) {
      state.guests = action.payload.guests
    },
    setTime(state, action: PayloadAction<{ time: string }>) {
      state.time = action.payload.time
    },
    setGuestNull(state) {

      state.guest = initialGuestState.guest

    },
    setCoords(state, action: PayloadAction<{ coords: CoordsType }>) {
      state.coords = action.payload.coords
    },
    setAddressGeo(state, action: PayloadAction<{ addressGeo: string }>) {
      state.addressGeo = action.payload.addressGeo
    },
    logout(state) {
      state.token = initialGuestState.token
      state.guest = initialGuestState.guest

    },
  }
})

export const guestActions = guestSlice.actions
export default guestSlice.reducer
