import "../../styles/likes.css"
import { useDispatch } from "react-redux";
import { LIKED_STYLE, NO_LIKE_STYLE } from "../../componentsHelpers/likesConst";
import { likeDeleteSetter, likePostSetter } from "../../componentsHelpers/fetchingFunctions";
import { deleteFetchAction, postFetchAction } from "../../actions/fetchActions";

const Likes = ({idFor, user,likeItem})=>{
    const dispatch = useDispatch()
    const likedIt = likeItem.likes?.find((like) => {
        return like.user_id  === user.user.id || like.employee_id  === user.user?.id
    })

    const handleOnClick = (e) => {
        const payload =  likedIt ? likeDeleteSetter({id: likedIt.id}) : likePostSetter({payload: {[idFor]: likeItem.id}})
        likedIt ? dispatch(deleteFetchAction(payload)) : dispatch(postFetchAction(payload))
    }

    return(
        <div className='like-container'>     
            <div className='like'>
                <img onClick={handleOnClick} src='/instagram-likes.svg'  style={likedIt? NO_LIKE_STYLE : LIKED_STYLE } /> 
            </div>   
            <span> Likes {likeItem.likes?.length}</span>
        </div>
    )
}

export default Likes