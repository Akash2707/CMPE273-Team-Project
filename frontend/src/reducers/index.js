import { combineReducers } from "redux";
import reducerLogin from "./reducer_login"


const rootReducer = combineReducers({
    login : reducerLogin,
});

export default rootReducer;

