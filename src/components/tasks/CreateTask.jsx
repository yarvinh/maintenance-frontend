import {useState } from 'react';
import { useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';
import { taskPostSetter } from '../../componentsHelpers/fetchingFunctions';
import { postFetchAction } from '../../actions/fetchActions';

const CreateTask = () => {
    const dispatch = useDispatch()
    const {workOrderId} = useParams()
    const [task, setTask] = useState({
        task: "",
        price: "",
        work_order_id: workOrderId,
    })
    const handleOnChange = (e) => {
        if(!e.target.value.includes('\n')){
            e.target.style.height = "1px";
            e.target.style.height = (e.target.scrollHeight)+"px";
            e.target.style.maxHeight = `${e.target.scrollHeight}px`
        }

        setTask({...task, [e.target.name]: e.target.value})
    }

    const handleOnKeyUp = (e) => {
        e.preventDefault()
        const payload = taskPostSetter({id: workOrderId, payload: {task: task}})
        if (e.code  === 'Enter'){  
            dispatch(postFetchAction(payload))
            setTask({...task, task: "", price: ""})
            e.target.form.children[0].style.maxHeight  = "24px"
            e.target.form.children[1].style.maxHeight  = "24px"
        }
      }

    return (
        <div >
            <form onKeyUp={handleOnKeyUp} className="create-task-form">
               <textarea  onChange={handleOnChange} className='auto_height_for_task-textarea  task-textarea' name="task" placeholder="Add a task" value={task.task} type="text"  style={{height: "30px"}}/>
               <textarea onChange={handleOnChange} className='task-price-input' type="text" placeholder='Price' name="price" value={task.price}/>
            </form>
        </div>
    )
}

export default CreateTask