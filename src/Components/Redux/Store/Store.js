import { configureStore } from "@reduxjs/toolkit";
import displayData from "../APPSlice/displaySlice"
import deleteData from "../APPSlice/deleteSlice"
import addData from "../APPSlice/addToListSlice"
import updateDataSlice from "../APPSlice/addToListSlice"




const Store = configureStore({
    reducer:{
        displayData,
        deleteData,
        addData,
        updateDataSlice,
       
      
    }
})

export default Store