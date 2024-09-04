
import { CoordsType, GuestType } from '@/api/graphql/profile/profile.types';
import { PROFILE_STATUS_ENUM, ViewerTypeData } from '@/api/graphql/viewer/viewer.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type OrgCoordType = {
  coords: CoordsType,
  addressGeo: string
}

export type GuestStateType = {
  guest: GuestType,
  host: ViewerTypeData,
  guests: GuestType[],
  hosts: ViewerTypeData[],
  time: string,

  token: string,
  flag: string,
  addressGeo: string,
  addressGeos: [string],
  orgCoords: OrgCoordType[],
  coords: CoordsType
  country: string
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
    tokenId: 0, collaboratorId: '', status: PROFILE_STATUS_ENUM.GUEST, stages: [''], price: -1,
    flag: '', startDate: '', endDate: '',
    host: 0,
    password: '',
  },
  guests: [{
    tokenId: 0, collaboratorId: '', enrollmentStatus: PROFILE_STATUS_ENUM.GUEST, stages: [''], price: -1,
    flag: '', startDate: '', endDate: '',
    host: 0,
    status: PROFILE_STATUS_ENUM.ADMIN
  }],
  token: '',
  flag: '',
  time: '',
  addressGeo: '',
  addressGeos: [''],
  country: '',
  coords: {
    lat: -1, long: -1
  },
  orgCoords: [{
    coords: {
      lat: -1, long: -1
    }, addressGeo: ''
  }],

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
    setOrgCoords(state, action: PayloadAction<{ orgCoords: OrgCoordType[] }>) {
      state.orgCoords = action.payload.orgCoords
    },

    untry(state, action: PayloadAction<{ country: string }>) {
      state.country = action.payload.country
    },
    logout(state) {
      state.token = initialGuestState.token
      state.guest = initialGuestState.guest

    },
  }
})

export const guestActions = guestSlice.actions
export default guestSlice.reducer
