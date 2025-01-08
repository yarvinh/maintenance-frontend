import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { deleteFetchAction, patchFetchAction } from '../../actions/fetchActions';
import { taskDeleteSetter, taskPatchSetter } from '../../componentsHelpers/fetchingFunctions';

const Task = ({task,admin,workOrder ,user})=>{
  const {workOrderId} = useParams()
  const dispatch = useDispatch()
   let disable = false
   if(workOrder.status)
    disable = true

    const handleOnClick = (e) =>{
      const confirmBox = window.confirm( "Are you sure to delete this task?" )
      
      if (confirmBox === true){
        const payload = taskDeleteSetter({workOrderId: workOrderId, id: task.id})
        dispatch(deleteFetchAction(payload))
      }
    }
  
    const handleOnChange = (e) =>{
      if (!workOrder.status ){
        const payload = taskPatchSetter({workOrderId: workOrderId, id: task.id, payload: {task: task.id}})
        dispatch(patchFetchAction(payload))
      }
    }

    return (     
      <div className={'tasks'}> 
            <div className='task'>
                {task?.completed? <input onChange={handleOnChange} type="checkbox"  defaultValue={task.id} defaultChecked="checked"  disabled={disable} />: <input onChange={handleOnChange} type="checkbox" defaultValue={task.id}  disabled={disable} /> }
                <label className="task_label">{task?.task}</label> 
                {(admin && !workOrder.status) || (!workOrder.status && !user?.user_id) ? <i onClick={handleOnClick}  className="fa-solid fa-trash-can delete-task"></i>: null}     
            </div>
            <label >${task?.price}</label>  
        </div>
    )  
  }

  export default Task
