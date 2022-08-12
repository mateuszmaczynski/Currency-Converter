import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
};

export const historySlice = createSlice({
  name: "transactionHistory",
  initialState,
  reducers: {
    addHistory: (state, action) => {
      state.history = [...action.payload];
    },
  },
});

export const { addHistory } = historySlice.actions;

export default historySlice.reducer;
