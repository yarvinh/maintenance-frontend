import { useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'


const NoLoginBar = ()=>{
    const user = useSelector(state => state.user.user)
    return (
      <>
        <li className="nav-bar-links display">
          <NavLink className={({isActive})=> isActive ? "navlink-active" : "nav-bar-links"} to='/' >Home</NavLink>
        </li>
        <li className="nav-bar-links display">
          <NavLink className={({isActive})=> isActive ? "navlink-active" : "nav-bar-links"} to='/business/login' >Sign in as a business</NavLink>
        </li>
        <li className="nav-bar-links display">
          <NavLink className={({isActive})=> isActive ? "navlink-active" : "nav-bar-links"} to='/login' >Sign in</NavLink>
        </li>
        <li className="nav-bar-links display">
          {!user.is_login && <NavLink className={({isActive})=> isActive ? "navlink-active" : "nav-bar-links"} to='/signup'>Sign up</NavLink>}
        </li>
      </>
    )
  }

export default NoLoginBar