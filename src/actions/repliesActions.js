import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'

export const fetchReplies = (id) => {
    const params = {
        answer: { toJSON: () => id },
        id:id
      };   
    return (dispatch) => {
        dispatch({type: "LOADING"})
        axios.get(`${baseUrl()}/replies`, {params}, {headers: token(), withCredentials: true})
        .then(response => {
            dispatch({ type: 'ADD_REPLIES', replies: response.data})
        })
    }  
}

export const createReply = (reply) => {
    return (dispatch) => {
        dispatch({type: "LOADING"})
        axios.post(`${baseUrl()}/replies`, reply ,{headers: token(), withCredentials: true})
        .then(response => {
            const error = response.data.error
           error? dispatch({ type: 'ADD_REPLY', reply: response.data}) : dispatch({ type: 'ADD_COMMENTS', comments: response.data})
        })
    }  
}




export const deleteReply = (id) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING'})
      axios.delete(`${baseUrl()}/replies/${id}`,{headers: token()}
      ).then(response => {   
        dispatch({ type: 'ADD_COMMENTS', comments: response.data })
      })
    }
}