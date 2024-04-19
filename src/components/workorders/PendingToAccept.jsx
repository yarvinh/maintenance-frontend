import WorkOrdersContainer from "../../containers/WorkOrdersContainer"
import { connect } from "react-redux"
import { currentUserWorkOrders } from "../../componentsHelpers/workOrdersHelper"
const PendingToAccept = (props)=>{

  const workOrders = currentUserWorkOrders({workOrders: props.workOrders, user: props.user})?.filter(wo => !wo.accepted)
    return (
        <WorkOrdersContainer workOrders={workOrders}/>
    )
}

const mapStateToProps = state => { 
  return {
    workOrders: state.workOrders.workOrders,
    user: state.user.user
  }
}
 

export default connect(mapStateToProps, null)(PendingToAccept)