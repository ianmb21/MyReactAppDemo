import { combineReducers } from "redux";
import { employee } from "./employee";
import { userLogin } from "./login";

export const reducers = combineReducers({
    employee, userLogin
})