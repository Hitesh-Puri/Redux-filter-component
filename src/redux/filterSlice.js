import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minExp: null,
  companyName: "",
  location: "",
  remote: null,
  role: "",
  minBasePay: null,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setMinExp: (state, action) => {
      state.minExp = action.payload;
    },
    setCompanyName: (state, action) => {
      state.companyName = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setRemote: (state, action) => {
      state.remote = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setMinBasePay: (state, action) => {
      state.minBasePay = action.payload;
    },
  },
});

export const {
  setMinExp,
  setCompanyName,
  setLocation,
  setRemote,
  setRole,
  setMinBasePay,
} = filterSlice.actions;

export default filterSlice.reducer;
