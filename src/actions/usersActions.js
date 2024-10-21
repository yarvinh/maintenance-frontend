import axios from 'axios'
import {token,verificationToken,removeLoginToken} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'
import { paths } from './actionsHelper'
import { userLoading, userReceived } from '../state/reducers/userReducers'
import { errorsOrMessagesReceived } from '../state/reducers/errorsOrMessagesReducer'
import { ERRORS } from '../componentsHelpers/errors'

export const userPostFetchAction = ( {payload,path,loading,reducer}) => {
  return async (dispatch) => {
    loading && dispatch(loading())
    try {
      const response = await axios.post(`${baseUrl()}${path}`,payload, {headers: token(), withCredentials: true,})
      const msg = response.data.errors_or_messages
      if (msg && response.data?.verification_session){
        dispatch(errorsOrMessagesReceived(msg)) 
        localStorage.setItem('token', response.data.token)
      }
      reducer && dispatch(reducer(response.data))
    } catch (error){
      loading && dispatch(loading())
      if(error.response?.data.errors_or_messages)
        dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
      else
        dispatch(errorsOrMessagesReceived(ERRORS))
    }
  }
}

export const fetchLogIn=(user,path)=> {
  return async (dispatch) => {
    dispatch(userLoading())
    try{
      const response = await axios.post(`${baseUrl()}${path}`,{user}, { withCredentials: true})
      const msg = response.data.errors_or_messages
      if (msg && response.data?.verification_session){
       dispatch(errorsOrMessagesReceived(msg)) 
       localStorage.setItem('token', response.data.token)
      }else{
        localStorage.setItem('token', response.data.token?.token)
        localStorage.setItem('secret_key', response.data.token?.secret_key)
      }
      dispatch(userReceived(response.data))
    }catch(error){
      if(error.response?.data.errors_or_messages)
        dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
      else
        dispatch(errorsOrMessagesReceived(ERRORS))
    }
    }
}

  export const fetchLogOut = () => {
    return async (dispatch) => {
      dispatch(userLoading())
      try{
        const response = await axios.delete(`${baseUrl()}/logout`, {headers: token(), withCredentials: true})
        removeLoginToken()
        dispatch(userReceived(response.data))
      }catch(err){
        dispatch(errorsOrMessagesReceived(ERRORS))
      }
    }

}

export const recoveryPassword=(user)=> {
  const {username, path} = user
  return async (dispatch) => {
    dispatch(userLoading)
    try{
      const response = await axios.post(`${baseUrl()}${path}`,{username}, {withCredentials: true, headers: verificationToken() })
      if(response.data.token){
        localStorage.setItem('token', response.data.token)
      }
      dispatch(userReceived(response.data))
    }catch(error){
      dispatch(userLoading())
      dispatch(errorsOrMessagesReceived(ERRORS))
    }
  }
}

export const recoveryUsername=(user)=> {
  return async (dispatch) => {
    dispatch(userLoading())
    try{
      const response = await axios.post(`${baseUrl()}/forgot_username`,{user}, {withCredentials: true})
      const msg = response.data.errors_or_messages
      if(msg)
        dispatch(errorsOrMessagesReceived(msg))
      dispatch(userReceived(response.data))
        
    }catch(error){
      if(error.response?.data.errors_or_messages)
        dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
      else
        dispatch(errorsOrMessagesReceived(ERRORS))
    }
  }
}

export const resetUserPassword = ({user,path}) => {
  return async (dispatch) => {
      dispatch(userLoading())
      try{
        const response = await axios.patch(`${baseUrl()}/${path}`,{user} ,{withCredentials: true, headers: verificationToken()})
        if (response.data.updated)
          removeLoginToken()
        const msg = response.data.errors_or_messages
        if(msg)
          dispatch(errorsOrMessagesReceived(msg))
        dispatch(userReceived(response.data))
      }catch(error){
        if(error.response?.data.errors_or_messages)
        dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
      else
        dispatch(errorsOrMessagesReceived(ERRORS))
      }
  }
}

export const verifyEmail = (params) => {
  return async (dispatch) => {
      dispatch(userLoading())
      try {
        const response = await axios.patch(`${baseUrl()}${paths().verifyEmail}`,params, {withCredentials: true, headers: verificationToken()})
        if(response.data.updated){
          localStorage.removeItem('token')
          localStorage.setItem('token', response.data.token?.token)
          localStorage.setItem('secret_key', response.data.token?.secret_key) 
        }
        dispatch(userReceived(response.data))
      } catch(error) {
        dispatch(userLoading())
        if(error.response?.data.errors_or_messages){
          dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
         } else{
          dispatch(errorsOrMessagesReceived(ERRORS))
         }
      }
  }
}



export const requestSecurityCode = () => { 
  return async (dispatch) => {
      dispatch(userLoading())
      try {
        const response = await axios.patch(`${baseUrl()}/request_security_code`, "request_security_code", {headers: verificationToken(),withCredentials: true})    
        if(!response.data.valid_email && response.data.token){
          const msg = response.data.errors_or_messages
          dispatch(errorsOrMessagesReceived(msg)) 
          localStorage.setItem('token', response.data.token)
        }
        dispatch(userReceived(response.data))
      } catch(error) {
        dispatch(userLoading())
        if(error.response?.data.errors_or_messages){
          dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
        } else{
          dispatch(errorsOrMessagesReceived(ERRORS))
        }
      }
  }
}

// export const setAccountType = (action)=>{
//   return (dispatch) => {
//     dispatch(accountReceived(action))
//   } 
// }



