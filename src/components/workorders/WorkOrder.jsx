import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import '../../styles/styles.css'
import {workOrderStatus,statusForMobiles} from "../../componentsHelpers/workOrdersHelper"
import {editWorkOrder,deleteWorkOrder,workOrderIndex} from '../../actions/workOrdersActions'
import {date} from '../../componentsHelpers/date'

const WorkOrder = (props) => {
    let {workOrder,workOrders,index,workOrderIndex} = props
    const {user,admin} = props.user

    const acceptedWorkOrder = ()=>{
        const currentEmployee = workOrder.employees.find(emp => emp.id === user.id)
        return  !workOrder.accepted && currentEmployee || !workOrder.accepted && admin ? "notifications"  : "accepted"
    }

    const workOrderEmployees=()=>{
        return workOrder.employees.map((employee)=>{
            return (
                <li key={employee.id}>
                   <Link to={`/employees/${employee.id}`}>{employee.name}</Link>
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
          props.editWorkOrder({workOrders: workOrders, workOrder: {accepted: true, id: workOrder.id?.toString() }})
        }
    }

    return (  
        <>
            <tr className={acceptedWorkOrder() +" "+ statusForMobiles(workOrder)}>
                <th scope="row">{props.index}</th>
                <td>  
                    <p>{date(workOrder.date)}</p>
                </td>   
                <td className="work_order_address"><Link to={`/buildings/${workOrder.building_id}`}><p>{workOrder.building? workOrder.building.address: "Missing"}</p> </Link></td>
                <td>
                    <Link to={`/work_orders/${workOrder.id}`}> 
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
        editWorkOrder: (action) => dispatch(editWorkOrder(action)),
        deleteWorkOrder: (action) => dispatch(deleteWorkOrder(action)),
        workOrderIndex: (action) => dispatch(workOrderIndex(action))
    }   
}   
      
export default connect(null, mapDispatchToProps)(WorkOrder)