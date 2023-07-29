import { combineReducers } from "redux";
import AdminSlice from "./adminSlice.js";
import CategorySlice from "./categorySlice.js";

const reducer = combineReducers({
    adminReducer: AdminSlice.reducer,
    categReducer: CategorySlice.reducer,
})

export default reducer