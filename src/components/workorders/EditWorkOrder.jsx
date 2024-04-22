import React, {useState,useEffect} from 'react';
import { connect } from 'react-redux';
// import {editWorkOrder} from '../../actions/workOrdersActions'
import {clearErrors} from '../../actions/errorsActions'
import {useParams} from 'react-router-dom';
import {acordionButtonClass,diplayAcordion} from '../../componentsHelpers/acordion'
import { patchFetchAction } from '../../actions/fetchActions';
import '../../styles/styles.css'
// import { fetchAppContent } from '../../componentsHelpers/fetching';

const EditWorkOrder = (props) =>{
    const {employees,buildings,errorsOrMessages,acordion,workOrders} = props
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
      if (errorsOrMessages?.length > 0){
        props.clearErrors()
      }
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
          stateName:{forResponse: "workOrder", forArray: "workOrders"} ,
          type: {loading: "LOADING_WORK_ORDERS", forArray: "ADD_WORK_ORDERS", forResponse: "ADD_WORK_ORDER"}, 
          params: {payload: {[type]: workOrder[type]}, array: workOrders}
      })
        // props.editWorkOrder({workOrders: workOrders, workOrder: {[type]: workOrder[type],id: id}})  
        setWorkOrder({
          ...workOrder,[type]: ""
        }) 

        if (errorsOrMessages.length > 0){
          props.clearErrors()
        }
          
    }

  return(   
      <div className='center'>
            <button  id='edit-work-order' className={acordionButtonClass('edit-work-order',acordion)}> Edit Work Order</button>
            <div className={diplayAcordion('edit-work-order',acordion)}>

            <div className='standar-forms acordion'>
                <div className="container d-flex justify-content-center align-items-center acordion" > 
                    <form onSubmit={(e)=>handleOnSubmit(e,"employee_id")}  className='acordion'>
                        <label className='acordion'>Add new employee</label>
                        <select className="standar-input acordion" onChange={handleOnChange} name="employee_id">
                          <option value='' className='acordion'>Select Employee</option>
                          {!employees.error_message? employees.map(e => <option key={e.id} value={e.id} className='acordion'>{e.name}</option>):null}
                        </select>
                        <button type='submit' className="standar-button acordion">Add employee</button>
                    </form>
                </div>
                <br/>
                <div className="container d-flex justify-content-center align-items-center acordion"> 
                    <form onSubmit={e => handleOnSubmit(e,'building_id')} className='acordion'>
                        <label className='acordion'>Building</label>
                        <select className="standar-input acordion" onChange={handleOnChange} name="building_id">
                          <option value='' className='acordion'>Select Location</option>
                          {!buildings.error_message ? buildings.map(b => <option key={b.id} value={b.id} className='acordion'>{b.address}</option>):null}
                        </select>
                        <button type='submit' className="standar-button acordion">Save location</button>
                    </form> 
                </div>

                    <br/>
                <div className="container d-flex justify-content-center align-items-center acordion"> 
                    <form onSubmit={ e=> handleOnSubmit(e,'date')} className='acordion'>
                      <label className='acordion'>Date</label>
                        <input onChange={handleOnChange}  name="date" className="standar-input acordion" type="date" value={workOrder.date}/><br/>
                        <button type='submit' className="standar-button acordion">Save date</button>
                    </form>
                </div>

                <div className="container d-flex justify-content-center align-items-center acordion"> 
                    <form onSubmit={ e=> handleOnSubmit(e,'title')} className='acordion'>
                      <label className='acordion'>Title</label>
                      <input onChange={handleOnChange} name="title" className="standar-input acordion" type="text" value={workOrder.title}/><br/>
                      <button type='submit' className="standar-button acordion">Save title</button>
                    </form>
                </div>
                <br/>
                <div > 
                    <form onSubmit={ e=> handleOnSubmit(e,'unit')} className='acordion'>
                      <label className='acordion'>Unit</label> <br/>
                      <input onChange={handleOnChange}  className="standar-input acordion"  name="unit" type="text" value={workOrder.unit}/>
                      <button type='submit' className="standar-button acordion">Save unit</button>
                    </form>
                </div>
                <div>
                  <p className='errors acordion'>{errorsOrMessages}</p>
                </div>
                </div>
            </div>   
        </div>
      
  )
}

const mapStateToProps = state => { 
    return {
        workOrders: state.workOrders.workOrders,
        acordion: state.acordion.acordion,
        employees: state.employees.employees,
        buildings: state.buildings.buildings,
        errorsOrMessages: state.errorsOrMessages.errorsOrMessages
    }
}


const mapDispatchToProps = dispatch => {
    return {
      patchFetchAction: (action) => dispatch(patchFetchAction(action)),
      clearErrors: () => dispatch(clearErrors()),
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(EditWorkOrder)