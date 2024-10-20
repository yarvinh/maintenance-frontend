import axios from "axios"
import { commentReceived, commentsLoading} from "../state/reducers/commentsReducers"
import { baseUrl } from "./actionsHelper"
import { errorsOrMessagesReceived } from "../state/reducers/errorsOrMessagesReducer"
import { ERRORS } from "../componentsHelpers/errors"
import { token } from "../componentsHelpers/token"



export const dispatchComment = ({path, comment, payload}) =>{
  return (dispatch) => {
    dispatch(commentsLoading())
    try {
      axios.post(`${baseUrl()}/${path}`, payload, {headers: token('multipart/form-data'), params:{comment: comment} ,withCredentials: true})
    } catch (error){
      dispatch(commentsLoading())
      dispatch(errorsOrMessagesReceived(ERRORS)) 
    }
  }
}

export const deleteComment = (payload) => {
  return async (dispatch) => {
     dispatch(commentReceived(payload))
  }
}