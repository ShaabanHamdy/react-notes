import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";



//======================================================================= delete From API
export const deleteFromAPI = createAsyncThunk("note/deleteData", async (id) => {

    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            try {
                const auth = localStorage.getItem("token")
                await axios
                    .delete(`https://shaban-hamdy-to-do-list-nodejs.vercel.app/note/deleteNote/${id}`, {
                        headers: { auth }
                    })
                return [id]

            } catch (error) {
                console.log(error.response.data);
            }
        }
    }
    )

})
//====================================================================== initialState

const initialState = {
    isLoading: false,
    error: "",
    data: [],
}

//===================================================================== delete Data slice 
const deleteData = createSlice({
    name: "deleteData",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(deleteFromAPI.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(deleteFromAPI.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.error = ""
        })
        builder.addCase(deleteFromAPI.rejected, (state, action) => {
            state.isLoading = false
            state.data = []
            state.error = action.error
        })

    }
})
export default deleteData.reducer