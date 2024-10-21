
import  { useEffect, useRef, useState } from 'react';
import Comment from '../components/comments/Comment';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import ErrorsOrMsg from '../components/ErrosOrMsg';
import { getFetchAction } from '../actions/fetchActions';
import { commentGetSetter, commentsGetSetter, moreCommentsGetSetter } from '../componentsHelpers/fetchingFunctions';
import Input from '../components/forms/Input';
import Loading from "../components/Loading"
import{ wsurl } from '../actions/actionsHelper'
import { deleteComment } from '../actions/comments';
import { addOrRemoveLikesFromComment, addOrRemoveLikesFromReply } from '../actions/likeActions';
import { addNewReply, removeReplyFromComment } from '../actions/repliesActions';


const CommentsContainer = ( {workOrder, user} )=> {
    const commentsLoading= useSelector(state => state.comments.commentsLoading)
    const comments = useSelector(state => state.comments.comments)
    const dispatch = useDispatch()
    const {workOrderId} = useParams()
    const errorsOrMsg = useSelector((state)=> state.errorsOrMessages.errorsOrMessages)
    const wsRef = useRef(new WebSocket(wsurl()))
    const [guid, setGuid] = useState("")

    useEffect(()=>{ 
        const ws = wsRef.current
        const payload = commentsGetSetter({id: workOrderId, comments_length: 0 })
        dispatch(getFetchAction(payload))
        ws.onopen = ()=>{
        setGuid(Math.random().toString(36).substring(2,15)) 
            ws.send(
                JSON.stringify({
                    command: 'subscribe',
                    withCredentials: true,
                    identifier: JSON.stringify({
                        id: guid,
                        work_order_id: workOrderId,
                        channel: "CommentsChannel"
                    })
                })
            )
        }
    
        ws.onmessage = (e)=>{
            const data = JSON.parse(e.data)
            if(data.type === "ping") return
            if(data.type === "welcome") return
            if(data.type === "confirm_subscription") return
            if (data.message?.from_create_comment){
                const payload = commentGetSetter({workOrderId: workOrderId, id: data.message.id})
                dispatch(getFetchAction(payload))
            } else if (data.message?.from_delete_comment){
                dispatch(deleteComment(data.message?.comment_deleted))
            } else if (data.message?.from_create_like_for_comment){
                const response = data.message.response
                dispatch(addOrRemoveLikesFromComment(JSON.parse(response)))
            } else if (data.message?.from_delete_like_from_comment){
                dispatch(addOrRemoveLikesFromComment(data.message.like_deleted)) 
            }else  if (data.message?.from_delete_reply ){
                dispatch(removeReplyFromComment(data.message.reply_deleted))
            }else if(data.message?.from_create_reply){
                dispatch(addNewReply(JSON.parse(data.message.reply)))
            }else if(data.message?.from_create_like_for_reply) {
                const response = data.message.response
                dispatch(addOrRemoveLikesFromReply(JSON.parse(response)))
            } else if (data.message?.from_delete_like_from_reply){
                dispatch(addOrRemoveLikesFromReply(data.message.like_deleted))
            }        
        } 

    },[workOrderId])

    const displayOnSubmit=(e)=>{
        e.preventDefault()
        const payload = moreCommentsGetSetter({id: workOrderId, comments_length: comments.length })
        dispatch(getFetchAction(payload))
    }

    const displayButton = ()=>{
        return (
        <form className='reload' onSubmit={displayOnSubmit} >  
            <input  className='reload' type='submit' value='More comments'/> 
        </form>
        )
    }
   
    return (
        <section className='comments_container'>
            <div className='comment-form-container'>
                {user.is_login && <Input 
                upLoadImages={true}
                name='comment' 
                path={`work_orders/${workOrderId}/comments`} 
                ids={{user_id: user.user.id, work_order_id: workOrder.id}} 
                submitButton={true} 
                currentUser={user}/>}
            </div>
            {errorsOrMsg.from.includes("comment") || errorsOrMsg.from.includes("reply") ?
             <ErrorsOrMsg errors={errorsOrMsg.errors}/> : null}
            <div>
                {commentsLoading && <Loading/>}
                {workOrder && comments?.map(comment=> <Comment key={comment.id} comment={comment} user={user}/>)}
                {user.is_login && comments.length > 9 && displayButton()}
            </div>
        </section>
    );
};

export default CommentsContainer
