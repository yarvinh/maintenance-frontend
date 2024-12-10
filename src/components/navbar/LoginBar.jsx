import {NavLink} from 'react-router-dom'
import { useSelector } from "react-redux"

const LoginBar = () =>{
  const user = useSelector(state => state.user.user)
  const {admin} = user
  
    return (
          <>
            <li className="nav-bar-links display nav-li-link">
              <NavLink className={({isActive})=> isActive ? "navlink-active" : "nav-bar-links"} to='/' >Home</NavLink>
            </li>
            <li className="nav-bar-links display nav-li-link">
              {admin && user.user?.id && <NavLink className={({isActive})=> isActive ? "navlink-active" : "nav-bar-links"} to={`/settings/${user.user.id}`} >Settings</NavLink>}
            </li>
            <li className="nav-bar-links display nav-li-link">
              {user.user?.id && !admin && <NavLink to={`/employee_setting/${user.user.id}`} className={({isActive})=> isActive ? "navlink-active" : "nav-bar-links"}>Settings</NavLink>}
            </li>
            <li className="nav-bar-links display nav-li-link">
              <NavLink to='/buildings' className={({isActive})=> isActive ? "navlink-active " : "nav-bar-links"}>Buildings</NavLink>
            </li>
            <li className="nav-bar-links display nav-li-link">
              <NavLink to='/work_orders' className={({isActive})=> isActive ? "navlink-active " : "nav-bar-links"}>Work Orders</NavLink>
            </li>
            <li className="nav-bar-links display nav-li-link">
              {!user.admin && <NavLink to='/my_work_orders' className={({isActive})=> isActive ? "navlink-active" : "nav-bar-links"}>My Work Orders</NavLink>}
            </li>
            <li className="nav-bar-links display nav-li-link">
              <NavLink to='/employees' className={({isActive})=> isActive ? "navlink-active" : "nav-bar-links"}>Employees</NavLink>
            </li>
            <li className="nav-bar-links display nav-li-link">
              <NavLink to='/documentation' className={({isActive})=> isActive ? "navlink-active" : "nav-bar-links"}>Documentation</NavLink>
            </li>
            <li className="nav-bar-links display nav-li-link">
              <NavLink to='signout' className={({isActive})=> isActive ? "navlink-active" : "nav-bar-links"}>Sign Out</NavLink> 
            </li>
        </>
    )
}
   
export default LoginBar