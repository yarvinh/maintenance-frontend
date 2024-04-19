import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import Task  from '../components/tasks/Task';
import {fetchTasks} from '../actions/tasksActions'
import CreateTask from '../components/tasks/CreateTask';
import {Link,useParams,Navigate,useNavigate} from 'react-router-dom';


const TasksContainer = (props)=>{
  const {id} = useParams()
  let {tasks,user,admin,workOrder} = props
  let sumTasks = 0

  tasks?.forEach((task) => {
    task.completed ? sumTasks += task.price : sumTasks += 0
  })
  
  useEffect(() => {
    props.fetchTasks(id) 
  },[]);
  
  
  const displayTask = () => { 
    return (
      tasks.map((task)=>{
        return <div key={task.id} ><Task workOrder={workOrder} admin={admin} user={user} task={task}/> </div>
      })
    )
  }

  return (
  <div>
      <div >
        {!workOrder.status && admin || !workOrder.status && !user?.user_id? <CreateTask workOrder={workOrder} admin={admin} user={user}/>: null}
      </div>
      <div >
          {displayTask()}
      </div>
      <div>
          <label className="fa-solid">Total  =  ${sumTasks}</label>  
      </div>    
  </div>

  )
}

const mapStateToProps = state => {  
    return {
      tasks: state.tasks.tasks,
      loading: state.tasks.loading,
    }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchTasks: (action) => dispatch(fetchTasks(action))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TasksContainer)