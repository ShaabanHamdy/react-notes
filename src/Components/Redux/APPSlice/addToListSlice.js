import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const alertAddedDone = () => {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
    })
}
//=========================================== add data to api 
export const addToApi = createAsyncThunk("note/addToApi", async (user) => {
    alertAddedDone()
    try {
        const auth = localStorage.getItem("token")
        const data = await axios.post(
            "https://shaban-hamdy-to-do-list-nodejs.vercel.app/note/addNote",
            user,
            {
                headers: { auth },
            }
        );
        return user

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
const addData = createSlice({
    name: "addData",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(addToApi.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(addToApi.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload

            state.error = ""
        })

        builder.addCase(addToApi.rejected, (state, action) => {
            state.isLoading = false
            state.data = []
            state.error = action.error
        })

    }
})
//================================================================================================================================================

export default addData.reducer