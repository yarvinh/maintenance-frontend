import { connect } from 'react-redux';
import WorkOrdersContainer from "../../containers/WorkOrdersContainer"
import { pendingUserWorkOrders } from '../../componentsHelpers/workOrdersHelper';
import { getFetchAction } from '../../actions/fetchActions';

const Home = (props)=>{
    const {user,workOrders} = props
    const pendingWorkOrders = pendingUserWorkOrders({workOrders: workOrders,user: user})

    return (
      <section>
          <WorkOrdersContainer fromHome={true} workOrders={pendingWorkOrders}/>
      </section>
    )
}

const mapStateToProps = state => { 
  return {
    errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
    user: state.user.user,
    workOrders: state.workOrders.workOrders,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFetchAction: action => dispatch(getFetchAction(action))
  }
}
 

export default connect(mapStateToProps, mapDispatchToProps)(Home)