import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  openAddModal: boolean;
  valueSelect: object;
  company: string;
  showVacansy: boolean;
  spets: string;
  user: null;
  token: string;
}
let tokens = localStorage.getItem("access_token");
const initialState: CounterState = {
  openAddModal: false,
  valueSelect: {},
  company: "",
  showVacansy: false,
  spets: "",
  user: null,
  token: tokens ? tokens : "",
};

export const slice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<boolean>) => {
      state.openAddModal = action.payload;
    },
    handleValue: (state, action: PayloadAction<object>) => {
      state.valueSelect = action.payload;
    },
    logout: () => initialState,
    setShowVacansy: (state, action: PayloadAction<boolean>) => {
      state.showVacansy = action.payload;
    },
    setCompany: (state, action: PayloadAction<string>) => {
      state.company = action.payload;
    },
    setSpets: (state, action: PayloadAction<string>) => {
      state.spets = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export default slice.reducer;
export const {
  openModal,
  handleValue,
  setSpets,
  logout,
  setShowVacansy,
  setCompany,
  setToken,
} = slice.actions;
