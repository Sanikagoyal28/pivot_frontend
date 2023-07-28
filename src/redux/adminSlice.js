import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import baseurl from "./BaseUrl.js";

const initialState = {
    loading: false,
    questions: [],
    msg: '',
    count: 0,
    answers: []
}

const AdminThunk = createAsyncThunk("admin", async (data) => {
    return await baseurl.post("start_survey", data)
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})

const AdminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
    },
    extraReducers:(builder)=>{
        builder.addCase(AdminThunk.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(AdminThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload.data.msg
            state.questions = action.payload.data.questions
        })
        builder.addCase(AdminThunk.rejected, (state, action) => {
            state.loading = false;
        })
    }
})

export { AdminThunk }
export default AdminSlice