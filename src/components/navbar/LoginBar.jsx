import {Link} from 'react-router-dom'
import { useSelector } from "react-redux"

const LoginBar = () =>{
  const user = useSelector(state => state.user.user)
  const {admin} = user
  
    return (
          <>
            <li className="nav-bar-links display nav-li-link">
              <Link to='/' className="nav-bar-links">Home</Link>
            </li>
            <li className="nav-bar-links display nav-li-link">
              {admin && user.user?.id && <Link to={`/settings/${user.user.id}`} className="nav-bar-links">Settings</Link>}
            </li>
            <li className="nav-bar-links display nav-li-link">
              {user.user?.id && !admin && <Link to={`/employee_setting/${user.user.id}`} className="nav-bar-links">Settings</Link>}
            </li>
            <li className="nav-bar-links display nav-li-link">
              <Link to='/buildings' className="nav-bar-links">Buildings</Link>
            </li>
            <li className="nav-bar-links display nav-li-link">
              <Link to='/work_orders' className="nav-bar-links">Work Orders</Link>
            </li>
            <li className="nav-bar-links display nav-li-link">
              {!user.admin && <Link to='/my_work_orders' className="nav-bar-links">My Work Orders</Link>}
            </li>
            <li className="nav-bar-links display nav-li-link">
              <Link to='/employees' className="nav-bar-links">Employees</Link>
            </li>
            <li className="nav-bar-links display nav-li-link">
              <Link to='/documentation' className="nav-bar-links">Documentation</Link>
            </li>
            <li className="nav-bar-links display nav-li-link">
              <Link to='signout' className="nav-bar-links">Sign Out</Link> 
            </li>
        </>
    )
}
   
export default LoginBar