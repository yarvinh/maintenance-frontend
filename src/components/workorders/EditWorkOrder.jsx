import {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {useParams} from 'react-router-dom';
import {accordionButtonClass,diplayAccordion} from '../../componentsHelpers/accordion'
import { patchFetchAction } from '../../actions/fetchActions';
import { getFetchAction } from '../../actions/fetchActions';
import Errors from '../Errors';

const EditWorkOrder = (props) =>{
    const {employees,buildings,errorsOrMessages,accordion,workOrders} = props
    const {id} = useParams()
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
        props.getFetchAction({
          path: '/employees',
          stateName: "employees",
          type: "ADD_EMPLOYEES"
        })
      
      if(buildings.length === 0)
          props.getFetchAction({
            path: '/buildings',
            stateName: "buildings",
            type: "ADD_BUILDINGS"
          })
    },[ ]);
  
    
    let handleOnChange = (e)=>{
      setWorkOrder({
       ...workOrder,[e.target.name]: e.target.value
      })
    }

    let handleOnSubmit = (e,type) =>{
        e.preventDefault()
        props.patchFetchAction({
          path: `/work_orders/${id}`,
          id: id,
          stateName:{itemName: "workOrder", arrayName: "workOrders"} ,
          type: {addItemToArray: "ADD_WORK_ORDERS", addItem: "ADD_WORK_ORDER"}, 
          params: {payload: {[type]: workOrder[type]}, array: workOrders}
      })

      setWorkOrder({
        ...workOrder,[type]: ""
      })  
    }

  return(   
      <div className='center'>
            <button  id='edit-work-order' className={accordionButtonClass('edit-work-order',accordion)}> Edit Work Order</button>
            <div className={diplayAccordion('edit-work-order',accordion)}>
            <div className='standar-forms accordion'>
              {(errorsOrMessages.from === "update_work_order") && <Errors errorsOrMessages={errorsOrMessages}/>}
                <div className="container d-flex justify-content-center align-items-center accordion" > 
                    <form onSubmit={(e)=>handleOnSubmit(e,"employee_id")}  className='accordion'>
                        <label className='accordion'>Add new employee</label>
                        <select className="standar-input accordion" onChange={handleOnChange} name="employee_id">
                          <option value='' className='accordion'>Select Employee</option>
                          {!employees.error_message && employees.map(e => <option key={e.id} value={e.id} className='accordion'>{e.name}</option>)}
                        </select>
                        <button type='submit' className="standar-button accordion">Add employee</button>
                    </form>
                </div>
                <br/>
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

                    <br/>
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
                <br/>
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

const mapStateToProps = state => { 
    return {
        workOrders: state.workOrders.workOrders,
        accordion: state.accordion.accordion,
        employees: state.employees.employees,
        buildings: state.buildings.buildings,
        errorsOrMessages: state.errorsOrMessages.errorsOrMessages
    }
}

const mapDispatchToProps = dispatch => {
    return {
      getFetchAction: (action) => dispatch(getFetchAction(action)),
      patchFetchAction: (action) => dispatch(patchFetchAction(action))
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(EditWorkOrder)