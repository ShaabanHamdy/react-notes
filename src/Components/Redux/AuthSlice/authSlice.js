import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



const get = createAsyncThunk("note/auth", () => {
const token = localStorage.get("token")
return token
})

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        isLoading: false,
        Data: "",
        error: ""
    },
    extraReducers : (builder)=>{
         builder.addCase(get.pending,(state)=>{
            state.isLoading = true
            state.error = ""
         })   
         builder.addCase(get.fulfilled,(state,action)=>{
            state.isLoading = false
            state.Data = action.payload
            state.error = ""
         })   
    }

})
export default authSlice.reducer