import { combineReducers } from "redux";
import AdminSlice from "./adminSlice.js";
import CategorySlice from "./categorySlice.js";
import UserSlice from "./userSlice.js";

const reducer = combineReducers({
    adminReducer: AdminSlice.reducer,
    categReducer: CategorySlice.reducer,
    userReducer : UserSlice.reducer
})

export default reducer