import axios from 'axios'
import {token,verificationToken,removeLoginToken} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'


export const getFetchAction = ({path,type, stateName}) => { 
    return (dispatch) => {
      dispatch({ type: 'LOADING'})
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
    const {itemName,arrayName} = stateName
    return (dispatch) => {
        dispatch({ type: "LOADING"})
        fetch(`${baseUrl()}${path}`,  {method: "POST",headers: token(), withCredentials: true, body: JSON.stringify(payload)})
        .then(response => response.json())
        .then(response => {
          // console.log("from postAction",response)
          const error = response.errors_or_messages
          if(error){
            dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: error})
          }else{
            dispatch({ type: type.addItem, [itemName]: response})
            dispatch({ type: type.addItemToArray, [arrayName]: [ response,...array]})
          }
      })
    }
  }

  export const patchFetchAction = ({path, type, stateName,params, id}) => {
    const {payload, array} = params
    const {itemName,arrayName} = stateName
    return (dispatch) => {
        dispatch({type: "LOADING"})
        axios.patch(`${baseUrl()}${path}`, payload ,{headers: token(), withCredentials: true})
        .then(response => {
          const error = response.data.errors_or_messages
          const index = array.findIndex(e=> e.id?.toString() === id)
          if (error && response.data.user){
            dispatch({ type: type.addItem, [itemName]: response.data})
            dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages})
          } else if(error){
            dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages})
          }else{
            array[index] = response.data
            dispatch({ type: type.addItem, [itemName]: response.data})
            dispatch({ type: type.addItemToArray, [arrayName]: array})
          }
        })
    }
  }
  