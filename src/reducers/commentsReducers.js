export const CommentsReducer=(state={comments: [],loading: false},action)=>{
    switch(action.type) {
      case 'LOADING_COMMENTS':
      return state = {
        ...state,
        comments: state.comments,
        loading: true,    
      }
      case 'ADD_COMMENTS':
        return {
           ...state,
          comments: action.comments,
          loading: false
      } 
    default:
      return state;
    }
}

export const commentReducer = (state = { comment: {}, loading: false }, action)=>{
    switch(action.type) {
      case 'LOADING_COMMENT':
      return state = {
        ...state,
        comment: state.comment,
        loading: true,    
      }
  
      case 'ADD_COMMENT':
        return {
           ...state,
          comment: action.comment,
          loading: false
      } 
  
    default:
      return state;
    }
}