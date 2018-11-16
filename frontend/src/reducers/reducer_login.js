
const initialStore = {
    authFlag : false,
    message : "",
    token : "",
    status : false
}

const reducerLogin = (state = initialStore,action) => {
    if(action.type === "LOGIN" && action.statusCode == 200){
        console.log("token" +action.payload.token);
        return {
            ...state,
            authFlag : action.payload.success,
            message : action.payload.message,
        }
    }
    if(action.type === "LOGIN" && action.statusCode == 403){
        return {
            ...state,
            authFlag : action.payload.success,
            message : action.payload.message 
        }
    }
    if(action.type === "HOME"){
        return {
            ...state,
            status : true,
        }
    }
    return state;
}

export default reducerLogin;