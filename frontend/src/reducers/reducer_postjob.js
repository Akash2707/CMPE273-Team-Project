const initialStore = {
    jobForm: {},
    jobAdded: false
}

export default function(state = initialStore,action){
    if(action.type === "POSTJOBFORM"){
        return {
            ...state,
            jobForm: action.payload
        }
    }
    if(action.type === "ADDJOB" && action.payload.status == 200){
        return {
            ...state,
            jobAdded : true
        }
    }
    if(action.type === "ADDJOB" && action.statusCode == 400){
        return {
            ...state,
            jobAdded : false
        }
    }
    if(action.type === "EDITJOB" && action.payload.status == 200){
        return {
            ...state,
            jobAdded : true
        }
    }
    if(action.type === "EDITJOB" && action.statusCode == 400){
        return {
            ...state,
            jobAdded : false
        }
    }
    
    return state;
}