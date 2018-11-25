const initialStore = {
    searchRequest : {},
    searchJobList : [],
    searchJobPageCount: 0
}

const reducerJobApply = (state = initialStore,action) => {
    if(action.type === "JOBSEARCH"){
        
        return {
            ...state,
            searchRequest : action.payload,
        }
    }
    if(action.type === "SEARCHJOBRESPONSE" && action.statusCode == 200){
        console.log(action.payload.jobs)
        return {
            ...state,
            searchJobList : action.payload.jobs,
            searchJobPageCount: action.payload.totalPages
        }
    }
    if(action.type === "SEARCHJOBRESPONSE" && action.statusCode == 400){
        return {
            ...state,
            searchJobList : [],
        }
    }
    return state;
}

export default reducerJobApply;