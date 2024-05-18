
import {  BookingType, ConnexionType, EventTypeData, 
  PROFILE_STATUS_ENUM,ViewerTypeData} from '@/api/viewer/viewer.types'
import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { CoordsType } from './guestSlice';

export type ViewerStateType = {
  liismaiilViewer: ViewerTypeData,
  organisationsContext: ViewerTypeData[],
  guestProfiles: ConnexionType[],
  liismaiilProfiles: ConnexionType[],
  organisatorProfiles: ConnexionType[],
  libraryProfiles: ConnexionType[],
  selectedEvent: EventTypeData,
  bookings: BookingType[],
coords: CoordsType,
  addressGeo: string,
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

    events: [{
      id: '',
      title: '',
      content: '',
      addressGeo: '',
      startDate: '',
      endDate: '',
      status: PROFILE_STATUS_ENUM.ORGA,
      contact: '',
    }],
    cha3bi: -1,
  bookings:[{
    bookingStartDate: '',
    bookingEndDate: ''
    }],

  guestProfiles: [{
    token: '', profileEmail: '', title: '', profileId: '', price: -1,
    flag: '', startDate: '', endDate: '', status: PROFILE_STATUS_ENUM.GUEST
  }],
  liismaiilProfiles: [{
    token: '', profileEmail: '', title: '', profileId: '', price: -1,
    flag: '', startDate: '', endDate: '', status: PROFILE_STATUS_ENUM.LIISIL
  }],
  organisatorProfiles: [{
    token: '', profileEmail: '', title: '', profileId: '', price: -1,
    flag: '', startDate: '', endDate: '', status: PROFILE_STATUS_ENUM.ORGA
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
  organisationsContext :[], 
  guestProfiles:[],
  liismaiilProfiles:[],
  organisatorProfiles:[],
  libraryProfiles:[],
  bookings:[], 
  selectedEvent:{
    contact:'',
    content:'',
    endDate:'',
    id:'',
    startDate:'',
    status:PROFILE_STATUS_ENUM.USER,
    title:'',
    addressGeo:''},
    coords:{lat:0,long:0},
    addressGeo:'',
  }

const viewerSlice = createSlice({
  name: 'viewer',
  initialState: initialViewerState,
  reducers: {
    setOrganisations(state, action: PayloadAction<{ organisations: ViewerTypeData[]}>) {
      state.organisationsContext = action.payload.organisations
    },
    setViewer(state, action: PayloadAction<{ viewer: ViewerTypeData }>) {
      state.liismaiilViewer = action.payload.viewer
    },
    setGuestProfiles(state, action: PayloadAction<{ guestProfiles: ConnexionType[] }>) {
      state.guestProfiles = action.payload.guestProfiles
    },
    setLiismaiilProfiles(state, action: PayloadAction<{ liismaiilProfiles: ConnexionType[] }>) {
      state.liismaiilProfiles = action.payload.liismaiilProfiles
    },
    setOrganisatorProfiles(state, action: PayloadAction<{ organisatorProfiles: ConnexionType[] }>) {
      state.organisatorProfiles = action.payload.organisatorProfiles
    },
    setLibraryProfiles(state, action: PayloadAction<{ libraryProfiles: ConnexionType[] }>) {
      state.libraryProfiles = action.payload.libraryProfiles
    },

    setSelectedEvent(state, action: PayloadAction<{ selectedEvent: EventTypeData }>) {
      state.selectedEvent = action.payload.selectedEvent
    },
    setCoords(state, action: PayloadAction<{ coords: CoordsType }>) {
      state.coords = action.payload.coords
    },
    setAddressGeo(state, action: PayloadAction<{ addressGeo: string }>) {
      state.addressGeo = action.payload.addressGeo
    }
  }
})

export const viewerActions = viewerSlice.actions
export default viewerSlice.reducer
