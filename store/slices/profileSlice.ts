import { CoordsType } from '@/api/graphql/profile/profile.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type CollaboratorProfileType = {
  name?: string;
  description?: string;
  email?: string;
  phone?: string;
  tokenId: number;
  flag: string;
  coords?: CoordsType;
  addressGeo?: string;
}


export type ProfileStateType = {

  collaboratorProfiles: CollaboratorProfileType[];
};

export const initialProfileState: ProfileStateType = {

  collaboratorProfiles: [
    {
      tokenId: -1,
      flag: ''
    }
  ],

};
const profileSlice = createSlice({
  name: 'profile',
  initialState: initialProfileState,
  reducers: {

    setCollaboratorProfiles(
      state,
      action: PayloadAction<{ profiles: CollaboratorProfileType[] }>
    ) {
      state.collaboratorProfiles = action.payload.profiles;
    },

  }
});

// Action creators are generated for each case reducer function
export const profileActions = profileSlice.actions;

export default profileSlice.reducer;
