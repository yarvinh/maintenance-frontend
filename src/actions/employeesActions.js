import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'

  // export const fetchEmployees = () => {
  //   return (dispatch) => {
  //     dispatch({ type: 'LOADING_EMPLOYEES'})
  //     axios.get(`${baseUrl()}/employees`,{headers: token(), withCredentials: true})
  //     .then(response => {
  //     const error = response.data.errors_or_messages
  //     error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}):  dispatch({ type: 'ADD_EMPLOYEES', employees: response.data})
  //     })
  //   }
  // }

  export const fetchEmployee = (id) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_EMPLOYEE'})
      axios.get(`${baseUrl()}/employees/${id}`,{headers: token(), withCredentials: true})
      .then(response => {
      const error = response.data.errors_or_messages
      error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}):  dispatch({ type: 'ADD_EMPLOYEE', employee: response.data})
      })
    }
  }


  
  export const createEmployee = (employee) => {
      return (dispatch) => {
          dispatch({type: "LOADING_EMPLOYEE"})
          axios.post(`${baseUrl()}/employees`, employee ,{headers: token(), withCredentials: true})
          .then(response => {
              const error = response.data.errors_or_messages
              error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}):  dispatch({ type: 'ADD_EMPLOYEES', employees: response.data})
          })
      }
    
  }

  export const editEmployee = (params) => {
    return (dispatch) => {
        dispatch({type: "LOADING_USER"})
        axios.patch(`${baseUrl()}/employees/${params.id}`, params ,{headers: token(), withCredentials: true})
        .then(response => {
          let error = response.data.errors_or_messages
          if(error){
            dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}) 
          }
          if (response.data.user){
            dispatch({ type: 'ADD_USER', user: response.data})
          }
        })
    }
  
}


export const deleteEmployee = (id) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_EMPLOYEES'})
    axios.delete(`${baseUrl()}/employees/${id}`,{headers: token(), withCredentials: true}
    ).then(response => {   
      dispatch({ type: 'ADD_EMPLOYEES', employees: response.data })
    })
  }
}

export const searchEmployees = (params) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_EMPLOYEES'})
    axios.get(`${baseUrl()}/search/employees`,{params: {data: params}, headers: token(), withCredentials: true}
    ).then(response => {   
      console.log(response)
      dispatch({ type: 'ADD_EMPLOYEES', employees: response.data })
    })
  }
}