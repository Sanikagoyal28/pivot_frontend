import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import baseurl from "./BaseUrl.js";

const initialState = {
    loading: false,
    categories: [],
    ques_count: 0,
}

const CategoryThunk = createAsyncThunk("category", async (data) => {
    return await baseurl.get("category/get_category", data)
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})

const QuestionThunk = createAsyncThunk("question", async ({ category, difficulty }) => {
    return await baseurl.get(`user/num_of_ques/${category}/${difficulty}`)
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})

const CategorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        clearCategoryRedux: (state, action) => {
            state.categories = []
            state.ques_count = 0
        },
    },
    extraReducers: (builder) => {
        builder.addCase(CategoryThunk.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(CategoryThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload.data.msg
            state.categories = action.payload.data.categories
        })
        builder.addCase(CategoryThunk.rejected, (state, action) => {
            state.loading = false;
        })
        builder.addCase(QuestionThunk.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(QuestionThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.msg = action.payload.data.msg
            state.ques_count = action.payload.data.num_of_ques
        })
        builder.addCase(QuestionThunk.rejected, (state, action) => {
            state.loading = false;
        })
    }
})

export { CategoryThunk, QuestionThunk }
export const { clearCategoryRedux } = CategorySlice.actions
export default CategorySlice