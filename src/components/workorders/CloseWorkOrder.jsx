import {useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import '../../styles/styles.css'
import { patchFetchAction } from '../../actions/fetchActions';
const CloseWorkOrder = (props) => {
    const {id} = useParams()
    let {workOrder,workOrders} = props

    const workOrderStatus = () => {
        if (workOrder.status)
            return "Open Work Order"
        else 
            return "Close Work Order"
    }

    const buttonColor = () => {
        if (workOrder.status)
            return "inactive_color"
        else 
            return "active_color"
    }

    const handleOnClick = (e) => { 
        e.preventDefault()
       if (!workOrder.status){
            props.patchFetchAction({
                path: `/work_orders/${id}`,
                id: id,
                stateName:{itemName: "workOrder", arrayName: "workOrders"} ,
                type: {addItemToArray: "ADD_WORK_ORDERS", addItem: "ADD_WORK_ORDER"}, 
                params: {payload: {status: true}, array: workOrders}
            })
            e.target.value = "Open Work Order"
       } else {    
            props.patchFetchAction({
                path: `/work_orders/${id}`,
                id: id,
                stateName:{itemName: "workOrder", arrayName: "workOrders"} ,
                type: {addItemToArray: "ADD_WORK_ORDERS", addItem: "ADD_WORK_ORDER"}, 
                params: {payload: {status: false}, array: workOrders}
            })
            e.target.value = "Close Work Order"
       }
    }
    
    return (
        <div>
            <form onSubmit={handleOnClick}>
               <input  className={`work_order_button ${buttonColor()}`} type="submit" value={workOrderStatus()}/>
            </form>
        </div>
    )
}

const mapStateToProps = state => { 
    return {
      workOrder: state.workOrder.workOrder,
      workOrders: state.workOrders.workOrders,
    }
}



const mapDispatchToProps = dispatch => {
    return {
        patchFetchAction: (action) => dispatch(patchFetchAction(action))
    }
}   
      
export default connect(mapStateToProps , mapDispatchToProps)(CloseWorkOrder)