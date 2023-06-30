import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//=========================================== get data from api 
export const getAPIData = createAsyncThunk("note/displayData", async () => {
    try {
        const auth = localStorage.getItem("token")
        const { data } = await axios
        .get("https://shaban-hamdy-to-do-list-nodejs.vercel.app/note/getNote", {
            headers: { auth }
        })
        return data.note
        
    } catch (error) {
        console.log(error.response.data);
        
    }
})

//======================================= initialState
const initialState = {
    isLoading: false,
    error: "",
    data: [],
}
//====================================================== display Data
const displayData = createSlice({
    name: "displayData",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getAPIData.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(getAPIData.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error = ""
        })

        builder.addCase(getAPIData.rejected, (state, action) => {
            state.isLoading = false
            state.data = []
            state.error = action.error
        })

    }
})
//================================================================================================================================================

export default displayData.reducer