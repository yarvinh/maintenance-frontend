import { commentLikesReceived, replyLikesReceived } from "../state/reducers/commentsReducers"

export const addOrRemoveLikesFromReply = (payload)=>{
   return (dispatch) => {
     dispatch(replyLikesReceived(payload))
   }
}

export const addOrRemoveLikesFromComment = (payload)=>{
    return (dispatch) => {
      dispatch(commentLikesReceived(payload))
    }
 }