import { combineReducers } from "redux";
import AdminSlice from "./adminSlice.js";

const reducer = combineReducers({
    adminReducer: AdminSlice.reducer
})

export default reducer