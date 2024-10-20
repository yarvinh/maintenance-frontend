import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'


const NoLoginBar = (props)=>{
    const user = useSelector(state => state.user.user)
    return (
      <>
        <li className="nav-bar-links display">
          <Link to='/' className="nav-bar-links exit-email-verification">Home</Link>
        </li>
        <li className="nav-bar-links display">
          <Link to='/business/login' className="nav-bar-links exit-email-verification">Sign in as a business</Link>
        </li>
        <li className="nav-bar-links display">
          <Link to='/login' className="nav-bar-links exit-email-verification">Sign in</Link>
        </li>
        <li className="nav-bar-links display">
          {!user.is_login && <Link to='/signup' className="nav-bar-links exit-email-verification">Sign up</Link>}
        </li>
      </>
    )
  }
 

export default NoLoginBar