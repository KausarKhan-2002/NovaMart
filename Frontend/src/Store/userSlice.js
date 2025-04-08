import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,

  reducers: {
    getUserProfile: (state, action) => {
      return action.payload;
    },
    removeProfile: () => {
      return null;
    },
  },
});

export default userSlice.reducer;
export const { getUserProfile, removeProfile } = userSlice.actions;
