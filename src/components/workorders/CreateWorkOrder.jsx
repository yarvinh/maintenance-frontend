
import {useState,useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {connect } from 'react-redux';
import {acordionButtonClass,diplayAcordion} from '../../componentsHelpers/acordion'
import { paths } from '../../actions/actionsHelper';
import { postFetchAction } from '../../actions/fetchActions';
import { getFetchAction } from '../../actions/fetchActions';
import Errors from '../Errors';
import '../../styles/styles.css'

const CreateWorkOrder = (props) => {
    const {workOrders,user} = props
    const {id} = useParams()
    const {employees,buildings,employee,building,acordion,errorsOrMessages} = props
    const [workOrder, setWorkOrder] = useState({
        unit: "",
        date: "",
        building_id: building && id? id :"",
        employee_id: employee && id? id :"",
        join: true,
        title: "",
    })

    let today = new Date().toISOString().split("T")
    today.pop()

    useEffect(() => {
      if (employees.length === 0){
         props.getFetchAction({
           path: "/employees",
           stateName: "employees",
           type: "ADD_EMPLOYEES"

          })
      }
      if (employees.length === 0){
        props.getFetchAction({
          path: "/buildings",
          stateName: "buildings",
          type: "ADD_BUILDINGS"
        })
      }
    },[ ]);
    
    const handleOnSubmit=(e)=>{
      e.preventDefault()

      user.admin? 
        props.postFetchAction({
          path: paths().workOrdersPath,
          stateName:{itemName: "workOrder", arrayName: "workOrders"} ,
          type: {addItemToArray: "ADD_WORK_ORDERS", addItem: "ADD_WORK_ORDER"}, 
          params: {payload: workOrder, array: workOrders}
        })
      : 
        props.postFetchAction({
          path: "/work_order_by_employee",
          stateName:{forResponse: "workOrder", forArray: "workOrders"} ,
          type: { forArray: "ADD_WORK_ORDERS", forResponse: "ADD_WORK_ORDER"}, 
          params: {payload: workOrder, array: workOrders}
        })
      e.target.children[1].value = "select_employee"
      e.target.children[2].value = "select_location"
      setWorkOrder({
        ...workOrder,
        unit: "",
        date: "",
        building_id: building && id? id :"",
        employee_id: employee && id? id :"",
        title: "",
      })
    }

    const handleOnChange=(e)=>{  
        setWorkOrder({
            ...workOrder,[e.target.name]: e.target.value
        })
    }

    return (
      <div className='center'>
        <button  id='create-work-order' className={acordionButtonClass('create-work-order',acordion)}> Create A Work Order</button>
        <div className={diplayAcordion('create-work-order',acordion)}>
            <div className="standar-forms standar-form-position acordion">
                <form onSubmit={handleOnSubmit} className='acordion'>
                  <div className="center acordion"> 
                  {errorsOrMessages.from  === 'create_work_order' ? <Errors errorsOrMessages={errorsOrMessages}/> : null}
                  </div>  
                  {!employee ? <select  className="standar-input acordion" onChange={handleOnChange} name="employee_id" defaultValue="select_employee">
                      <option  name="employee" value="select_employee" className='acordion'>Select Employee</option> 
                      {employees.map(e => <option key={e.id} value={e.id} className='acordion'>{e.name}</option>)}
                    </select> :null}

                    {!building ? <select  className="standar-input acordion" onChange={handleOnChange} name="building_id" defaultValue="select_location">
                      <option  value="select_location" className='acordion'>Select Location</option>
                      {!buildings.error_message ? buildings.map(b => <option key={b.id} className='acordion' value={b.id} >{b.address}</option>):null}
                    </select>: null}
                    <label className='acordion'>Date</label>
                    <div  className='acordion'> 
                    <input onChange={handleOnChange}  name="date" className="standar-input acordion" type="date" value={workOrder.date} min={today.join("-")} />
                    </div>
                    <br/>
                    <label className='acordion'>Title</label> <br/>
                    <input onChange={handleOnChange} className="standar-input acordion" name="title"  type="text" value={workOrder.title}/><br/>
                    <label className='acordion'>Unit</label> <br/>
                    <input onChange={handleOnChange} className="standar-input acordion" name="unit" value={workOrder.unit}/><br/><br/>
                    <button type='submit' className="white-blue-buttons acordion">Submit</button>
                </form>     
                <br/>
            </div>
            
    <br/>
    </div>
  
    </div>
  )
}

const mapStateToProps = state => { 
  return {
    user: state.user.user,
    workOrders: state.workOrders.workOrders,
    acordion: state.acordion.acordion,
    errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
  }
}

const mapDispatchToProps = dispatch => {
    return {
        getFetchAction: (action) => dispatch(getFetchAction(action)),
        postFetchAction: (action)=> dispatch(postFetchAction(action))
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(CreateWorkOrder)
