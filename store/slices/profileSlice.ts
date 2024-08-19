import { Address, EnrollmentType, ProfileTypeData } from '@/api/graphql/profile/profile.types';
import { CoordsType, PROFILE_STATUS_ENUM } from '@/api/graphql/viewer/viewer.types';
import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';


export type ProfileStateType = {
  isLoggedIn?: boolean;
  isAdmin?: boolean;
  friendRequests?: { token: string; profileEmail: string; profileId: string; flag: string }[];
  friendFound?: { token: string; profileEmail: string; profileId: string; flag: '' };
  liismaiilProfiles: ProfileTypeData[],
  hostToken: number,
  country: string,
  profileAuth: {
    _id: string;
    email: string;
    token: string;
  };
  profile: {
    login?: string;
    phone?: string;
  };
  status: PROFILE_STATUS_ENUM;
  flagTokenContext: { flag: string; token: string };
  coords?: CoordsType;
  addressGeo?: string;
  orders?: [
    {
      products: [
        {
          title: string;
          price: number;
          quantity: number;
          promo: number;
        }
      ];
      price: number;
      delivery: {
        startDate: string;
        endDate: string;
      };
      total: number;
      date: string;
    }
  ];
  newEnrollment?: EnrollmentType;
  enrollments?: EnrollmentType[];

  validCheckout?: boolean;
  productsPromoted?: [
    {
      titleSlug: string;
      selectionSlug: string;
    }
  ];
  organisatorProfiles: [
    {
      token: string;
      flag: string;
    }
  ];
  collaboratorProfiles: [
    {
      token: string;
      flag: string;
    }
  ];
  guestProfiles: [
    {
      token: string;
      flag: string;
    }
  ];
  discountProfiles: [
    {
      token: string;
      flag: string;
    }
  ];

  deliveruProfile: [
    {
      token: string;
      flag: string;
    }
  ];

  address?: Address;
  messages?: [
    {
      profileId: string;
      product: string;
      subject: string;
      content: string;
      collaboratorEmail: string;
    }
  ];
  accessRecaptcha: string;
  firebasePhotoUrl: string;
  products: string[];
};

export const initialProfileState: ProfileStateType = {
  isLoggedIn: false,
  products: [''],
  isAdmin: false,
  hostToken: 0,
  country: 'New Zealand',


  accessRecaptcha: '',
  friendRequests: [{ token: '', profileEmail: '', profileId: '', flag: '' }],
  friendFound: { token: '', profileEmail: '', profileId: '', flag: '' },
  profileAuth: {
    _id: '', //:'O6cKgXEsuPNAuzCMTGeblWW9sWI3', //
    email: '', //'kazdhicham@gmail.com',
    token: ''
  },
  profile: {
    login: '', //'hichamkaz nouveau login',
    phone: '' // '02992882',
  },
  status: PROFILE_STATUS_ENUM.USER,
  flagTokenContext: {
    flag: '',
    token: ''
  },
  selectedEvent: {
    id: '',
    title: '',
    content: '',
    startDate: '',
    endDate: '',
    status: PROFILE_STATUS_ENUM.LIIS,
    contact: ''
  },
  orders: [
    {
      products: [
        {
          title: '',
          price: 0,
          quantity: 0,
          promo: 0
        }
      ],
      price: 0,
      delivery: {
        startDate: '',
        endDate: ''
      },
      total: 0,
      date: ''
    }
  ],


  validCheckout: false,
  productsPromoted: [
    {
      titleSlug: '',
      selectionSlug: ''
    }
  ],
  organisatorProfiles: [
    {
      token: '',
      flag: ''
    }
  ],
  collaboratorProfiles: [
    {
      token: '',
      flag: ''
    }
  ],
  guestProfiles: [
    {
      token: '',
      flag: ''
    }
  ],
  discountProfiles: [
    {
      token: '',
      flag: ''
    }
  ],
  liismaiilProfiles: [
    {
      token: '',
      flag: ''
    }
  ],
  deliveruProfile: [
    {
      token: '',
      flag: ''
    }
  ],
  events: [
    {
      id: '',
      title: '',
      content: '',
      startDate: '',
      endDate: '',
      status: 'LIIS',
      contact: ''
    }
  ],
  address: {
    name: '', //'kazd hi',
    destination: '', //'la marine',
    building: '', //'Bat E4',
    street: '', //'121 chemin de sainte',
    state: '', // 'france',
    contact: '', //'moi',
    isdefault: false,
    city: '', //'marseille',
    country: '', // 'france',
    zip: '' //'13014',
  },
  messages: [
    {
      profileId: '',
      product: '',
      subject: '',
      content: '',
      collaboratorEmail: ''
    }
  ],
  firebasePhotoUrl: '',

};
const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfileState,
  reducers: {
    setProfileAuth(
      state,
      action: PayloadAction<{
        _id: string;
        email: string;
        token: string;
      }>
    ) {
      console.log({ _id: action.payload._id, email: action.payload.email, token: action.payload.token });
      state.profileAuth = { _id: action.payload._id, email: action.payload.email, token: action.payload.token };
    },
    setAccessRecaptcha(state, action: PayloadAction<{ accessRecaptcha: string }>) {
      state.accessRecaptcha = action.payload.accessRecaptcha;
    },
    setProfile(
      state,
      action: PayloadAction<{
        login: string;
        phone: string;
      }>
    ) {
      state.profile = { login: action.payload.login, phone: action.payload.phone };
    },
    setLiismaiilProfiles(
      state,
      action: PayloadAction<{ profiles: ProfileTypeData[] }>
    ) {
      state.liismaiilProfiles = action.payload.profiles;
    },
    setCountry(state, action: PayloadAction<{ country: string }>) {
      state.country = action.payload.country;
    },

    setHostToken(state, action: PayloadAction<{ hostToken: number }>) {
      state.hostToken = action.payload.hostToken;
    },
    setProfileAddress(state, action: PayloadAction<{ address: Address }>) {
      state.address = action.payload.address;
    },
    setFirebasePhotoUrl(state, action: PayloadAction<{ photo: string }>) {
      state.firebasePhotoUrl = action.payload.photo;
    },
    setStatus(state, action: PayloadAction<{ status: PROFILE_STATUS_ENUM }>) {
      state.status = action.payload.status;
    },
    setFlagTokenContext(
      state,
      action: PayloadAction<{
        flagToken: { flag: string; token: string };
      }>
    ) {
      state.flagTokenContext = action.payload.flagToken;
    },
    setValidCheckout(state, action: PayloadAction<{ validCheckout: boolean }>) {
      state.validCheckout = action.payload.validCheckout;
    },
    subscribeEnrollment(state, action: PayloadAction<{ enrollment: EnrollmentType }>) {
      state.newEnrollment = action.payload.enrollment;
    },
    subscribeStatus(state, action: PayloadAction<{ status: PROFILE_STATUS_ENUM }>) {
      state.status = action.payload.status;
    },
    setEnrollments(state, action: PayloadAction<{ enrollments: EnrollmentType[] }>) {
      state.enrollments = action.payload.enrollments;
    },

    addFriendRequest(state, action: PayloadAction<{ request: { token: ''; profileEmail: ''; profileId: ''; flag: '' } }>) {
      if (state.friendRequests && state.friendRequests.length > 0 && state.friendRequests[0]['profileEmail'] !== '') {
        state.friendRequests = [action.payload.request];
      } else if (typeof state.friendRequests !== 'undefined') {
        state.friendRequests = [...state.friendRequests, action.payload.request];
      }
    },
    signOut(state) {
      console.log({ current: current(state).profileAuth });
      return { ...initialProfileState };
    }
  }
});

// Action creators are generated for each case reducer function
export const profileActions = profileSlice.actions;

export default profileSlice.reducer;
