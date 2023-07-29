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

const LoginThunk = createAsyncThunk("admin", async (data) => {
    return await baseurl.post("admin/login", data)
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})

const AddQuestionThunk = createAsyncThunk("add_question", async (data) => {
    const accessToken =localStorage.getItem("token")
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return await baseurl.post("admin/add_question", data, config)
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
        builder.addCase(LoginThunk.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(LoginThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload.data.msg
        })
        builder.addCase(LoginThunk.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(AddQuestionThunk.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(AddQuestionThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload.data.msg
        })
        builder.addCase(AddQuestionThunk.rejected, (state, action) => {
            state.loading = false;
        })
    }
})

export { LoginThunk , AddQuestionThunk}
export default AdminSlice