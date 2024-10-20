
import axios from "axios"
import { token } from "../componentsHelpers/token"
import { errorsOrMessagesReceived } from "../state/reducers/errorsOrMessagesReducer"
import { ERRORS } from "../componentsHelpers/errors"
import { baseUrl } from "./actionsHelper"
import { replyReceived } from "../state/reducers/commentsReducers"

export const dispatchReply = ({path,reply,payload}) =>{
  return async (dispatch) => {                      
      try {
        const response  = await axios.post(`${baseUrl()}/${path}`,payload,{ withCredentials: true, params:{reply: reply } ,headers: token('multipart/form-data')})
        // dispatch(replyReceived(response.data))
      } catch (error){
        dispatch(errorsOrMessagesReceived(ERRORS))
      }
  }
}

export const addNewReply = (payload) => {
    return (dispatch)=> {
       dispatch(replyReceived(payload))
    }
}

export const removeReplyFromComment = (payload) =>{
    return (dispatch)=>{
        dispatch(replyReceived(payload))
    }
}

