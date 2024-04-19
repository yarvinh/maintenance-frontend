import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'

export const createImage = (params) => {
    return (dispatch) => {
        dispatch({type: "LOADING_USER"})
        axios.post(`${baseUrl()}/${params.path}`, params.image ,{headers:token(), withCredentials: true,'content-type': 'multipart/form-data'})
        .then(response => {
         let error = response.data.errors_or_messages
             error ? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}) : dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: []})
             dispatch({ type: 'ADD_USER', user: response.data})
        })
    } 
}

export const updateImage = (params) => {
    return (dispatch) => {
        dispatch({type: "LOADING_USER"})
        axios.patch(`${baseUrl()}/${params.path}`, params.image ,{headers:token(), withCredentials: true,'content-type': 'multipart/form-data'})
        .then(response => {
         let error = response.data.errors_or_messages
             error ? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}) : dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: []})
             dispatch({ type: 'ADD_USER', user: response.data})
        })
    } 
}