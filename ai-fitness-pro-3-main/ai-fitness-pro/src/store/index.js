import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import fitnessReducer from './slices/fitnessSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    fitness: fitnessReducer,
  },
}); 