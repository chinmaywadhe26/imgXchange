import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import navSlice from "./slices/navSlice"
import postsSlice from "./slices/PostSlice"
import orderSlice from './slices/orderSlice'
export const store = configureStore({
    reducer:{
        auth: authSlice,
        nav: navSlice,
        posts: postsSlice,
        order: orderSlice,
    },
})