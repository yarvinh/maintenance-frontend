import {useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import { patchFetchAction } from '../../actions/fetchActions';
import { getFetchAction } from '../../actions/fetchActions';
import { BUILDINGS_SETTER, EMPLOYEES_SETTER } from '../../componentsHelpers/fetchingConstants';
import { workOrderPatchSetter } from '../../componentsHelpers/fetchingFunctions';
import { displayFormReceived } from '../../state/reducers/displayElementReducer';
import ErrorsOrMsg from '../ErrosOrMsg';

const EditWorkOrder = () =>{
    const dispatch = useDispatch()
    const isDisplay = useSelector(state => state.isDisplay.formDisplay)
    const employees = useSelector(state => state.employees.employees)
    const buildings = useSelector(state => state.buildings.buildings)
    const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)
    const {workOrderId} = useParams()
    const [workOrder, setWorkOrder] = useState({
        unit: "",
        date: "",
        building_id: "",
        employee_id: "",
        current_employee_id: '',
        title: "",
    })
    useEffect(() => {
      if(employees.length === 0)
        dispatch(getFetchAction(EMPLOYEES_SETTER))
      if(buildings.length === 0)
          dispatch(getFetchAction(BUILDINGS_SETTER))
    },[ ]);
  
    let handleOnChange = (e)=>{
      setWorkOrder({...workOrder,[e.target.name]: e.target.value})
    }

    const handleOnClick = (e)=>{
      if (e.target.className.includes("active"))
        dispatch(displayFormReceived({buttonClass: "display_accordion", formClass: 'hide_elements', id: e.target.id}))
      else
        dispatch(displayFormReceived({buttonClass: "display_accordion active", formClass: 'display_elements', id: e.target.id}))   
    }
  
    let handleOnSubmit = (e,type) =>{
        e.preventDefault()
        const payload = workOrderPatchSetter({id: workOrderId, payload: {[type]: workOrder[type]}})
        dispatch(patchFetchAction(payload))
        setWorkOrder({...workOrder,[type]: ""})  
    }

    return(   
      <div className='center'>
            <button  id='edit-work-order' onClick={handleOnClick} className={isDisplay.buttonClass} > Edit Work Order</button>
            <div className={isDisplay.id.includes('edit-work-order') ? `${isDisplay.formClass} form-wrapper`: 'hide_elements'}>
              <div className='standar-forms accordion'>
                {errorsOrMsg.from.includes("update_work_order") && <ErrorsOrMsg {...(errorsOrMsg.errors ? { errors: errorsOrMsg.errors } :{msg: errorsOrMsg.msg })} />}
                <div className="container d-flex justify-content-center align-items-center accordion" > 
                    <form onSubmit={(e)=>handleOnSubmit(e,"employee_id")}  className='accordion'>
                        <label className='accordion'>Add new employee</label>
                        <select className="standar-input accordion" onChange={handleOnChange} name="employee_id">
                          <option value='' className='accordion'>Select Employee</option>
                          {employees.map(e => <option key={e.id} value={e.id} className='accordion'>{e.name}</option>)}
                        </select>
                        <button type='submit' className="standar-button accordion">Add employee</button>
                    </form>
                </div>
                <div className="container d-flex justify-content-center align-items-center accordion"> 
                    <form onSubmit={e => handleOnSubmit(e,'building_id')} className='accordion'>
                        <label className='accordion'>Building</label>
                        <select className="standar-input accordion" onChange={handleOnChange} name="building_id">
                          <option value='' className='accordion'>Select Location</option>
                          {!buildings.error_message && buildings.map(b => <option key={b.id} value={b.id} className='accordion'>{b.address}</option>)}
                        </select>
                        <button type='submit' className="standar-button accordion">Save location</button>
                    </form> 
                </div>
                <div className="container d-flex justify-content-center align-items-center accordion"> 
                    <form onSubmit={ e=> handleOnSubmit(e,'date')} className='accordion'>
                      <label className='accordion'>Date</label>
                        <input onChange={handleOnChange}  name="date" className="standar-input accordion" type="date" value={workOrder.date}/><br/>
                        <button type='submit' className="standar-button accordion">Save date</button>
                    </form>
                </div>
                <div className="container d-flex justify-content-center align-items-center accordion"> 
                    <form onSubmit={ e=> handleOnSubmit(e,'title')} className='accordion'>
                      <label className='accordion'>Title</label>
                      <input onChange={handleOnChange} name="title" className="standar-input accordion" type="text" value={workOrder.title}/><br/>
                      <button type='submit' className="standar-button accordion">Save title</button>
                    </form>
                </div>
                <div > 
                    <form onSubmit={ e=> handleOnSubmit(e,'unit')} className='accordion'>
                      <label className='accordion'>Unit</label> <br/>
                      <input onChange={handleOnChange}  className="standar-input accordion"  name="unit" type="text" value={workOrder.unit}/>
                      <button type='submit' className="standar-button accordion">Save unit</button>
                    </form>
                </div>
                <div>
                </div>
              </div>
            </div>   
        </div>  
    )
}

export default EditWorkOrder