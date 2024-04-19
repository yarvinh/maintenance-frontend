export const receiptsReducer = (state = {receipts: [],loading: true, uploading: false},action)=>{
    switch(action.type) {
      case 'LOADING_RECEIPTS':
      return state = {
        ...state,
        receipts: state.receipts,
        loading: true,
        uploading: false   
      }

      case 'UP_LOADING_RECEIPTS':
        return state = {
          ...state,
          uploading: true    
      }

      case 'ADD_RECEIPTS':
        return {
           ...state,
          receipts: action.receipts,
          loading: false,
          uploading: false
      } 
    default:
      return state;
    }
}