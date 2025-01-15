// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import flowReducer from './slices/flowSlice';
import nodeReducer from './slices/nodeSlice';

export const store = configureStore({
  reducer: {
    flows: flowReducer,
    nodes: nodeReducer
  },
});
