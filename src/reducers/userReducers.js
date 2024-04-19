import { combineReducers } from "redux";

export const UserReducer = (state = { user: {is_login: false, admin: false, user: {id: 0}}, loading: true, resetPasswordMode: false }, action) => {
    switch(action.type) {
          case 'LOADING_USER':
            return state ={
              ...state,
              user: state.user,
              loading: true,    
              resetPasswordMode: false
            }
   
            case 'ADD_USER':
              return {
                ...state,
                user: action.user,
                resetPasswordMode: action.user.reset_password_mode,
                loading: false
            } 
  
            default:
              return state;
      }
}

export const accountType = (state = {account: {business: false, text: "Login to business account"}},action)=>{
   switch(action.type){
    case 'ACCOUNT':
      return state = {

        account: action.account
      }

      default:
        return state;
      }
}

