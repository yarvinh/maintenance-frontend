import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Task  from '../components/tasks/Task';
import CreateTask from '../components/tasks/CreateTask';
import {useParams} from 'react-router-dom';
import { tasksGetSetter } from '../componentsHelpers/fetchingFunctions';
import { getFetchAction } from '../actions/fetchActions';


const TasksContainer = ({user,admin,workOrder})=>{
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.tasks)
  // const taskLoading = useSelector(state => state.tasks.taskLoading)

  const {workOrderId} = useParams()
  let sumTasks = 0

  tasks?.forEach((task) => {
    task.completed ? sumTasks += task.price : sumTasks += 0
  })
  
  useEffect(() => {
    const taskSetter  = tasksGetSetter({id: workOrderId})
    dispatch(getFetchAction(taskSetter))
  },[]);
  
  return (
  <div>
      <div className='hight'>
        {!workOrder.status && admin || !workOrder.status && !user?.user_id? <CreateTask/>: null}
      </div>
      <div >
        {tasks.map((task)=>{
          return <div key={task.id} ><Task workOrder={workOrder} admin={admin} user={user} task={task}/> </div>
        })}
      </div>
      <div>
          <label className="fa-solid">Total  =  ${sumTasks}</label>  
      </div>    
  </div>

  )
}

export default TasksContainer