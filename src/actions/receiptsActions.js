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






// export const updateReceipt = (receipt) => {
//     const work_order_id = receipt.work_order_id
//     const receipt_id = receipt.receipt_id
//     return (dispatch) => {
//         dispatch({type: "LOADING"})
//         axios.patch(`${baseUrl()}/work_orders/${work_order_id}/edit_receipts/${receipt_id}`, receipt.receipt,{headers: token(), withCredentials: true})
//         .then(response => {
//             const error = response.data.errors_or_messages
//             error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}):  dispatch({ type: 'ADD_RECEIPTS', receipts: response.data})
//         })
//     } 
// }


// export const removeReceipt = (id) => {
//     return (dispatch) => {
//       dispatch({ type: 'LOADING'})
//       axios.delete(`${baseUrl()}/remove_receipt/${id}`,{headers: token(), withCredentials: true}
//       ).then(response => {   
//         dispatch({ type: 'ADD_RECEIPTS', receipts: response.data })
//       })
//     }
//   }