import { combineReducers } from "redux";
import MainReducer from "./reducer_main"
import { reducer as formReducer } from "redux-form";


const rootReducer = combineReducers({
    mainReducer : MainReducer,
    form: formReducer
});

export default rootReducer;

