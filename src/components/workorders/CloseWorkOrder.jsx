import {useParams} from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import '../../styles/styles.css'
import { patchFetchAction } from '../../actions/fetchActions';
import { workOrderPatchSetter } from '../../componentsHelpers/fetchingFunctions';

const CloseWorkOrder = () => {
    const {workOrderId} = useParams()
    const dispatch = useDispatch()
    const workOrder = useSelector(state=> state.workOrder.workOrder)
  
    const workOrderStatus = () => {
        return workOrder.status ? "Open Work Order" : "Close Work Order"
    }

    const buttonColor = () => {
        return workOrder.status ? "inactive_color" : "active_color"
    }

    const handleOnClick = (e) => { 
        e.preventDefault()
       if (!workOrder.status){
            const payload = workOrderPatchSetter({id: workOrderId, payload: {status: true}})
            dispatch(patchFetchAction(payload))
            e.target.value = "Open Work Order"
       } else { 
            const payload = workOrderPatchSetter({id: workOrderId, payload: {status: false}})
            dispatch(patchFetchAction(payload))   
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
     
export default CloseWorkOrder