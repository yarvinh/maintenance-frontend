import axios from 'axios'
import {token,verificationToken,removeLoginToken} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'

export const createUser =  (user) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING'})
        axios.post(`${baseUrl()}/users`, user, {headers:token(), withCredentials: true})
        .then(response => {
          const error = response.data.errors_or_messages
          if(response.data.created){
            localStorage.setItem('token', response.data.token)
          }
          dispatch({ type: 'ADD', user: response.data})
          error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}): dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: []})
      })
    }
}

  export const fetchLogOut = () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING'})
        axios.delete(`${baseUrl()}/logout`, {headers:token(),withCredentials: true})
        .then(response=> {
            dispatch({ type: 'ADD_USER', user: response.data })
            removeLoginToken()
        })
      }

  }

  export const fetchLogIn=(user,path)=> {
    return (dispatch) => {
      dispatch({ type: 'LOADING'})
        axios.post(`${baseUrl()}/${path}`, 
        {user}, {withCredentials: true})
        .then(response=> {
          const error = response.data.errors_or_messages
          if(response.data.is_login){
            localStorage.setItem('token', response.data.token?.token)
            localStorage.setItem('secret_key', response.data.token?.secret_key)
          }else if(!response.data.valid_email && response.data.token){
            localStorage.setItem('token', response.data.token)
          }
          dispatch({ type: 'ADD_USER', user: response.data})
          error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}): dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: []})//dispatch({ type: 'ADD_USER', user: response.data})
        })
  }
}

export const editUser = (params) => {
  return (dispatch) => {
      dispatch({type: "LOADING_USER"})
      axios.patch(`${baseUrl()}/users/${params.id}`, {user: params.user},{headers:token(), withCredentials: true})
      .then(response => {
          let errors = response.data.errors_or_messages
          errors ? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: errors}) :dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: []})   
          dispatch({ type: 'ADD_USER', user: response.data} )
      })
  }

}


export const recoveryPassword=(user)=> {
  const {username, path} = user
  return (dispatch) => {
    dispatch({ type: 'LOADING_ERRORS_OR_MESSAGES'})
      axios.post(`${baseUrl()}${path}`, 
     {username}, {withCredentials: true, headers: verificationToken() })
      .then(response=> {
        if(response.data.token){
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('account_type', response.data.account_type)
        }
        dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages})
      })
  }
}

export const recoveryUsername=(user)=> {
  return (dispatch) => {
    dispatch({ type: 'LOADING_ERRORS_OR_MESSAGES'})
      axios.post(`${baseUrl()}/forgot_username`, 
      {user}, {withCredentials: true})
      .then(response=> {
        dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages})
      })
}
}

export const resetUserPassword = ({user,path}) => {
  return (dispatch) => {
      dispatch({type: "LOADING_USER"})
      axios.patch(`${baseUrl()}/${path}`,{user} ,{withCredentials: true, headers: verificationToken()})
      .then(response => {
        if (response.data.updated){
          removeLoginToken()
        }
          let error = response.data.errors_or_messages
           error ? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}) : dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: []})
           dispatch({ type: 'ADD_USER', user: response.data})
      })
  }
}

export const verifyEmail = (params) => {
  return (dispatch) => {
      dispatch({type: "LOADING_USER"})
      axios.patch(`${baseUrl()}/verify_email`, params ,{withCredentials: true, headers: verificationToken()})
      .then(response => {
       let error = response.data.errors_or_messages
        if(response.data.updated){
          localStorage.removeItem('token')
          localStorage.setItem('token', response.data.token?.token)
          localStorage.setItem('secret_key', response.data.token?.secret_key)
        }else if (response.data.session_expired){
          removeLoginToken()
        }
        error ? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}) : dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: []})
        dispatch({ type: 'ADD_USER', user: response.data})
      })
  }
}

export const requestSecurityCode = () => { 
  return (dispatch) => {
      dispatch({ type: 'LOADING_USER'})
      axios.patch(`${baseUrl()}/request_security_code`, "request_security_code", {headers: verificationToken(),withCredentials: true})    
      .then(response => {
        if(!response.data.valid_email && response.data.token){
          localStorage.setItem('token', response.data.token)
        }
        const error = response.data.errors_or_messages
        dispatch({ type: 'ADD_USER', user: response.data})
        error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}): dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: []})
      })
      .catch(error => console.log('api errors:', error))
  }
}

export const setVerificationSession=()=>{
  return (dispatch) => {
    dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: ["We must verify your email first to use your account"]})
    dispatch({ type: 'ADD_USER', user: {
      is_login: false,
      reload: false,
      valid_email: false,
      verification_session: false
    }})
  }
}

export const setAccountType = (action)=>{
  return (dispatch) => {
    dispatch({ type: 'ACCOUNT', account: action})
  } 
}



