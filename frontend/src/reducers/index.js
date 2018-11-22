import { combineReducers } from "redux";
import MainReducer from "./reducer_login"
import { reducer as formReducer } from "redux-form";
import jobApplication from "./reducer_jobapply"
import PostJobReducer from "./reducer_postjob";

const rootReducer = combineReducers({

    jobApplyReducer: jobApplication,
    mainReducer : MainReducer,
    form: formReducer,
    postJobReducer: PostJobReducer,

});

export default rootReducer;
