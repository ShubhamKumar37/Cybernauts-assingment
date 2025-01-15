// redux/slices/flowSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flowList: [],
  selectedFlow: null,
};

const flowSlice = createSlice({
  name: 'flows',
  initialState,
  reducers: {
    addFlow: (state, action) => {
      state.flowList.push(action.payload);
    },
    updateFlow: (state, action) => {
      const index = state.flowList.findIndex(flow => flow.id === action.payload.id);
      if (index !== -1) {
        state.flowList[index] = action.payload;
      }
    },
    deleteFlow: (state, action) => {
      state.flowList = state.flowList.filter(flow => flow.id !== action.payload);
    },
    selectFlow: (state, action) => {
      state.selectedFlow = action.payload;
    },
  },
});

export const { addFlow, updateFlow, deleteFlow, selectFlow } = flowSlice.actions;
export default flowSlice.reducer;
