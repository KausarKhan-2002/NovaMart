import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
  name: "toggleSlice",
  initialState: { theme: "l", language: "eng" },
  reducers: {
    themeSwitcher: (state, action) => {
      return { ...state, theme: action.payload };
    },

    languageSwitcher: (state, action) => {
      return { ...state, language: action.payload };
    },
  },
});

export default toggleSlice.reducer;
export const { themeSwitcher, languageSwitcher } = toggleSlice.actions;