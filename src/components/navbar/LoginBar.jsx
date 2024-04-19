import {Link} from 'react-router-dom'
import { connect } from "react-redux"

const loginBar = (props)=>{
  const {user} = props
  const {admin} = user
    return (
          <>
            <li className="bar-item bar-accordion">
              <Link to='/' className="bar-item">Home</Link>
            </li>
            <li className="bar-item bar-accordion">
              {admin && user.user?.id? <Link to={`/settings/${user.user.id}`} className="bar-item">Settings</Link>: null}
            </li>
            <li className="bar-item  bar-accordion">
              {user.user?.id && !admin ? <Link to={`/employee_setting/${user.user.id}`} className="bar-item">Settings</Link>: null}
            </li>
            <li className="bar-item  bar-accordion">
              <Link to='/buildings' className="bar-item">Buildings</Link>
            </li>
            <li className="bar-item  bar-accordion">
              <Link to='/work_orders' className="bar-item">Work Orders</Link>
            </li>
            <li className="bar-item  bar-accordion">
              {!user.admin? <Link to='/my_work_orders' className="bar-item">My Work Orders</Link>: null}
            </li>
            <li className="bar-item  bar-accordion">
              <Link to='/employees' className="bar-item">Employees</Link>
            </li>
            <li className="bar-item  bar-accordion">
              <Link to='/documentation' className="bar-item">Documentation</Link>
            </li>
            <li className="bar-item  bar-accordion">
              <Link to='signout' className="bar-item">Sign Out</Link> 
            </li>
        </>
    )
  }

const mapStateToProps = state => { 
    return {
      acordion: state.acordion.acordion,
      user: state.user.user,
      workOrders: state.workOrders.workOrders,
    }
  }
   
export default connect(mapStateToProps, null)(loginBar)