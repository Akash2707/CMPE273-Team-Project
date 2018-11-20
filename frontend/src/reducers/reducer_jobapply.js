
const initialStore = {
    saveApplicationFlag : false,
    message : "",
}

const reducerJobApply = (state = initialStore,action) => {
    if(action.type === "SUBMITAPPLICATION" && action.statusCode == 200){
        
        return {
            ...state,
             message : action.payload.message,
        }
    }
    if(action.type === "SUBMITAPPLICATION" && action.statusCode == 403){
        return {
            ...state,
            message : action.payload.message 
        }
    }
    if(action.type === "SAVEAPPLICATION"){
        return {
            ...state,
            saveApplicationFlag:true
            
        }
    }
    return state;
}

export default reducerJobApply;