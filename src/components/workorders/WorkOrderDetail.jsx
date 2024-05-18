import React, {useEffect,useRef} from 'react';
import { connect } from 'react-redux';
import {Link,useParams,useNavigate} from 'react-router-dom';
import EditWorkOrder from "./EditWorkOrder"
import CommentsContainer from '../../containers/CommentsContainer'
import '../../styles/styles.css'
import CloseWorkOrder from './CloseWorkOrder';
import TasksContainer from '../../containers/TasksContainer';
import {deleteWorkOrder,removeEmployee} from "../../actions/workOrdersActions"
import {date} from "../../componentsHelpers/date"
import { getFetchAction } from '../../actions/fetchActions';
import Errors from '../Errors';

const WorkOrderDetails = (props)=>{ 
    const {id} = useParams()
    let navigate = useNavigate()
    const {user,buildings,employees,workOrder,workOrders,errorsOrMessages,receipts} = props
    const {admin} = user
    const belongToCurrentUser = workOrder?.employees.filter(emp => emp.id === user.user.id)[0]
    
    useEffect(()=>{
      const worOrderDoesNotExist =  errorsOrMessages.errors?.includes('Access to this comment was dinied')
      if(worOrderDoesNotExist )
        navigate('/work_orders') 
   },[errorsOrMessages])

    useEffect(()=>{
      props.getFetchAction({
        loading: "LOADING_WORK_ORDER", 
        type: 'ADD_WORK_ORDER',
        path: `/work_orders/${id}`, 
        stateName: 'workOrder'
      })
    },[])

    const workOrderEmployees = ()=>{
      return workOrder.employees.map((employee,index) => {
        return( 
          < div  key={index}>
             {admin ? <button onClick={handleOnClick} name="employee" value={employee.id} className='delete-x'>X</button>:null} 
            <Link to={`/employees/${employee.id}`}>
              <p className="name">{employee.name}</p> 
            </Link>   
          </div>
        )
      }) 
    }

    const receiptAmount=()=>{
      let total = 0
      workOrder.receipts?.forEach((receipt) => {
        total += receipt.amount
      })
      return <strong key={total}> = {total} </strong>
    }
    
    const userWorkorder = ()=>{
      return !admin && user.user?.work_orders?.find((w)=> workOrder.id === w.id) 
    }


    const handleOnClick = (e) =>{
      let message = e.target.name === "employee" ?  "Are you sure you to remove this employee"
      : "Are you sure you want to delete this work order?  you will lose all comments and ryplies on this work Order!"     
      
      const confirmBox = window.confirm(message)  
    
      if (confirmBox === true && e.target.name === "employee") {
        props.removeEmployee({workOrders: workOrders,ids: {employee_id: e.target.value, work_order_id: id }})
      }else if (confirmBox === true && e.target.name === "work-order"){
        props.deleteWorkOrder(workOrder.id)  
        navigate('/work_orders')
      }   
    }

    return (
        <section className="work-order-detail"> 
            <br/>
            <br/>
            <div className="container d-flex "> 
                <div className="card-container mb-3 car-shadow">
                      {admin ? <button onClick={handleOnClick}  className='delete-x' name="work-order">X</button>:null} 
                      <div className="card-header">
                        <strong>Date: {date(workOrder.date)}</strong> <br/>
                        <strong> Job Title: {workOrder.title}</strong> 
                      </div>
                      <div className=""> 
                        { admin || !user?.user_id && belongToCurrentUser?<EditWorkOrder buildings={buildings} employees={employees} workOrder={workOrder}/>:null}
                      </div> 
                      <div className="card-body">
                        <span>Created date: {date(workOrder.created_at)}</span> <br/>
                        <span>Last time updated: {date(workOrder.updated_at)}</span> 
                        <div>
                          {workOrderEmployees()}
                        </div>
                        {workOrder.building?<Link to={`/buildings/${workOrder.building.id}`}>{workOrder.building.address} </Link> :null} <br/>
                        {workOrder.building?<strong>Contact: {workOrder.building.super_name}</strong>:null}<br/>
                        <strong>Unit: {workOrder.unit}</strong> <br/>
                        {workOrder.building?<a href={`tel:${workOrder.building.phone_number}`}><span className="bottom">{workOrder.building.phone_number}</span></a> :null}
                        <br/>
                        <div className="nav-item">
                          <Link to={`/work_orders/${workOrder.id}/receipts`}>Material receipts</Link> {receiptAmount()}
                          <br></br>
                          <Link to={`/work_orders/${workOrder.id}/gallery`}>Project gallery</Link> 
                        </div>
                        <div className="center"> 
                          {!!userWorkorder() || admin ? <CloseWorkOrder />:null}  
                        </div>  
                        <br/>
                        <div className="task-container center">
                            { workOrder.id ?<TasksContainer userWorkorder={userWorkorder} workOrder={workOrder} user={user} admin={admin}/>:null}
                        </div>  
                      </div> 
                </div>
              </div> 
              <br/><br/>
            <div>
                {user ? <CommentsContainer  user={user} admin={admin}/>:null}
            </div>
        </section>
    )
};

const mapStateToProps = state => { 
    return {
      receipts: state.receipts.receipts,
      errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
      user: state.user.user,
      workOrder: state.workOrder.workOrder,
      workOrders: state.workOrders.workOrders,
      index: state.workOrderIndex.workOrderIndex
    }
}

const mapDispatchToProps = dispatch => {
    return {
    getFetchAction: (action) => dispatch(getFetchAction(action)),
    deleteWorkOrder: (action) => dispatch(deleteWorkOrder(action)),
    removeEmployee: (action) => dispatch(removeEmployee(action)),
    }
}

export default connect(mapStateToProps ,mapDispatchToProps )(WorkOrderDetails)
