import {Link} from 'react-router-dom'
import { connect } from "react-redux"

const noLoginBar = (props)=>{
    const {user} = props
    return (
      <>
        <li className="bar-item bar-accordion">
          <Link to='/' className="bar-item exit-email-verification">Home</Link>
        </li>
        <li className="bar-item  bar-accordion">
          <Link to='/business/login' className="bar-item exit-email-verification">Sign in as a business</Link>
        </li>
        <li className="bar-item  bar-accordion">
          <Link to='/login' className="bar-item exit-email-verification">Sign in</Link>
        </li>
        <li className="bar-item  bar-accordion">
          {!user.is_login && <Link to='/signup' className="bar-item exit-email-verification">Sign up</Link>}
        </li>
      </>
    )
  }

const mapStateToProps = state => { 
    return {
      accordion: state.accordion.accordion,
      user: state.user.user,
      workOrders: state.workOrders.workOrders,
    }
}
   
export default connect(mapStateToProps, null)(noLoginBar)