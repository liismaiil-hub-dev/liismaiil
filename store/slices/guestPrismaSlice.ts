
import { CoordsType, LIISMAIIL_STATUS_ENUM } from '@/api/graphql/profile/profile.types';
import { GuestPrismaType } from '@/app/api/graphql/stage/stage.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type OrgCoordType = {
  coords: CoordsType,
  addressGeo: string
}

export type GuestStateType = {
  guestPrisma: GuestPrismaType,
  guestsPrisma: GuestPrismaType[],
  hostsPrisma: GuestPrismaType[],
  guestsOnline: GuestPrismaType[],

}

export const initialGuestState: GuestStateType = {
  guestPrisma: {
    tokenId: -1, collaboratorId: '', status: LIISMAIIL_STATUS_ENUM.GUEST,
    flag: '', startDate: '', endDate: '',
    host: -1,
    password: '',
    country: ''
  },
  guestsPrisma: [{
    tokenId: -1, collaboratorId: '', status: LIISMAIIL_STATUS_ENUM.GUEST,
    flag: '', startDate: '', endDate: '',
    host: -1,
    country: ''
  }],
  guestsOnline: [{
    tokenId: -1, collaboratorId: '', status: LIISMAIIL_STATUS_ENUM.GUEST,
    flag: '', startDate: '', endDate: '',
    host: -1,
    country: ''
  }],
  hostsPrisma: [{
    tokenId: -1, collaboratorId: '', status: LIISMAIIL_STATUS_ENUM.GUEST,
    flag: '', startDate: '', endDate: '',
    host: -1,
    country: ''
  }],
}
const guestPrismaSlice = createSlice({
  name: 'guestPrisma',
  initialState: initialGuestState,
  reducers: {
    setGuestPrisma(state, action: PayloadAction<{ guestPrisma: GuestPrismaType }>) {
      state.guestPrisma = action.payload.guestPrisma
    },

    setGuestsPrisma(state, action: PayloadAction<{ guestsPrisma: GuestPrismaType[] }>) {
      state.guestsPrisma = action.payload.guestsPrisma
    },
    setGuestsOnLine(state, action: PayloadAction<{ guestsPrisma: GuestPrismaType[] }>) {
      state.guestsOnline = action.payload.guestsPrisma
    },

    setHostsPrisma(state, action: PayloadAction<{ hostsPrismas: GuestPrismaType[] }>) {
      state.hostsPrisma = action.payload.hostsPrismas
    },
    setGuestPrismaNull(state) {
      state.guestPrisma = initialGuestState.guestPrisma
    },
    logout(state) {
      state.guestPrisma = initialGuestState.guestPrisma
      
    },
  }
})

export const guestPrismaActions = guestPrismaSlice.actions
export default guestPrismaSlice.reducer
