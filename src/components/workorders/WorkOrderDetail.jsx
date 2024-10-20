import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link,useParams,useNavigate} from 'react-router-dom';
import EditWorkOrder from "./EditWorkOrder"
import CommentsContainer from '../../containers/CommentsContainer'
import '../../styles/styles.css'
import CloseWorkOrder from './CloseWorkOrder';
import TasksContainer from '../../containers/TasksContainer';
import {date} from "../../componentsHelpers/date"
import { deleteFetchAction, getFetchAction} from '../../actions/fetchActions';
import { deleteEmployeeFromWorkOrder, workOrderDeleteSetter, workOrderGetSetter } from '../../componentsHelpers/fetchingFunctions';
import LoadingItems from '../LoadingItems';

const WorkOrderDetails = ({buildings,employees})=>{ 
    const {workOrderId} = useParams()
    let navigate = useNavigate()
    const dispatch = useDispatch()
    const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)
    const workOrder = useSelector(state => state.workOrder.workOrder)
    const user = useSelector(state => state.user.user)
    const loading = useSelector(state => state.workOrder.workOrderLoading)
    const {admin} = user
    const belongToCurrentUser = workOrder?.employees?.filter(emp => emp.id === user.user.id)[0]
    
    useEffect(()=>{
      const worOrderDoesNotExist =  errorsOrMsg.errors?.includes('Access to this comment was dinied')
      if(worOrderDoesNotExist )
        navigate('/work_orders') 
    },[errorsOrMsg])
   
    useEffect(()=>{
      const payload = workOrderGetSetter({id: workOrderId})
      dispatch(getFetchAction(payload))
    },[])

    const workOrderEmployees = ()=>{
      return workOrder.employees?.map((employee,index) => {
        return( 
          < div  key={index}>
             {admin && <button onClick={handleOnClick} name="employee" value={employee.id} className='delete-x'>X</button>} 
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
        const payload = deleteEmployeeFromWorkOrder({workOrderId: workOrderId, id: e.target.value})
        dispatch(deleteFetchAction(payload))
      }else if (confirmBox === true && e.target.name === "work-order"){
        const payload = workOrderDeleteSetter({id: workOrderId})
        dispatch(deleteFetchAction(payload))
        navigate('/work_orders')
      }   
    }

    return (
        <section className="work-order-detail "> 
            <div className="container d-flex"> 
                <div className="card-container mb-3 car-shadow">
                      {admin && <button onClick={handleOnClick}  className='delete-x' name="work-order">X</button>} 
                      <div className="card-header">
                        <strong>Date: {date(workOrder.date)}</strong> <br/>
                        <strong> Job Title: {workOrder.title}</strong> 
                      </div>
                      <div className=""> 
                        { admin || (!user?.user_id && belongToCurrentUser) ?  <EditWorkOrder buildings={buildings} employees={employees} workOrder={workOrder}/>:null}
                      </div> 
                      <div className="card-body">
                        <div className='hight'>
                          {loading && <LoadingItems/>}
                        </div>
                        <span>Created date: {date(workOrder.created_at)}</span> <br/>
                        <span>Last time updated: {date(workOrder.updated_at)}</span> 
                        <div>
                          {workOrderEmployees()}
                        </div>
                        {workOrder.building && <Link to={`/buildings/${workOrder.building.id}`}>{workOrder.building.address} </Link>} <br/>
                        {workOrder.building && <strong>Contact: {workOrder.building.super_name}</strong>}<br/>
                        <strong>Unit: {workOrder.unit}</strong> <br/>
                        {workOrder.building && <a href={`tel:${workOrder.building.phone_number}`}><span className="bottom">{workOrder.building.phone_number}</span></a>}
                        <br/>
                        <div className="nav-item">
                          <Link to={`/work_orders/${workOrder.id}/receipts`}>Material receipts</Link> {receiptAmount()}
                          <br></br>
                          <Link to={`/work_orders/${workOrder.id}/gallery`}>Project gallery. {workOrder.gallery_images_count} images</Link> 
                        </div>
                        <div className="center"> 
                          {!!userWorkorder() || admin ? <CloseWorkOrder />:null}  
                        </div>  
                        <br/>
                                                           {/* {game, currentUser,loggedIn} */}
                        <div className="task-container center">
                            { workOrder.id && <TasksContainer userWorkorder={userWorkorder} workOrder={workOrder} user={user} admin={admin}/>}
                        </div>  
                      </div>   
                </div> 
              </div> 
                {user && <CommentsContainer workOrder={workOrder} user={user}/>}
        </section>
    )
};

export default WorkOrderDetails
