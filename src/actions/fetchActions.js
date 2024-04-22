import axios from 'axios'
import {token,verificationToken,removeLoginToken} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'


export const getFetchAction = ({path,loading,type, stateName}) => { 
    return (dispatch) => {
      dispatch({ type: loading})
        fetch(`${baseUrl()}${path}`, 
        {headers: token(),withCredentials: true})  
        .then(response => response.json())  
        .then(response => {
          dispatch({ type: type, [stateName]: response})
        })
        .catch( error => 
            dispatch({ type: 'ERRORS_OR_MESSAGES', errorOrMessages: ['Something went wrong with the server, please try again later.']})
        )
    }
}

export const postFetchAction = ({path, type, stateName,params}) => {
    const {payload,array} = params
    const {forResponse,forArray} = stateName
    return (dispatch) => {
        dispatch({ type: type.loadingType})
        axios.post(`${baseUrl()}${path}`, payload, {headers: token(), withCredentials: true})
        .then(response => {
          const error = response.data.errors_or_messages
          if(error){
            dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: error})
          }else{
            dispatch({ type: type.forResponse, [forResponse]: response.data})
            dispatch({ type: type.forArray, [forArray]: [ response.data,...array]})
          }
      })
    }
  }

  export const patchFetchAction = ({path, type, stateName,params, id}) => {
    console.log(params.payload)
    const {payload, array} = params
    const {forResponse,forArray} = stateName
    return (dispatch) => {
        dispatch({type: type.loading})
        axios.patch(`${baseUrl()}${path}`, payload ,{headers: token(), withCredentials: true})
        .then(response => {
          console.log(response)
          const error = response.data.errors_or_messages
          const index = array.findIndex(e=> e.id?.toString() === id)
          if (error && response.data.user){
            dispatch({ type: type.forResponse, [forResponse]: response.data})
          } else if(error){
            dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages})
          }else{
            array[index] = response.data
            dispatch({ type: type.forResponse, [forResponse]: response.data})
            dispatch({ type: type.forArray, [forArray]: array})
          }
        })
    }
  }
  