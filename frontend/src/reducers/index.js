import { combineReducers } from "redux";
import reducerLogin from "./reducer_login"
import { reducer as formReducer } from "redux-form";


const rootReducer = combineReducers({
    login : reducerLogin,
    form: formReducer
});

export default rootReducer;

