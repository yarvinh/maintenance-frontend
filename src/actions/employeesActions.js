import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'


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
      dispatch({ type: 'ADD_EMPLOYEES', employees: response.data })
    })
  }
}