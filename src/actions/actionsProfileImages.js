import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'
import { userLoading, userReceived } from '../state/reducers/userReducers'
import { errorsOrMessagesReceived } from '../state/reducers/errorsOrMessagesReducer'
import { ERRORS } from '../componentsHelpers/errors'

export const createImage = (params) => {
    return async (dispatch) => {
        dispatch(userLoading())
        try{
          const response = await axios.post(`${baseUrl()}/${params.path}`, params.image ,{headers: token('multipart/form-data'), withCredentials: true})
          response.data.errors_or_messages && dispatch(errorsOrMessagesReceived(response.data.errors_or_messages))
          dispatch(userReceived(response.data))
        }catch(error){
            dispatch(userLoading())
            if(error.response?.data.errors_or_messages)
              dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
            else
              dispatch(errorsOrMessagesReceived(ERRORS))
        }
    } 
}

export const updateImage = (params) => {
    return async (dispatch) => {
        dispatch(userLoading())
        try {
            const response = await axios.patch(`${baseUrl()}/${params.path}`, params.image ,{headers: token('multipart/form-data'), withCredentials: true,'content-type': 'multipart/form-data'})
            response.data.errors_or_messages && dispatch(errorsOrMessagesReceived(response.data.errors_or_messages))
            dispatch(userReceived(response.data))
        } catch(error) {
            dispatch(userLoading())
            if(error.response?.data.errors_or_messages)
              dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
            else
              dispatch(errorsOrMessagesReceived(ERRORS))
        }
    } 
}