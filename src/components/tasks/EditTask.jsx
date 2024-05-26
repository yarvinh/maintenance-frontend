import {useState} from 'react';
import { connect } from 'react-redux';
import {editTask} from '../../actions/tasksActions'

const EditTask = (props) => {
    const [task, setTask] = useState({
        task: props.task.task,
        status: props.task.completed
    })

    const [disable, setDisable] = useState({
        disable: true,
        checkMarck: task.completed,
        timesClick: 0
    })

    const handleOnClick = (e) => {
        setDisable({
            timesClick: disable.timesClick + 1
        })
       if (e.target.disabled){
           setDisable({
            ...disable,
            disable: false

           })
       } else if(disable.timesClick > 1) {
        setDisable({
            ...disable,
            disable: true,
            timesClick: 0
           })
       }
    }

    const handleOnChange = (e) => {
        setTask({
            ...disable,
            task: e.target.value
        })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        props.editTask({task: task, id: props.task.id})
    }
    
    return(
        <div className='task'>
            <div onClick={handleOnClick}>
                <form onSubmit={handleOnSubmit}>
                  <input onChange={handleOnChange} disabled={disable.disable} type="text" value={task.task}/>
                </form>
            </div>
            <div>
                {props.task.completed? <input onChange={handleOnChange} type="checkbox"  defaultValue={props.task.id} defaultChecked="checked"  disabled={disable.checkMarck} />: <input onChange={handleOnChange} type="checkbox" defaultValue={task.id}  disabled={disable.checkMarck} /> }
            </div>
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        editTask: (action) => dispatch(editTask(action)),
    }
}   
      
export default connect(null, mapDispatchToProps)(EditTask)
