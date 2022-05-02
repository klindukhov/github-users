import { createSlice } from "@reduxjs/toolkit";

export const perPageSlice = createSlice({
    name: 'perPage',
    initialState: {
      value: '10'
    },
    reducers: {
      incrementByTen: (state) => {
        state.value = parseInt(state.value) + 10;
      }
    }
  })
  export const { incrementByTen } = perPageSlice.actions;

  export default perPageSlice.reducer;