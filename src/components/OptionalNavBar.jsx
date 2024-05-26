import {Link} from 'react-router-dom'
import { connect } from "react-redux"

const OptionalNavBar = (props) => {
    const {user} = props
    const {admin} = user
    return(
        <nav className="navbar navbar-expand-lg navbar navbar-dark bg-primary bg-lightnavbar">
              
              <div className="container-fluid">
                <div className='center'>
                   {user.profile_image && <img src={user.profile_image} className="bg-info rounded-circle profile_image" ></img>}
                   {user.is_login && user.profile_image && <p className="profile-name" >{admin ? user.user.name: user.user.name} </p>}
                   {user.is_login && !user.profile_image && <strong >{admin ? user.user.name : user.user.name} </strong>}
                </div>
                <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                       <Link to='/' className="nav-link custom-nav-link">Home</Link>
                    </li>
                    <li className="nav-item">
                      {admin && user.user?.id && <Link to={`/settings/${user.user.id}`} className="nav-link custom-nav-link">Settings</Link>}
                    </li>
                    <li className="nav-item">
                      {user.user?.id && !admin && <Link to={`/employee_setting/${user.user.id}`} className="nav-link custom-nav-link">Settings</Link>}
                    </li>
                    <li className="nav-item">
                    {user.is_login && <Link to='/buildings' className="nav-link custom-nav-link">Buildings</Link>}
                    </li>
                    <li className="nav-item">
                      {user.is_login && <Link to='/work_orders' className="nav-link custom-nav-link">Work Orders</Link>}
                    </li>
                    <li className="nav-item">
                       {user.is_login && !user.admin && <Link to='/my_work_orders' className="nav-link custom-nav-link">My Work Orders</Link>}
                    </li>
                    <li className="nav-item">
                      {user.is_login && <Link to='/employees' className="nav-link custom-nav-link">Employees</Link>}
                    </li>

                    <li className="nav-item">
                      {user.is_login && <Link to='/documentation' className="nav-link custom-nav-link">Documentation</Link>}
                    </li>
                    <li className="nav-item">
                      {!user.is_login? <Link to='/business/login' className="nav-link custom-nav-link">Sign In As a Business</Link>:  <Link to='signout' className="nav-link custom-nav-link">Sign Out</Link>  }
                    </li>
                    <li className="nav-item">
                      {!user.is_login && <Link to='/login' className="nav-link custom-nav-link">Sign In</Link>}
                    </li>
                    <li className="nav-item">
                      {!user.is_login && <Link to='/signup' className="nav-link custom-nav-link">Sign Up</Link>}
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
    )
}

const mapStateToProps = state => { 
    return {
      acordion: state.acordion.acordion,
      user: state.user.user,
      workOrders: state.workOrders.workOrders,
    }
  }
   
export default connect(mapStateToProps, null)(OptionalNavBar)