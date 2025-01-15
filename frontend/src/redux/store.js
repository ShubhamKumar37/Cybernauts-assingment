// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import flowReducer from './slices/flowSlice';

export const store = configureStore({
  reducer: {
    flows: flowReducer,
  },
});
