
import { useDispatch} from 'react-redux';
import Likes from '../likes/Likes';
import { dateAndTime } from '../../componentsHelpers/functionsHelpers';
import { deleteFetchAction } from '../../actions/fetchActions';
import { replyDeleteSetter } from '../../componentsHelpers/fetchingFunctions';

const Reply = ({reply,user}) => {
  const dispatch = useDispatch()
  const handleOnClick = (e)=>{
    const payload = replyDeleteSetter({id: reply.id})
    dispatch(deleteFetchAction(payload))
  }

  return (
    <div className='replies' key={reply.id}> 
      <div>
        {/* {user.user && reply.user.id === user.user.id && <button onClick={handleOnClick} className='delete' value={reply.id}>x</button>} */}
        {reply.user?.id === user?.user?.id || reply.employee?.id === user.user?.id ? <img src="../close.svg" onClick={handleOnClick} className='x-delete' alt="X delete reply"/> : null}
        <span >{reply.user?.name || reply.employee.name} {dateAndTime(reply.created_at)}</span>
      </div>
        <div className='reply'>
          <p >{reply.reply}</p>
        </div> 
      <div>
        <div>
           {user.user && <Likes idFor="reply_id" likeItem={reply} user={user}/>}
            {/* {user.is_login? <Likes user={user} likesReceived={replyLikesReceived} replyLikesReceived likes={reply.likes} reply_id={reply.id} user_id={currentUser.id} gameCommentOrReply={reply}/>:null} */}
        </div>
      </div>
    </div>  
  )
};

export default Reply