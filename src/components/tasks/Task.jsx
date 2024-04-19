import { connect } from 'react-redux';
import {changeStatus} from '../../actions/tasksActions'
import {deleteTask} from '../../actions/tasksActions'
// import EditTask from './EditTask'
const Task = (props)=>{
   let {task,admin,workOrder,user} = props
   let disable = false
   if(workOrder.status){
    disable = true
   }

    const handleOnClick = (e) =>{
      const confirmBox = window.confirm(
        "Are you sure to delete this task?"
      )
      if (confirmBox === true) {
        props.deleteTask(task.id)
      }
       
    }
  
    const handleOnChange = (e) =>{
        if (!workOrder.status ){
          props.changeStatus(task.id)
        } else if(workOrder.status) {
        }
    }

        return (     
          <div className={'tasks'}> 
                <div className='task'>
                   {task?.completed? <input onChange={handleOnChange} type="checkbox"  defaultValue={task.id} defaultChecked="checked"  disabled={disable} />: <input onChange={handleOnChange} type="checkbox" defaultValue={task.id}  disabled={disable} /> }
                   <label className="task_label">{task?.task}</label> 
                   {admin && !workOrder.status || !workOrder.status && !user?.user_id? <i onClick={handleOnClick}  className="fa-solid fa-trash-can delete-task"></i>:null}     
              </div>
              <label >${task?.price}</label>  
           </div>
        )  

  }

  const mapDispatchToProps = dispatch => {
    return {
    deleteTask: (action) => dispatch(deleteTask(action)),
    changeStatus: (action) => dispatch(changeStatus(action))
    }
  }
  
  export default connect(null, mapDispatchToProps)(Task)
