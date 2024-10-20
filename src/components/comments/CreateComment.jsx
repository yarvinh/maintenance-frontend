// import {useState,useRef } from 'react';
// import { connect } from 'react-redux';
// import {createComment} from '../../actions/commentsActions'
// import {useParams} from 'react-router-dom';
// import {clearErrors} from '../../actions/errorsActions'


// const CreateComment = (props) => {
//     const inputRef = useRef()
//     const {id} = useParams()
//     let {error} = props.comment
  
//     let placeholderObj = {subject: "Subject", comment: "Write a comment"}
//     const [comment, setComment] = useState({
//       work_order_id: id,
//       subject: '',
//       comment: '',
//     })

//     const [placeholder,setPlacehoder] = useState(placeholderObj)

//     const handleOnChange = (e) => {
//     if (e.target.name === 'comment'){
//         e.target.style.height = "1px";
//         e.target.style.height = (e.target.scrollHeight)+"px";
//     }
    
//     setComment({
//         ...comment,
//         [e.target.name]: e.target.value,
//     })
//     }

//     const handleOnSubmit = (e) => {
//         e.preventDefault()
//         props.createComment({comment})
//         setComment({
//           ...comment,
//           subject: '',
//           comment: '',
//         })
//         setPlacehoder({
//             subject: "Subject",
//             comment: "Write a comment"
//         })
//         inputRef.current.style.height  = "24px"
//     }

//     const renderComment=()=>{
//         if (error) {
//             error.map((err) => {
//                 if( placeholder[err.split(" ")[0].toLowerCase()] === placeholderObj[err.split(" ")[0].toLowerCase()]){
//                     setPlacehoder({
//                        ...placeholder,
//                        [ err.split(" ")[0].toLowerCase()]: err,
//                     })
//                 }
//             })
//         }
//     }

//     return (
//         <div>
//             <form className="" onSubmit={handleOnSubmit} >
//                 <div className="comment-input"> 
//                     <input  onChange={handleOnChange} id="comment-input-id" className="comment-subject-input" placeholder={placeholder.subject} name="subject" type="text" value={comment.subject}/><br/>   
//                 </div>
//                 <div className="text-area-section"> 
//                     <textarea ref={inputRef} className='auto_height comment-text-area' onChange={handleOnChange} placeholder={placeholder.comment} name="comment" row='1' value={comment.comment}></textarea> 
//                     <input className='buttons' type="submit" value='Comment'/>
//                 </div>
//             </form>
//             {renderComment()}
//         </div>
//     )
// }

//   const mapStateToProps = state => { 
//         return {
//           comment: state.comment.comment,
//           loading: state.comment.loading
//        }
//   }


//   const mapDispatchToProps = dispatch => {
//     return {
//         createComment: (action) => dispatch(createComment(action)),
//         clearErrors: () => dispatch(clearErrors)
//     }
//   }
//   export default connect( mapStateToProps, mapDispatchToProps)(CreateComment)

import { useState } from "react"
import { useDispatch} from "react-redux"
import { dispatchComment} from "../../actions/comments"
import { useParams } from "react-router"
import { useRef } from "react"

const CreateComment = ({loggedIn,currentUser}) => {
    
    const {gameId} = useParams()
    const dispatch = useDispatch()
    const [newComment, setNewComment] = useState({
        game_id: '',
        user_id: '',
        comment: '',
        displayMoreComments: 3,
    })
    const ref = useRef()

    const handleOnSubmit = (e)=>{
        e.preventDefault()
        const payload = {comment: newComment.comment, user_id: currentUser.id, game_id: gameId}
        dispatch(dispatchComment({comment: payload}))
        setNewComment({
            ...newComment,
            comment: ""
        })
        ref.current.style.height = '60px'
    }

    const onChangeComment = (e) => {
        e.preventDefault()
        e.target.style.height = "1px";
        e.target.style.height = (e.target.scrollHeight)+"px";
        setNewComment({
        ...newComment,
        comment: e.target.value,
        })

    }

    return (
        <div>
            <form onSubmit={handleOnSubmit} value={newComment.comment}>
            <label>What do you think about this game?</label> 
            <br></br>
            {loggedIn && <div className='comment_textArea'>
                <textarea ref={ref}  onChange={onChangeComment} row='1' className='auto_height standar-input' value={newComment.comment}></textarea> 
                {<input type='submit' className='buttons'value='Comment'/>}
            </div>}
            </form>
        </div>
    )

}

export default CreateComment