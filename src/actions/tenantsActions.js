import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'

export const createTenant = (tenant) => {

    return (dispatch) => {
        dispatch({ type: 'LOADING_UNIT'})
        axios.post(`${baseUrl()}/buildings/${tenant.building_id}/tenants`, {tenant: tenant}, {headers: token(), withCredentials: true})
        .then(response => {
          const error = response.data.errors_or_messages
          error ? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: error}):  dispatch({ type: 'ADD_UNIT', unit: response.data})
      })
    }
}


export const deleteTenant = (ids) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_UNIT'})
      axios.delete(`${baseUrl()}/buildings/${ids.buildingId}/tenants/${ids.tenantId}`,{headers: token(), withCredentials: true}
      ).then(response => {   
        dispatch({ type: 'ADD_UNIT', unit: response.data })
      })
    }
  }

  export const editTenant = (params) => {
    return (dispatch) => {
        dispatch({type: "LOADING_UNIT"})
        axios.patch(`${baseUrl()}/buildings/${params.building_id}/tenants/${params.tenant_id}`, {tenant: params.tenant},{headers: token(), withCredentials: true})
        .then(response => {
          const error = response.data.errors_or_messages
          error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}):  dispatch({ type: 'ADD_UNIT', unit: response.data})
        })
    }
  }  