import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  openAddModal: boolean;
  user: null;
  token: string;
  idx: string | number;
  employeeId: string;
  deleteEmployeComment: number | string;
  openleft: boolean;
  openleftmessage: boolean;
  openEditOrDeleteModal: boolean;
  idxEditOrDelete: string | number;
  openmessageuser: boolean;
}
const tokens = localStorage.getItem("access_token");
const initialState: CounterState = {
  openAddModal: false,
  user: null,
  token: tokens ? tokens : "",
  idx: "",
  employeeId: "",
  deleteEmployeComment: "",
  idxEditOrDelete: "",
  openleft: false,
  openleftmessage: false,
  openEditOrDeleteModal: false,
  openmessageuser: true,
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
    setEmployeeId: (state, action: PayloadAction<string>) => {
      console.log(action.payload);

      state.employeeId = action.payload;
      console.log(state.employeeId);
    },
    setEmpoleeDeleteId: (state, action: PayloadAction<string | number>) => {
      state.deleteEmployeComment = action.payload;
    },
    setIdxEditOrDelete: (state, action: PayloadAction<string | number>) => {
      state.idxEditOrDelete = action.payload;
    },
    setopenLeft: (state, action: PayloadAction<boolean>) => {
      state.openleft = action.payload;
    },
    setopenLeftMessage: (state, action: PayloadAction<boolean>) => {
      state.openleftmessage = action.payload;
    },
    setOpenEditOrDeleteModal: (state, action: PayloadAction<boolean>) => {
      state.openEditOrDeleteModal = action.payload;
    },
    setOpenMessageUser: (state, action: PayloadAction<boolean>) => {
      state.openmessageuser = action.payload;
    },
  },
});

export default slice.reducer;
export const {
  openModal,
  logout,
  setIdx,
  setToken,
  setEmployeeId,
  setEmpoleeDeleteId,
  setopenLeft,
  setOpenEditOrDeleteModal,
  setOpenMessageUser,
  setIdxEditOrDelete,
  setopenLeftMessage,
} = slice.actions;
