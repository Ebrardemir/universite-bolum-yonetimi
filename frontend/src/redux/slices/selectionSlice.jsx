import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedClass: null,
  selectedTerm: null,
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    setSelectedClass(state, action) {
      state.selectedClass = action.payload;
    },
    setSelectedTerm(state, action) {
      state.selectedTerm = action.payload;
    },
    resetSelection(state) {
      state.selectedClass = '';
      state.selectedTerm = '';
    }
  },
});

export const {
  setSelectedClass,
  setSelectedTerm,
  resetSelection
} = selectionSlice.actions;

export default selectionSlice.reducer;
