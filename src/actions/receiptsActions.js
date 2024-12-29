import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'
import { receiptsLoading, receiptsReceived } from '../state/reducers/receiptsReducers'
import { ERRORS } from '../componentsHelpers/errors'
import { errorsOrMessagesReceived } from '../state/reducers/errorsOrMessagesReducer'

export const createReceipts = ({id,receipts}) => {
    return async (dispatch) => {
        receiptsLoading()
        try {
            const response = await axios.post(`${baseUrl()}/work_orders/${id}/receipts`, receipts.receipts,{headers: token('multipart/form-data'), withCredentials: true})
            dispatch(receiptsReceived(response.data))
        } catch(error) {
            dispatch(receiptsLoading())
            if(error.response?.data.errors_or_messages){
              dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
             } else{
              dispatch(errorsOrMessagesReceived(ERRORS))
             }
        }
    } 
}

