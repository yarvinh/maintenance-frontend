import { connect } from "react-redux"
import { currentUserWorkOrders } from "../../componentsHelpers/workOrdersHelper"
import WorkOrdersContainer from "../../containers/WorkOrdersContainer"
const MyWorkOrders=(props)=>{
  const   {user, workOrders} = props
  const myWorkOrders = currentUserWorkOrders({user: user, workOrders: workOrders})
  return(
    <div>
      <WorkOrdersContainer  workOrders={myWorkOrders} />
    </div>
  )
}


const mapStateToProps = state => { 
    return {
      user: state.user.user,
      workOrders: state.workOrders.workOrders,
    }
}
   

  export default connect(mapStateToProps, null)(MyWorkOrders)
  