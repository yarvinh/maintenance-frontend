import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'

export const fetchComments = (id) => {
    const params = {
        answer: { toJSON: () => id },
        id:id
      };
      
    return (dispatch) => {
        dispatch({type: "LOADING"})
        axios.get(`${baseUrl()}/comments`, {params}, {headers: token(), withCredentials: true})
        .then(response => {
           const  error = response.data.errors_or_messages
           error?  dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: error}): dispatch({ type: 'ADD_COMMENTS', comments: response.data})
        })
    }  
}

export const createComment = (comment) => {
    return (dispatch) => {
        dispatch({type: "ADD_ERRORS"})
        axios.post(`${baseUrl()}/comments`, comment ,{headers: token(), withCredentials: true})
        .then(response => {
           const error = response.data.errors_or_messages
           error?  dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: error}): dispatch({ type: 'ADD_COMMENT', comment: response.data})
        })
        .catch(error => console.log(error))
    }  
}


export const deleteComment = (id) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING'})
      axios.delete(`${baseUrl()}/comments/${id}`,{headers: token()}
      ).then(response => {   
        // dispatch({ type: 'ADD_COMMENTS', comments: response.data })
      })
    }
}

export const addComment = (comments) => {
    return (dispatch) => {
        dispatch({ type: 'ADD_COMMENTS', comments: comments }) 
    }
}