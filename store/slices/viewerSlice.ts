
import { GuestType } from '@/api/graphql/sprint/sprint.types';
import {
  BookingType,
  CoordsType,
  PROFILE_STATUS_ENUM, ViewerTypeData
} from '@/api/graphql/viewer/viewer.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ViewerStateType = {
  liismaiilViewer: ViewerTypeData,
  organisationsContext: ViewerTypeData[],
  organisationContext: ViewerTypeData,
  guests: GuestType[],
  bookings: BookingType[],
  coords: CoordsType,
  addressGeo: string,
  country: string,
}
export const initialViewerState: ViewerStateType = {
  liismaiilViewer: {
    _id: '', //'O6cKgXEsuPNAuzCMTGeblWW9sWI3',
    login: '', // 'hichamkaz',//
    uid: '', //'kazdhicham@gmail.com',//'',//
    bio: '',
    email: '', //'kazdhicham@gmail.com',//'',//
    password: '', //'kazdhicham@gmail.com',//'',//
    stripe_account_id: '',
    hasWallet: false,
    phone: '', //'0699307222',
    avatar: {
      public_id: '',
      url: '', //'https://res.cloudinary.com/liismaiil/image/upload/v1684173819/lami1a/viewer/1684173818811.jpg'
    },
    flagToken: { flag: '', token: '' },
    organisation: '', //'hichamkaz',//'',//
    status: PROFILE_STATUS_ENUM.ORGA, //PROFILE_STATUS.ADMIN,
    website: '',
    instagram: '',
    telegram: '',

    cha3bi: -1,
    bookings: [{
      bookingStartDate: '',
      bookingEndDate: ''
    }],

    guests: [{
      token: '', collaboratorId: '', enrollmentStatus: PROFILE_STATUS_ENUM.GUEST, stages: [''], price: -1,
      flag: '', startDate: '', endDate: '',
    }],
    coords: { long: 0, lat: 0 },
    addressGeo: '',
    contact: '',
    city: '',
    country: '',
    state: '',
    continent: '',
    rewards: [''],
  },
  organisationsContext: [],
  organisationContext: {
    _id: '', //'O6cKgXEsuPNAuzCMTGeblWW9sWI3',
    login: '', // 'hichamkaz',//
    uid: '', //'kazdhicham@gmail.com',//'',//
    bio: '',
    email: '', //'kazdhicham@gmail.com',//'',//
    password: '', //'kazdhicham@gmail.com',//'',//
    stripe_account_id: '',
    hasWallet: false,
    phone: '', //'0699307222',
    avatar: {
      public_id: '',
      url: '', //'https://res.cloudinary.com/liismaiil/image/upload/v1684173819/lami1a/viewer/1684173818811.jpg'
    },
    flagToken: { flag: '', token: '' },
    organisation: '', //'hichamkaz',//'',//
    status: PROFILE_STATUS_ENUM.ORGA, //PROFILE_STATUS.ADMIN,
    website: '',
    instagram: '',
    telegram: '',

    cha3bi: -1,
    bookings: [{
      bookingStartDate: '',
      bookingEndDate: ''
    }],

    guests: [{
      token: '', collaboratorId: '', enrollmentStatus: PROFILE_STATUS_ENUM.GUEST, stages: [''], price: -1,
      flag: '', startDate: '', endDate: '',
    }],
    coords: { long: 0, lat: 0 },
    addressGeo: '',
    contact: '',
    city: '',
    country: '',
    state: '',
    continent: '',
    rewards: [''],
  },

  guests: [{
    token: '', collaboratorId: '', enrollmentStatus: PROFILE_STATUS_ENUM.GUEST, stages: [''], price: -1,
    flag: '', startDate: '', endDate: '',
  }],
  bookings: [],
  coords: { lat: 0, long: 0 },
  country: 'FR',
  addressGeo: '',
}

const viewerSlice = createSlice({
  name: 'viewer',
  initialState: initialViewerState,
  reducers: {
    setOrganisations(state, action: PayloadAction<{ organisations: ViewerTypeData[] }>) {
      state.organisationsContext = action.payload.organisations
    },

    setOrganisation(state, action: PayloadAction<{ organisation: ViewerTypeData }>) {
      state.organisationContext = action.payload.organisation
    },

    setViewer(state, action: PayloadAction<{ viewer: ViewerTypeData }>) {
      state.liismaiilViewer = action.payload.viewer
    },
    setGuests(state, action: PayloadAction<{ guests: GuestType[] }>) {
      state.guests = action.payload.guests
    },
    setCoords(state, action: PayloadAction<{ coords: CoordsType }>) {
      state.coords = action.payload.coords
    },
    setCountry(state, action: PayloadAction<{ country: string }>) {
      state.country = action.payload.country
    },
    setAddressGeo(state, action: PayloadAction<{ addressGeo: string }>) {
      state.addressGeo = action.payload.addressGeo
    }
  }
})

export const viewerActions = viewerSlice.actions
export default viewerSlice.reducer
