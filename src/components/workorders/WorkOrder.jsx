import {Link} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../../styles/styles.css'
import {workOrderStatus,statusForMobiles} from "../../componentsHelpers/workOrdersHelper"
import {date} from '../../componentsHelpers/date'
import { deleteFetchAction, patchFetchAction } from '../../actions/fetchActions';
import { workOrderDeleteSetter, workOrderPatchSetter } from '../../componentsHelpers/fetchingFunctions';

const WorkOrder = ({workOrder,index,workOrderIndex,user}) => {
    const dispatch = useDispatch()
    const acceptedWorkOrder = ()=>{
        const currentEmployee = workOrder.employees.find(emp => emp.id === user.user.id)
        return  !workOrder.accepted && currentEmployee || !workOrder.accepted && user.admin ? "pending-work-orders"  : "accepted"
    }

    const workOrderEmployees=()=>{
        return workOrder.employees.map((employee)=>{
            return (
                <li key={employee.id} className="links">
                   <Link to={`/employees/${employee.id}`} className="links">{employee.name}</Link>
                </li>
            )
        })
    }

    const handleDeleteOnClick =  (e)=>{  
        const payload = workOrderDeleteSetter({id: workOrder.id})
        const confirmBox = window.confirm(
          "Are you sure you want to delete this work order?  you will lose all comments and ryplies on this work Order!"     
        )
        if (confirmBox === true) 
            dispatch(deleteFetchAction(payload))
    }

    const handleOnClick=(e)=>{  
        const payload = workOrderPatchSetter({id: workOrder.id, payload: {accepted: true}})
    
        if (acceptedWorkOrder() !== 'accepted' && !user.admin)
           dispatch(patchFetchAction(payload))
    }

    return (  
        <>
            <tr className={acceptedWorkOrder() +" "+ statusForMobiles(workOrder)}>
                <th scope="row">{index}</th>
                <td>  
                    <p>{date(workOrder.date)}</p>
                </td>   
                <td className="work_order_address"><Link to={`/buildings/${workOrder.building_id}`} className="links"><p>{workOrder.building? workOrder.building.address: "Missing"}</p> </Link></td>
                <td>
                    <Link to={`/work_orders/${workOrder.id}`} className="links"> 
                        <span>{workOrder.task_inventory_total}, {workOrder.receipts_total}</span>
                        <span onClick={handleOnClick}>{workOrder.title}, Unit: {workOrder.unit}</span>
                    </Link>   
                </td>
                <td>
                    <dd>
                      {workOrderEmployees()}
                    </dd>
                </td>
                <td className="work_order_status">  
                    {workOrderStatus(workOrder)}
                </td>
                <td className="work_order_status">
                    {user.admin && <i onClick={handleDeleteOnClick}  className="fa-solid fa-trash-can delete-task "></i>} 
                </td>
            </tr>
        </>
    )
};

export default WorkOrder