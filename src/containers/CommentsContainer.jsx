
import React, {useEffect,useState } from 'react';
import { connect } from 'react-redux';
import {createComment,fetchComments,addComment} from '../actions/commentsActions'
import {useParams} from 'react-router-dom';
import Comment  from '../components/comments/Comment';
import CreateComment from '../components/comments/CreateComment';
import{wsurl} from '../actions/actionsHelper'
import Errors from '../components/Errors';

const CommentsContainer = (props)=>{ 
  const {id} = useParams()
  let {user,admin,comments,comment,errorsOrMessages} = props

  const [ws, setWs] = useState(new WebSocket(wsurl()))
  const [guid, setGuid] = useState("")

  useEffect(()=>{ 
    props.fetchComments(id)  
    ws.onopen = ()=>{
      setGuid(Math.random().toString(36).substring(2,15)) 
      ws.send(
        JSON.stringify({
          command: 'subscribe',
            withCredentials: true,
          identifier: JSON.stringify({
            id: guid,
            work_order_id: id,
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
        if(data.message?.successfully_completed){
            props.fetchComments(id)
        }          
    }
    
  },[id])
 //########################################################

  
  return (
  <div className='container'>
    <Errors/>
    {/* {errorsOrMessages?.map((err,k) => <strong key={k} className='errors'>{err}</strong>)} */}
    <CreateComment  admin={admin} user={user}/>
    <div>
    {comments? comments.map((comment)=>{return <Comment  user={user} admin={admin} key={comment.id} comment={comment}/> }):null}
    </div>
  </div>

  )
}


const mapStateToProps = state => {  
    return {
      errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
      comment: state.comment.comment,
      comments: state.comments.comments,
      loading: state.comments.loading,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    createComment: (action) => dispatch(createComment(action)),
    fetchComments: (action) => dispatch(fetchComments(action)),
    addComment: (action) => dispatch(addComment(action))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentsContainer)
