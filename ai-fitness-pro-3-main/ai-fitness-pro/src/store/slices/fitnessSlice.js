import { createSlice } from '@reduxjs/toolkit';

const fitnessSlice = createSlice({
  name: 'fitness',
  initialState: {
    userProfile: {
      weight: '',
      height: '',
      bodyShape: '',
    },
  },
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { setUserProfile } = fitnessSlice.actions;
export default fitnessSlice.reducer; 