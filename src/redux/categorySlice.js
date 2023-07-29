import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import baseurl from "./BaseUrl.js";

const initialState = {
    loading: false,
    categories: []
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


const CategorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
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
    }
})

export { CategoryThunk }
export default CategorySlice