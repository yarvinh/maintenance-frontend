
import Loading from '../components/Loading';
import Input from '../components/forms/Input';
import { useEffect, useRef, useState } from 'react';
import { dispatchReply} from '../actions/repliesActions';
import { getMoreRepliesGetSetter, repliesGetSetter } from '../componentsHelpers/fetchingFunctions';
import { getFetchAction} from '../actions/fetchActions';
import { useDispatch, useSelector } from 'react-redux';
import Reply from '../components/replies/Reply';

const RepliesContainer = ({user,comment,repliesTotal}) => {
  const replies = comment.replies
  const loading = useSelector(state=> state.comments.repliesLoading)
  const dispatch = useDispatch()
  const ref = useRef()
  const [displayReplies, setDisplayReplies] = useState({
      reply: '',
      accordion: 'replies_accordion',
      displayAcordion: 'hide_replies',
      displayReplies: 3,
    }
  )

  const handleOnclickReply = (e)=>{
    const payload = repliesGetSetter({comment_id: comment.id, replies_length: 0 })
    dispatch(getFetchAction(payload))
    if(displayReplies.accordion !== 'replies_accordion active')
      setDisplayReplies({
        ...displayReplies,
        accordion: 'replies_accordion active',
        displayAcordion: 'display_replies'
      })
    else
      setDisplayReplies({
        ...displayReplies,
      accordion: 'replies_accordion',
      displayAcordion: 'hide_replies'
      })
  }

  useEffect(()=>{
      ref.current.scrollIntoView({behavior: "instant", block: "center", inline: "nearest" })
  },[repliesTotal])
    
  const handleOnGetMoreReplies = (e) =>{
    e.preventDefault()
    const payload = getMoreRepliesGetSetter({comment_id: comment.id, replies_length: replies.length })
    dispatch(getFetchAction(payload))
  }

  return (
    <section className=''>
      {<button onClick={handleOnclickReply} className={displayReplies.accordion}> {`${comment.replies_total} Replies`} </button>}
      <div className={displayReplies.displayAcordion}>
        <div className='replies_wraper'> 
            {replies?.map(reply => <Reply key={reply?.id} reply={reply} user={user} comment={comment}/>)}
              {loading && <Loading/>}
              {comment.replies_total > replies?.length  && <form onSubmit={handleOnGetMoreReplies} className="reload" >  
              <input  className='reload-input' type='submit' value={'Load more replies'}/> 
            </form> }
        </div>
        {user.user && <Input name="reply" 
          createAction={dispatchReply} 
          path={`/replies`} 
          ids={{user_id: user.user?.id, comment_id: comment.id}} 
        />}
      </div>
      <div ref={ref} ></div>
    </section>
  );
};

export default RepliesContainer
