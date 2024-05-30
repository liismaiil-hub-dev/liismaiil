
import { CoordsType, GuestType } from '@/api/graphql/sprint/sprint.types';
import { PROFILE_STATUS_ENUM, ViewerTypeData } from '@/api/graphql/viewer/viewer.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



export type GuestStateType = {
  guest: GuestType,
  host: ViewerTypeData,
  guests: GuestType[],
  hosts: ViewerTypeData[],
  time: string,

  token: string,
  flag: string,
  addressGeo: string,
  coords: CoordsType
}

export const initialGuestState: GuestStateType = {
  host: {
    flagToken: { token: '', flag: '' },
    uid: '',
    cha3bi: 0,
    coords: {
      long: 0,
      lat: 0
    },
    _id: '',
    login: '',
    email: '',
    status: PROFILE_STATUS_ENUM.ORGA
  },
  hosts: [{
    flagToken: { token: '', flag: '' },
    uid: '',
    cha3bi: 0,
    coords: {
      long: 0,
      lat: 0
    },
    _id: '',
    login: '',
    email: '',
    status: PROFILE_STATUS_ENUM.ORGA
  }],
  guest: {
    token: '', collaboratorId: '', enrollmentStatus: PROFILE_STATUS_ENUM.GUEST, stages: [''], price: -1,
    flag: '', startDate: '', endDate: '',
  },
  guests: [{
    token: '', collaboratorId: '', enrollmentStatus: PROFILE_STATUS_ENUM.GUEST, stages: [''], price: -1,
    flag: '', startDate: '', endDate: '',
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

    setGuests(state, action: PayloadAction<{ guests: GuestType[] }>) {
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
