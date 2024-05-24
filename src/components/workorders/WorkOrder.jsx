import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import '../../styles/styles.css'
import {workOrderStatus,statusForMobiles} from "../../componentsHelpers/workOrdersHelper"
import {deleteWorkOrder,workOrderIndex} from '../../actions/workOrdersActions'
import {date} from '../../componentsHelpers/date'
import { patchFetchAction } from '../../actions/fetchActions';
const WorkOrder = (props) => {
    let {workOrder,workOrders,index,workOrderIndex} = props
    const {user,admin} = props.user
    const acceptedWorkOrder = ()=>{
        const currentEmployee = workOrder.employees.find(emp => emp.id === user.id)
        return  !workOrder.accepted && currentEmployee || !workOrder.accepted && admin ? "pending-work-orders"  : "accepted"
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
        const confirmBox = window.confirm(
        "Are you sure you want to delete this work order?  you will lose all comments and ryplies on this work Order!"     
        )
        if (confirmBox === true) {
            props.deleteWorkOrder(workOrder.id)  
        }   
    }

    const handleOnClick=(e)=>{  
        workOrderIndex(index)
        if (acceptedWorkOrder() !== 'accepted' && !admin){
            props.patchFetchAction({
                path: `/work_orders/${workOrder.id}`,
                id: workOrder.id?.toString(),
                stateName:{itemName: "workOrder", arrayName: "workOrders"} ,
                type: {addItemToArray: "ADD_WORK_ORDERS", addItem: "ADD_WORK_ORDER"}, 
                params: {payload: {accepted: true}, array: workOrders}
            })
        }
    }

    return (  
        <>
            <tr className={acceptedWorkOrder() +" "+ statusForMobiles(workOrder)}>
                <th scope="row">{props.index}</th>
                <td>  
                    <p>{date(workOrder.date)}</p>
                </td>   
                <td className="work_order_address"><Link to={`/buildings/${workOrder.building_id}`} className="links"><p>{workOrder.building? workOrder.building.address: "Missing"}</p> </Link></td>
                <td>
                    <Link to={`/work_orders/${workOrder.id}`} className="links"> 
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
                    {admin ? <i onClick={handleDeleteOnClick}  className="fa-solid fa-trash-can delete-task "></i>:null} 
                </td>
            </tr>
        </>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        patchFetchAction: (action) => dispatch(patchFetchAction(action)),
        deleteWorkOrder: (action) => dispatch(deleteWorkOrder(action)),
        workOrderIndex: (action) => dispatch(workOrderIndex(action))
    }   
}   
      
export default connect(null, mapDispatchToProps)(WorkOrder)