import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import WorkOrdersContainer from "../../containers/WorkOrdersContainer"
import { pendingUserWorkOrders } from '../../componentsHelpers/workOrdersHelper';
import { useEffect } from "react";
const Home = (props)=>{
    const {user,workOrders,fetchAppContent } = props
    const pendingWorkOrders = pendingUserWorkOrders({workOrders: workOrders,user: user})

    useEffect(()=>{
        fetchAppContent() 
    },[user.is_login])
    
    return (
      <div>
          <WorkOrdersContainer fromHome={true} workOrders={pendingWorkOrders}/>
          <br/>
          <br/>
          <br/>
          <div className='empty-space'></div>
      </div>
    )
}



const mapStateToProps = state => { 
  return {
    errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
    user: state.user.user,
    workOrders: state.workOrders.workOrders,
  }
}
 

export default connect(mapStateToProps, null)(Home)