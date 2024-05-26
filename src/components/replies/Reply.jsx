import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {deleteReply} from '../../actions/repliesActions'
const Reply = (props)=>{
   
   let {reply,admin,user} = props
    const dateAndTime = ()=>{
        const date = new Date(reply.created_at)
        const time = new Date(reply.created_at)
        return (
          <div>
              <span>{date.toDateString()} at </span>      
              <span>{time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</span>
          </div>
        )
    }
    
    const handleOnClick = (e) =>{
        props.deleteReply(reply.id)
    }

    const deleteReply = ()=>{
        if((admin && user.user?.id === reply.user_id) || (user.user?.id === reply.employee_id)){
           return <button onClick={handleOnClick} className='delete' value={reply.id}>X</button>
        }
    } 

        return (   
          <div className='replies'> 
              <div key={reply.id}> 
                <div>
                  {deleteReply()}
                  {reply.user? <span >Reply by: {reply.user.name} {dateAndTime()}</span>:<span >Reply by: <Link to={`/employees/${reply.employee_id}`}>{reply.employee.name}</Link> {dateAndTime()}</span>}
                </div>
                <div className='reply'>
                    <p>{reply.reply}</p> 
                </div> 
              </div>
           </div>
          )    
  }


  const mapDispatchToProps = dispatch => {
    return {
      deleteReply: (action) => dispatch(deleteReply(action))
    }
  }
  export default connect(null, mapDispatchToProps)(Reply)