import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,

  reducers: {
    getUserProfile: (state, action) => {
      return action.payload;
    },
  },
});

export default userSlice.reducer;
export const { getUserProfile } = userSlice.actions;
