import React, {useState } from 'react';
import { connect } from 'react-redux';
import {createReply} from '../../actions/repliesActions'

const CreateReply = (props) => {

    let {comment} = props
    let placeholderObj = {reply: "Write a reply"}
    const [reply, setReply] = useState({
        reply: "",
        comment_id: comment.id
    })

    const [placeholder,setPlacehoder] = useState(placeholderObj)

    const handleOnChange = (e) => {
        e.target.style.height = "1px";
        e.target.style.height = (e.target.scrollHeight)+"px";
        setReply({
            ...reply,
            [e.target.name]: e.target.value
        })
    }

    const handleOnKeyUp = (e) => {
        e.preventDefault()
        if (e.code  === 'Enter'){
            props.createReply({reply})
            setReply({
                ...reply,
                reply: ""
            })
            setPlacehoder({
                reply: "Write a Reply",
            })
            e.target.style.height = "30px"
        }
      }

    return (
        <div>
            <form onKeyUp={handleOnKeyUp}>
               <textarea  onChange={handleOnChange} className='auto_height_for_reply' placeholder={placeholder.reply} name="reply" type="text" value={reply.reply} style={{height: "30px"}}/><br/>
            </form>
        </div>
    )
}

  const mapDispatchToProps = dispatch => {
    return {
        createReply: (action) => dispatch(createReply(action))
    }
  }
  export default connect(null, mapDispatchToProps)(CreateReply)