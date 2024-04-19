import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'

export const fetchTasks = (id) => {
    const params = {
        params: { toJSON: () => id },
        id:id
      };   
    return (dispatch) => {
        dispatch({type: "LOADING_TASKS"})
        axios.get(`${baseUrl()}/tasks`, {params}, {headers: token(), withCredentials: true})
        .then(response => {
            const error = response.data.errors_or_messages 
            error? dispatch(dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.error})): dispatch({ type: 'ADD_TASKS', tasks: response.data})
        })
    }  
}


export const createTask  = (task) => { 
    return (dispatch) => {
        dispatch({type: "LOADING_TASKS"})
        axios.post(`${baseUrl()}/tasks`, task ,{headers: token(), withCredentials: true})
        .then(response => {
            const error = response.data.error
           error? dispatch({ type: 'ADD_TASK', task: response.data}) : dispatch({ type: 'ADD_TASKS', tasks: response.data})
        })
    }  
}

export const changeStatus = (id) => {
    return (dispatch) => {
        dispatch({type: "LOADING_TASKS"})
        axios.patch(`${baseUrl()}/tasks/${id}`,{headers: token(), withCredentials: true})
        .then(response => {
            const error = response.data.error 
            error? dispatch({ type: 'ADD_TASKS', task: response.data}) : dispatch({ type: 'ADD_TASKS', tasks: response.data})
        })
    } 
}

export const deleteTask = (id) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_TASKS'})
      axios.delete(`${baseUrl()}/tasks/${id}`,{headers: token(), withCredentials: true}
      ).then(response => {  
        const error = response.data.error 
        error? dispatch({ type: 'ADD_TASKS', task: response.data}) : dispatch({ type: 'ADD_TASKS', tasks: response.data})
        // dispatch({ type: 'ADD_TASKS', tasks: response.data })
      })
    }
}

export const editTask  = (task) => { 
    // console.log(task)
    const  id = task.id
    return (dispatch) => {
        dispatch({type: "LOADING_TASKS"})
        axios.patch(`${baseUrl()}/tasks/${id}`, task ,{headers: token(), withCredentials: true})
        .then(response => {
            const error = response.data.error
           error? dispatch({ type: 'ADD_TASK', task: response.data}) : dispatch({ type: 'ADD_TASKS', tasks: response.data})
        })
    }  
}