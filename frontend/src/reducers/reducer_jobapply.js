
const initialStore = {
    saveApplicationFlag : false,
    message : "",
    jobApplied: false,
    easyApplyForm: {},
    jobSaved: false
}

const reducerJobApply = (state = initialStore,action) => {
    if(action.type === "SUBMITAPPLICATION" && action.statusCode == 200){
        
        return {
            ...state,
             message : action.payload.message,
             jobApplied: true
        }
    }
    if(action.type === "SUBMITAPPLICATION" && action.statusCode == 400){
        return {
            ...state,
            message : action.payload.message ,
            jobApplied: false
        }
    }
    if(action.type === "SAVEAPPLICATION"){
        return {
            ...state,
            saveApplicationFlag:true
            
        }
    }
    if(action.type === "EASYAPPLY" && action.statusCode == 200){
        
        return {
            ...state,
            jobApplied : true,
        }
    }
    if(action.type === "EASYAPPLY" && action.statusCode == 400){
        return {
            ...state,
            jobApplied: false,
            message : action.payload.message 
        }
    }
    if(action.type === "SAVEJOB" && action.statusCode == 200){
        
        return {
            ...state,
            jobSaved : true,
        }
    }
    if(action.type === "SAVEJOB" && action.statusCode == 400){
        return {
            ...state,
            jobSaved: false,
            message : action.payload.message 
        }
    }
    return state;
}

export default reducerJobApply;