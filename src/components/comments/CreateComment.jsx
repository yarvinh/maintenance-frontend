import {useState } from 'react';
import { connect } from 'react-redux';
import {createComment} from '../../actions/commentsActions'
import {useParams} from 'react-router-dom';
import {clearErrors} from '../../actions/errorsActions'


const CreateComment = (props) => {

    const {id} = useParams()
    let {error} = props.comment
  
    let placeholderObj = {subject: "Subject", comment: "Write a comment"}
    const [comment, setComment] = useState({
      work_order_id: id,
      subject: '',
      comment: '',
    })

    const [placeholder,setPlacehoder] = useState(placeholderObj)

    const handleOnChange = (e) => {
    if (e.target.name === 'comment'){
        e.target.style.height = "1px";
        e.target.style.height = (e.target.scrollHeight)+"px";
    }
    
    setComment({
        ...comment,
        [e.target.name]: e.target.value,
    })
    }



    const handleOnSubmit = (e) => {
        e.preventDefault()
        props.createComment({comment})
        setComment({
          ...comment,
          subject: '',
          comment: '',
        })
        setPlacehoder({
            subject: "Subject",
            comment: "Write a comment"
        })
        e.target.children[2].children[0].style.height  = "24px"
      }

    const renderComment=()=>{
        if (error) {
            error.map((err) => {
                if( placeholder[err.split(" ")[0].toLowerCase()] === placeholderObj[err.split(" ")[0].toLowerCase()]){
                    setPlacehoder({
                       ...placeholder,
                       [ err.split(" ")[0].toLowerCase()]: err,
                    })
                }
            })
        }
    }

    return (
        <div>
            <form className="" onSubmit={handleOnSubmit} >
                <div className="comment-input"> 
                    <input onChange={handleOnChange} className="comment-subject-input" placeholder={placeholder.subject} name="subject" type="text" value={comment.subject}/><br/>   
                </div>
                <div className="text-area-section"> 
                        <textarea className='auto_height comment-text-area' onChange={handleOnChange} placeholder={placeholder.comment} name="comment" row='1' value={comment.comment}></textarea> 
                        <input className='buttons' type="submit" value='Comment'/>
                </div>
            </form>
            {renderComment()}
        </div>
    )
}

  const mapStateToProps = state => { 
        return {
          comment: state.comment.comment,
          loading: state.comment.loading
       }
  }


  const mapDispatchToProps = dispatch => {
    return {
        createComment: (action) => dispatch(createComment(action)),
        clearErrors: () => dispatch(clearErrors)
    }
  }
  export default connect( mapStateToProps, mapDispatchToProps)(CreateComment)