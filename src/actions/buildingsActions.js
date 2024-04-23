import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'


export const deleteBuilding = (id) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING'})
    axios.delete(`${baseUrl()}/buildings/${id}`,{headers: token(), withCredentials: true}
    ).then(response => {   
      dispatch({ type: 'ADD_BUILDINGS', buildings: response.data })
    })
  }
}

export const searchBuilding = (params) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING'})
    axios.get(`${baseUrl()}/search/buildings/`,{params: {address: params}, headers: token(), withCredentials: true}
    ).then(response => {   
      dispatch({ type: 'ADD_BUILDINGS', buildings: response.data })
    })
  }
}