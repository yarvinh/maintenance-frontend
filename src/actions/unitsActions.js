import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'

export const createUnit = (unit) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_UNITS'})
        axios.post(`${baseUrl()}/buildings/${unit.building_id}/units`, {unit: unit}, {headers: token(), withCredentials: true})
        .then(response => {
          const error = response.data.errors_or_messages
          error ? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: error}):  dispatch({ type: 'ADD_UNITS', units: response.data})
      })
    }
  }

  export const getUnits = (id) =>{
    return (dispatch) => {
      dispatch({ type: 'LOADING_UNITS'})
      axios.get(`${baseUrl()}/buildings/${id}/units`,{headers: token(), withCredentials: true})
      .then(response => {
        const error = response.data.errors_or_messages
        error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: error}):  dispatch({ type: 'ADD_UNITS', units: response.data})
      })    
    }
  }

  export const getUnit = (ids) =>{
    return (dispatch) => {
      dispatch({ type: 'LOADING_UNIT'})
      axios.get(`${baseUrl()}/buildings/${ids.buildingId}/units/${ids.unitId}`,{headers: token(), withCredentials: true})
      .then(response => {
        dispatch({ type: 'ADD_UNIT', unit: response.data})
      })    
    }
  }


  export const deleteUnit = (ids) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_UNITS'})
      axios.delete(`${baseUrl()}/buildings/${ids.buildingId}/units/${ids.unitId}`,{headers: token(), withCredentials: true}
      ).then(response => {   
        dispatch({ type: 'ADD_UNITS', units: response.data })
      })
    }
  }

  export const editUnit = (params) => {
    return (dispatch) => {
        dispatch({type: "LOADING_UNIT"})
        axios.patch(`${baseUrl()}/buildings/${params.building_id}/units/${params.unit_id}`, params ,{headers: token(), withCredentials: true})
        .then(response => {
          const error = response.data.errors_or_messages
          error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}):  dispatch({ type: 'ADD_UNIT', unit: response.data})
        })
    }
  }  
    