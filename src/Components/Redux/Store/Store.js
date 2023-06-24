import { configureStore } from "@reduxjs/toolkit";
import displayData from "../APPSlice/displaySlice"
import deleteData from "../APPSlice/deleteSlice"
import addData from "../APPSlice/addToListSlice"
import updateDataSlice from "../APPSlice/addToListSlice"
import authSlice from "../AuthSlice/authSlice";
import LoginData from "../APPSlice/loginSlice";




const Store = configureStore({
    reducer:{
        displayData,
        deleteData,
        addData,
        updateDataSlice,
        authSlice,
        LoginData
    }
})

export default Store