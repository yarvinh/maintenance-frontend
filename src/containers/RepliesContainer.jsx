import React, {useState,useEffect } from 'react';
import { connect } from 'react-redux';
import Reply  from '../components/replies/Reply';
import {fetchReplies} from '../actions/repliesActions'
import CreateReply from '../components/replies/CreateReply';



const RepliesContainer = (props)=>{
  const [accordion, setAccordion] = useState({
    accordion: 'replies_accordion',
    displayAccordion: 'hide_replies',
  })


  let {replies} = props.comment
  let {user,admin,comment} = props

  const handleOnclickReply = (e)=>{
    if(accordion.accordion !== 'replies_accordion active'){
    setAccordion({
      accordion: 'replies_accordion active',
      displayAccordion: 'display_replies'
    })
  }else{
    setAccordion({
      accordion: 'replies_accordion',
      displayAccordion: 'hide_replies'
    })
  }
  }
  
  return (
  <div>
    <button onClick={handleOnclickReply} className={accordion.accordion}> {`${replies.length} Replies`} </button>
    <div className={accordion.displayAccordion}>
      <div >
        <div className={'reply_wall'}>
          {replies ? replies.map((reply)=>{return <Reply user={user} admin={admin} key={reply.id} reply={reply}/> }):null}
        </div>
        <div className="reply_input">
          <CreateReply comment={comment} admin={admin} user={user}/>
        </div>
        </div>
    </div>
  </div>

  )
}



const mapDispatchToProps = dispatch => {
  return {
    fetchReplies: (action) => dispatch(fetchReplies(action))
  }
}
export default connect(null, mapDispatchToProps)(RepliesContainer)