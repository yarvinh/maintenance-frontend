
import { useDispatch } from 'react-redux';
import RepliesContainer from '../../containers/RepliesContainer';
import { useParams } from 'react-router';
import ImagesCarousel from '../carousel/ImagesCarousel';
import { dateAndTime } from '../../componentsHelpers/functionsHelpers';
import { deleteFetchAction } from '../../actions/fetchActions';
import { commentDeleteSetter } from '../../componentsHelpers/fetchingFunctions';
import Likes from '../likes/Likes';

const Comment = ( {comment,user} )=> {
  const {workOrderId} = useParams()
  const dispatch = useDispatch() 
  const handleDeleteOnClick = (e) => {
    const payload = commentDeleteSetter({workOrderId: workOrderId, id: comment.id})
    dispatch(deleteFetchAction(payload))          
  }
  
  return  (    
    <section className='post' key={comment.id}> 
      <div >
        {comment.user?.id === user.user?.id || comment.employee?.id === user.user?.id ? <img src="../close.svg" onClick={handleDeleteOnClick} className='x-delete' alt="X delete reply"/> : null}
        <span >Posted by: {comment.user ? comment.user.name : comment.employee.name} {dateAndTime(comment.created_at)}</span>
      </div>
      <div  className='comments'>
          {comment.images?.length > 0 && <ImagesCarousel images={comment.images}/>}
          <p>{comment.comment}</p>
      </div> 
      <div>
        <div className='likes'>
          {user.user && <Likes idFor="comment_id" likeItem={comment} user={user}/>}
        </div>
        <RepliesContainer comment={comment} user={user} />
      </div>
    </section>
  )
};

export default Comment
