import axios from 'axios'
import {token,verificationToken,removeLoginToken} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'
import { userLoading, userReceived } from '../state/reducers/userReducers'
import { errorsOrMessagesReceived } from '../state/reducers/errorsOrMessagesReducer'
import { ERRORS } from '../componentsHelpers/errors'
import { paths } from '../componentsHelpers/paths'

export const userPostFetchAction = ( {payload,path,loading,reducer}) => {
  return async (dispatch) => {
    loading && dispatch(loading())
    try {
      const response = await fetch(`${baseUrl()}${path}`,{method: "POST", headers: token(),  withCredentials: true, body: JSON.stringify(payload) })
      if (!response.ok) {
        const text = await response.text()
        throw new Error(text)
      }
      const data = await response.json()
      const msg = data.errors_or_messages
      if (msg && data.verification_session){
        dispatch(errorsOrMessagesReceived(msg)) 
        localStorage.setItem('token', data.token)
      }
      reducer && dispatch(reducer(data))

    } catch (error){
      loading && dispatch(loading())
      if(error.message.includes("errors_or_messages")){
        const data = JSON.parse(error.message)
        dispatch(errorsOrMessagesReceived(data.errors_or_messages))
      } else {
        dispatch(errorsOrMessagesReceived(ERRORS))
      }
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

// export const verifyEmail = (params) => {
//   return async (dispatch) => {
//       dispatch(userLoading())
//       try {
//         const response = await axios.patch(`${baseUrl()}${paths().verifyEmail}`,params, {withCredentials: true, headers: verificationToken()})
//         if(response.data.updated){
//           localStorage.removeItem('token')
//           localStorage.setItem('token', response.data.token?.token)
//           localStorage.setItem('secret_key', response.data.token?.secret_key) 
//         }
//         dispatch(userReceived(response.data))
//       } catch(error) {
//         dispatch(userLoading())
//         if(error.response?.data.errors_or_messages){
//           dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
//          } else{
//           dispatch(errorsOrMessagesReceived(ERRORS))
//          }
//       }
//   }
// }

export const verifyEmail = (payload) => {
  return async (dispatch) => {
    dispatch(userLoading())
    try {
      const response = await fetch(`${baseUrl()}${paths().verifyEmail}`, {
        method: "PATCH", 
        withCredentials: true, 
        headers: verificationToken(),
        body: JSON.stringify(payload)
      })

      if(!response.ok){
        const text = await response.text()
        throw new Error(text)
      }
      const data = await response.json()

      if(data.updated){
        localStorage.removeItem('token')
        localStorage.setItem('token', data.token?.token)
        localStorage.setItem('secret_key', data.token?.secret_key) 
      }
      dispatch(userReceived(data))
    }catch (error){
      dispatch(userLoading())
      if(error.message.includes("errors_or_messages")){
        const data = JSON.parse(error.message)
        dispatch(errorsOrMessagesReceived(data.errors_or_messages))
      } else {
        dispatch(errorsOrMessagesReceived(ERRORS))
      }
    }
  }
}

export const requestSecurityCode = () => { 

  return async (dispatch) => {
      dispatch(userLoading())
      
      try {
        const response = await axios.patch(`${baseUrl()}${paths().requestSecurityCode}`, "request_security_code", {headers: verificationToken(), withCredentials: true})   
        console.log(response.data,"testing") 
        // if(!response.data.valid_email && response.data.token){
        //   const msg = response.data.errors_or_messages
        //   dispatch(errorsOrMessagesReceived(msg)) 
        //   localStorage.setItem('token', response.data.token)
        // }
        // dispatch(userReceived(response.data))
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



