import { configureStore } from "@reduxjs/toolkit";
import { perPageSlice } from "./perPageSlice";
import { usersSlice } from "./usersSlice";

export const store =  configureStore({
    reducer:{
        users: usersSlice.reducer,
        perPage: perPageSlice.reducer
    }
})