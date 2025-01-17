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
      const index = state.flowList.findIndex(flow => flow._id === action.payload._id);
      if (index !== -1) {
        state.flowList[index] = action.payload;
      }
    },
    deleteFlow: (state, action) => {
      state.flowList = state.flowList.filter(flow => flow._id !== action.payload);
    },
    selectFlow: (state, action) => {
      state.selectedFlow = action.payload;
    },
    setFlows: (state, action) => {
      state.flowList = action.payload; // Set flows from API
    }
  },
});

export const { addFlow, updateFlow, deleteFlow, selectFlow, setFlows } = flowSlice.actions;
export default flowSlice.reducer;
