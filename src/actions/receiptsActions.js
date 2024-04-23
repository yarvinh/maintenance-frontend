import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'

  export const getReceipts = (id) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING'})
      axios.get(`${baseUrl()}/work_orders/${id}/receipts`,{headers: token(), withCredentials: true})
      .then(response => {
      const error = response.data.errors_or_messages
      error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}):  dispatch({ type: 'ADD_RECEIPTS', receipts: response.data})
      })
    }
  }



export const createReceipts = (receipts) => {
    const id = receipts.id
    return (dispatch) => {
        dispatch({type: "UP_LOADING"})
        axios.post(`${baseUrl()}/work_orders/${id}/add_receipts`, receipts.receipts.receipts,{headers: token(), withCredentials: true,'content-type': 'multipart/form-data'})
        .then(response => {
            const error = response.data.errors_or_messages
            error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}):  dispatch({ type: 'ADD_RECEIPTS', receipts: response.data})
        })
    } 
}


export const updateReceipt = (receipt) => {
    const work_order_id = receipt.work_order_id
    const receipt_id = receipt.receipt_id
    return (dispatch) => {
        dispatch({type: "LOADING"})
        axios.patch(`${baseUrl()}/work_orders/${work_order_id}/edit_receipts/${receipt_id}`, receipt.receipt,{headers: token(), withCredentials: true})
        .then(response => {
            const error = response.data.errors_or_messages
            error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}):  dispatch({ type: 'ADD_RECEIPTS', receipts: response.data})
        })
    } 
}


export const removeReceipt = (id) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING'})
      axios.delete(`${baseUrl()}/remove_receipt/${id}`,{headers: token(), withCredentials: true}
      ).then(response => {   
        dispatch({ type: 'ADD_RECEIPTS', receipts: response.data })
      })
    }
  }