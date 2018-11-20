import { combineReducers } from "redux";
import reducerLogin from "./reducer_login"
import { reducer as formReducer } from "redux-form";
import jobApplication from "./reducer_jobapply"


const rootReducer = combineReducers({
    login : reducerLogin,
    form: formReducer,
    jobApplyReducer: jobApplication
});

export default rootReducer;

