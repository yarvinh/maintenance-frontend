import { connect, useSelector } from "react-redux"
import { currentUserWorkOrders } from "../../componentsHelpers/workOrdersHelper"
import WorkOrdersContainer from "../../containers/WorkOrdersContainer"
const MyWorkOrders=()=>{
  const user = useSelector(state => state.user.user)
  const workOrders = useSelector(state => state.workOrders.workOrders)
  const myWorkOrders = currentUserWorkOrders({user: user, workOrders: workOrders})
  return(
    <div>
      <WorkOrdersContainer  workOrders={myWorkOrders} />
    </div>
  )
}

export default MyWorkOrders
  