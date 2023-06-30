import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";


//=========================================== add data to api 




export const updateAPI = createAsyncThunk("note/updateData", async (value) => {

    const auth = localStorage.getItem("token")
    const id = value.getId
    const userData = value.updateData
    
    Swal.fire({
        title: 'Are you sure That You Want to Update',
        icon: 'question',
        iconHtml: '؟',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showCancelButton: true,
        showCloseButton: true
      }).then(async(result)=>{
        if (result.isConfirmed) {

            try {
                const data = await axios.put(
                    `https://shaban-hamdy-to-do-list-nodejs.vercel.app/note/updateNote/${id}`,
                    userData,
                    {
                        headers: { auth },
                    }
                );
        
        
            } catch (error) {
                console.log(error.response.data);
            }            
        }
      })

})

//======================================= initialState
const initialState = {
    isLoading: false,
    error: "",
    data: [],
}
//====================================================== display Data
const updateDataSlice = createSlice({
    name: "updateDataSlice",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(updateAPI.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(updateAPI.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            console.log(state.data);
            state.error = ""
        })

        builder.addCase(updateAPI.rejected, (state, action) => {
            state.isLoading = false
            state.data = []
            state.error = action.error
        })

    }
})
//================================================================================================================================================

export default updateDataSlice.reducer