import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import baseurl from "./BaseUrl.js";

const initialState = {
    loading: false,
    questions: [],
    ques_count: 1,
    correct_ans: 0,
    results:[]
}

const GetQuestionThunk = createAsyncThunk("questionn", async (data) => {
    return await baseurl.get(`user/questions/${data.category}/${data.difficulty}/${data.num_of_ques}`)
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})

const SubmitThunk = createAsyncThunk("submit", async (data) => {
    return await baseurl.post("user/submit", data)
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})

const DashboardThunk = createAsyncThunk("dashboard", async (category) => {
    // console.log(category, difficulty)
    return await baseurl.get(`user/dashboard/${category}`)
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})

const SortThunk = createAsyncThunk("dashboard/sort", async (data) => {
    console.log(data)
    return await baseurl.get(`user/dashboard/${data.category}/${data.difficulty}`)
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})

const UserSlice = createSlice({
    name: "question",
    initialState,
    reducers: {
        increment: (state, action) => {
            state.ques_count = state.ques_count + 1
        },
        decrement: (state, action) => {
            state.ques_count = state.ques_count - 1
        },
        increment_correct_ans: (state, action) => {
            state.correct_ans = state.correct_ans + 1
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetQuestionThunk.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(GetQuestionThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload.data.msg
            state.questions = action.payload.data.questions
        })
        builder.addCase(GetQuestionThunk.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(SubmitThunk.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(SubmitThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload.data.msg
        })
        builder.addCase(SubmitThunk.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(DashboardThunk.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(DashboardThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload.data.msg
            state.results = action.payload.data.results
        })
        builder.addCase(DashboardThunk.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(SortThunk.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(SortThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload.data.msg
            state.results = action.payload.data.results
        })
        builder.addCase(SortThunk.rejected, (state, action) => {
            state.loading = false;
        })
    }
})

export { GetQuestionThunk, SubmitThunk, DashboardThunk, SortThunk }
export default UserSlice
export const { increment, decrement, increment_correct_ans } = UserSlice.actions