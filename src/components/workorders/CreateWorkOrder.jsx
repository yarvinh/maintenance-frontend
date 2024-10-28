
import {useState,useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { postFetchAction } from '../../actions/fetchActions';
import { getFetchAction } from '../../actions/fetchActions';
import '../../styles/styles.css'
import { BUILDINGS_SETTER, EMPLOYEES_SETTER } from '../../componentsHelpers/fetchingConstants';
import { displayFormReceived } from '../../state/reducers/displayElementReducer';
import ErrorsOrMsg from '../ErrosOrMsg';
import { workOrderPostSetter } from '../../componentsHelpers/fetchingFunctions';

const CreateWorkOrder = ({employees,buildings,employee,building}) => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const isDisplay = useSelector(state => state.isDisplay.formDisplay)
    const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)
    const {employeeId,buildingId} = useParams()
    const [workOrder, setWorkOrder] = useState({
        unit: "",
        date: "",
        building_id: buildingId ? buildingId :"",
        employee_id: employeeId ? employeeId :"",
        join: true,
        title: "",
    })

    const handleOnClick = (e)=>{
      if (e.target.className.includes("active"))
        dispatch(displayFormReceived({buttonClass: "display_accordion", formClass: 'hide_elements', id: e.target.id}))
      else
        dispatch(displayFormReceived({buttonClass: "display_accordion active", formClass: 'display_elements', id: e.target.id}))   
    }

    let today = new Date().toISOString().split("T")
    today.pop()

    useEffect(() => {
      if (employees.length === 0){
        dispatch(getFetchAction(EMPLOYEES_SETTER))
        dispatch(getFetchAction(BUILDINGS_SETTER)) 
      }
    },[ ]);

    const handleOnSubmit=(e)=>{
      e.preventDefault()
      const payload = workOrderPostSetter({admin: user.admin, payload: {work_order: workOrder}})
      dispatch(postFetchAction(payload))
      e.target.children[1].value = "select_employee"
      e.target.children[2].value = "select_location"
      setWorkOrder({
        ...workOrder,
        unit: "",
        date: "",
        building_id: building && buildingId? buildingId :"",
        employee_id: employee && employeeId? employeeId :"",
        title: "",
      })
    }

    const handleOnChange=(e)=>{  
        setWorkOrder({...workOrder,[e.target.name]: e.target.value})
    }

    return (
      <div className='center'>
        <button  id='create-work-order' onClick={handleOnClick} className={isDisplay.buttonClass}> Create A Work Order</button>
        <div className={isDisplay.id.includes('create-work-order') ? `${isDisplay.formClass} form-wrapper`: 'hide_elements'}>
            <div className="standar-forms standar-form-position accordion">
                <form onSubmit={handleOnSubmit} className='accordion'>
                  {errorsOrMsg.from.includes('create_work_order') && <ErrorsOrMsg {...(errorsOrMsg.errors ? { errors: errorsOrMsg.errors } :{msg: errorsOrMsg.msg })} />}
                  {!employee && !employeeId &&
                    <select  className="standar-input accordion" onChange={handleOnChange} name="employee_id" defaultValue="select_employee">
                      <option  name="employee" value="select_employee" className='accordion'>Select Employee</option> 
                      {employees.map(e => <option key={e.id} value={e.id} className='accordion'>{e.name}</option>)}
                    </select>}

                    {!building && 
                    <select  className="standar-input accordion" onChange={handleOnChange} name="building_id" defaultValue="select_location">
                      <option  value="select_location" className='accordion'>Select Location</option>
                      {!buildings.error_message && buildings.map(b => <option key={b.id} className='accordion' value={b.id} >{b.address}</option>)}
                    </select>}
                    <label className='accordion'>Date</label>
                    <div  className='accordion'> 
                    <input onChange={handleOnChange}  name="date" className="standar-input accordion" type="date" value={workOrder.date} min={today.join("-")} />
                    </div>
                    <br/>
                    <label className='accordion'>Title</label> <br/>
                    <input onChange={handleOnChange} className="standar-input accordion" name="title"  type="text" value={workOrder.title}/><br/>
                    <label className='accordion'>Unit</label> <br/>
                    <input onChange={handleOnChange} className="standar-input accordion" name="unit" value={workOrder.unit}/><br/><br/>
                    <button type='submit' className="white-blue-buttons accordion">Submit</button>
                </form>     
                <br/>
            </div>
      </div>
    </div>
  )
}
    
export default CreateWorkOrder
