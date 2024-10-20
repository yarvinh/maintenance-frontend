import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'
import { ERRORS } from '../componentsHelpers/errors'
import { errorsOrMessagesReceived } from '../state/reducers/errorsOrMessagesReducer'

export const getFetchAction = ({path, loading, reducer, query_string}) => { 
  return async (dispatch) => {
      loading && dispatch(loading())
        try {
            const response = await axios.get(`${baseUrl()}${path}`, query_string ? {params: {query_string}, headers: token(), withCredentials: true} : { headers: token(), withCredentials: true} )  
            reducer && dispatch(reducer(response.data))
        } catch (error){
            loading && dispatch(loading())
            if(error.response?.data?.errors_or_messages)
              dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
            else
              dispatch(errorsOrMessagesReceived(ERRORS))  
        }
    }
}

export const postFetchAction = ( {payload,path,loading,reducer}) => {
  return async (dispatch) => {
    loading && dispatch(loading())
    try {
      const response = await axios.post(`${baseUrl()}${path}`,payload, {headers: token(), withCredentials: true,})
      reducer && dispatch(reducer(response.data))
    }catch (error){
      loading && dispatch(loading())
      if(error.response?.data.errors_or_messages)
        dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
      else
        dispatch(errorsOrMessagesReceived(ERRORS))
    }
  }
}

export const patchFetchAction = ({payload,path,loading,itemsReducer,itemReducer}) => {
    return async (dispatch) => {
       loading && dispatch(loading())
        try {
          const response = await axios.patch(`${baseUrl()}${path}`, payload ,{headers: token(), withCredentials: true})
          itemsReducer && dispatch(itemsReducer(response.data))
          itemReducer && dispatch(itemReducer(response.data))
          response.data.errors_or_messages && dispatch(errorsOrMessagesReceived(response.data.errors_or_messages))
        } catch (error){
          loading && dispatch(loading())
          if(error.response?.data.errors_or_messages)
            dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
          else
            dispatch(errorsOrMessagesReceived(ERRORS))
        }
    }
}


export const deleteFetchAction = ({path, reducer, optionalReducer}) => { 
  return async (dispatch) => {
    try {
      const response = await axios.delete(`${baseUrl()}${path}`,{headers: token(), withCredentials: true})
      reducer && dispatch(reducer(response.data))
      optionalReducer && dispatch(optionalReducer(response.data))
    } catch(error) {
      if(error.response?.data.errors_or_messages)
        dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
      else
        dispatch(errorsOrMessagesReceived(ERRORS))
    }
  }
}
  