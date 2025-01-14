import {useSelector } from 'react-redux';
import WorkOrdersContainer from "../../containers/WorkOrdersContainer"
import { pendingUserWorkOrders } from '../../componentsHelpers/workOrdersHelper';

const Home = ()=>{
    const user = useSelector(state =>  state.user.user)
    const workOrders = useSelector(state => state.workOrders.workOrders)
    const pendingWorkOrders = pendingUserWorkOrders({workOrders: workOrders,user: user})
    return (
      <section>
          <WorkOrdersContainer fromHome={true} workOrders={pendingWorkOrders}/>
      </section>
    )
}

export default Home