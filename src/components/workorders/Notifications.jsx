import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import '../../styles/styles.css'
import {currentUserWorkOrders} from '../../componentsHelpers/workOrdersHelper'

const Notification = (props)=>{
    let {workOrders,user} = props
    const acceptedWorkOrders = currentUserWorkOrders({workOrders: workOrders, user: user})?.filter(wo => !wo.accepted)
    
    if (acceptedWorkOrders?.length > 0){
      return (
        <div className="notifications">
            <Link to={'/pending_to_accept'} className="notifications">   
              <p>You Have {acceptedWorkOrders.length} new workOrder{acceptedWorkOrders.length > 1?"s":null}</p> 
            </Link>
        </div>
      )
    } else {
      return (
        <>
        </>
      )
    }
};

const mapStateToProps = state => { 
  return {
    workOrder: state.workOrder.workOrder,
    user: state.user.user,
    workOrders: state.workOrders.workOrders,
  }
}
 

export default connect(mapStateToProps, null)(Notification)