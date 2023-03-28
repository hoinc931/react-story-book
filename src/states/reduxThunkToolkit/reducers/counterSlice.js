import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counterSlice',
  initialState: {
    count: 1,
  },
  reducers: {
    increase: (state, { payload }) => ({
      ...state,
      count: payload,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { increase } = counterSlice.actions;

export default counterSlice.reducer;

// Action creators are generated for each case reducer function
// export const { testRedux } = counterSlice.actions;
