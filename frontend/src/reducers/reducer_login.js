const initialStore = {
    loginflag : false,
    message : "",
    token : "",
    status : false,
    data : [],
    signflag : false,
    recruiter : false
}

export default function(state = initialStore,action) {
   
    if(action.type === "LOGIN" && action.statusCode === 200){
    //    console.log("token" +action.payload.token);
    //    console.log(" payload 200 login : " + action.payload)
    //   console.log(' recruiter :', action.payload.isRecruiter)
    //    console.log(' success flag : ', action.payload.success)
        return {
            ...state,
           loginflag : action.payload.success,
           recruiter: action.payload.isRecruiter,
           data : action.payload.reply,
           message : action.payload.message
        }
    }
    if(action.type === "LOGIN" && action.statusCode === 400){
    //    console.log(" payload 400 login : " + action.payload) 
    //     console.log(action.payload.success)
        return {
            ...state,
            loginflag : action.payload.success,
            message : action.payload.message 
        }
    }

    if(action.type === "SIGNUP" && action.statusCode === 200){
     //   console.log(" payload 200 signup : " + action.payload)
     //   console.log(" success flag ", action.payload.success)
        return {
            ...state,
            signflag : action.payload.success,
            message : action.payload.message,

        }
    }
    if(action.type === "SIGNUP" && action.statusCode === 400){
    //    console.log(" payload 400 signup : " + action.payload)
    //    console.log(action.payload.success)
        return {
            ...state,
            signflag: action.payload.success,
            message : action.payload.message 
        }
    }
    return state;
}

