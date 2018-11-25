import { combineReducers } from "redux";
import MainReducer from "./reducer_login"
import { reducer as formReducer } from "redux-form";
import jobApplication from "./reducer_jobapply"
import PostJobReducer from "./reducer_postjob";
import JobSearchReducer from "./reducer_jobsearch";

const rootReducer = combineReducers({

    jobApplyReducer: jobApplication,
    mainReducer : MainReducer,
    form: formReducer,
    postJobReducer: PostJobReducer,
    jobSearchReducer: JobSearchReducer,
});

export default rootReducer;
