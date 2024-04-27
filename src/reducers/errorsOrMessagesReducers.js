export const messagesEndErrors = (state = { errorsOrMessages: {errors: [], msg:[]}, loading: false }, action)=>{
  switch(action.type) {
      case 'LOADING_ERRORS_OR_MESSAGES':
      return state = {
        ...state,
        errorsOrMessages: state.errorsOrMessages,
        loading: true,    
      }
  
      case 'ADD_ERRORS_OR_MESSAGES':
        return {
           ...state,
          errorsOrMessages: action.errorsOrMessages,
          loading: false
      } 
      case 'CLEARING_ERRORS_END_MESSAGES':
        return {
           ...state,
          errorsOrMessages: action.errorsOrMessages,
          loading: false
      } 
  
    default:
      return state;
    }
 }
  
  
export  const messageReducer = (state = { message: {}, loading: true }, action)=>{
    switch(action.type) {
      case 'LOADING_MESSAGE':
      return state = {
        ...state,
        message: state.message,
        loading: true,    
      }
  
      case 'MESSAGE':
        return {
           ...state,
          message: action.message,
          loading: false
      } 
  
    default:
      return state;
    }
}