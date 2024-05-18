// types
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MenuProps } from 'types/menu';
export type MenuProps = {
  selectedItem: [string],
  selectedID?: string,
  drawerOpen: boolean,
  dark: boolean
};
// initial state
const initialState: MenuProps = {
  selectedItem: ['dashboard'],
  countriesContext: ['DZ', 'MA', 'FR'],
  hostsContext: ['liismaiil'],
  hostContext: 'liismaiil',
  countryContext: 'FR',
  selectedID: null,
  drawerOpen: false,
  dark: false
};

// ==============================|| SLICE - MENU ||============================== //

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    activeItem(state, action) {
      state.selectedItem = action.payload;
    },

    activeID(state, action) {
      state.selectedID = action.payload;
    },

    openDrawer(state, action) {
      state.drawerOpen = action.payload;
    },
    setDark(state: MenuProps, action: PayloadAction<{ dark: boolean }>) {
      state.dark = action.payload.dark;
    },
    setCountry(state: MenuProps, action: PayloadAction<{ country: string }>) {
      state.countryContext = action.payload.country;
    },
    setHost(state: MenuProps, action: PayloadAction<{ host: string }>) {
      state.hostContext = action.payload.host;
    },
    setHosts(state: MenuProps, action: PayloadAction<{ hosts: [string] }>) {
      state.hostsContext = action.payload.hosts;
    },
    setCountries(state: MenuProps,
      action: PayloadAction<{ countries: string[] }>) {
      state.countriesContext = action.payload.countries;
    }
  }
});

export default menuSlice.reducer;

export const menuActions = menuSlice.actions;
