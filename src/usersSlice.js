import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
      value: []
    },
    reducers: {
      loadTenMore: (state, action) => {
        console.log(action.payload);
        state.value = action.payload;
      }
    }
  })

  export const { loadTenMore } = usersSlice.actions;

  export default usersSlice.reducer