import {Link} from 'react-router-dom';
import {useSelector } from 'react-redux';
import '../../styles/styles.css'
import {currentUserWorkOrders} from '../../componentsHelpers/workOrdersHelper'

const Notification = ()=>{
    const workOrders = useSelector(state => state.workOrders.workOrders)
    const user = useSelector(state => state.user.user)
    const acceptedWorkOrders = currentUserWorkOrders({workOrders: workOrders, user: user})?.filter(wo => !wo.accepted)
    
    if (acceptedWorkOrders?.length > 0)
      return (
        <div className="notifications">
            <Link to={'/pending_to_accept'} className="notifications">   
              <p>You Have {acceptedWorkOrders.length} new workOrder{acceptedWorkOrders.length > 1 && "s"}</p> 
            </Link>
        </div>
      )
    else 
      return (
        <>
        </>
      )
};



export default Notification