import { bindActionCreators } from "redux";

export const receiptsReducer = (state = {}, action)=>{
    switch(action.type) {
      case 'ADD PATHS':
        return {
           ...state,
          paths: action.paths
      } 
    default:
      return state;
    }
}