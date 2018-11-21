import { combineReducers } from "redux";
import reducerLogin from "./reducer_login"
import { reducer as formReducer } from "redux-form";
import PostJobReducer from "./reducer_postjob";


const rootReducer = combineReducers({
    login : reducerLogin,
    form: formReducer,
    postJobReducer: PostJobReducer,
});

export default rootReducer;

