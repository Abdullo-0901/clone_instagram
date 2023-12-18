import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  openAddModal: boolean;
  user: null;
  token: string;
  idx: string | number;
}
let tokens = localStorage.getItem("access_token");
const initialState: CounterState = {
  openAddModal: false,
  user: null,
  token: tokens ? tokens : "",
  idx: "",
};
export const slice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<boolean>) => {
      state.openAddModal = action.payload;
    },
    logout: () => initialState,
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setIdx: (state, action: PayloadAction<string | number>) => {
      state.idx = action.payload;
    },
  },
});

export default slice.reducer;
export const { openModal, logout, setIdx, setToken } = slice.actions;
