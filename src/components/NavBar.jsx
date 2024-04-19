
// import '../styles/navbar.css';
// import {Link} from 'react-router-dom'
// import { connect } from "react-redux"
// import NavBarButton from './NavBarButton'
// // import React, {useState} from 'react'
// import { isLoginToken } from '../componentsHelpers/token'
// import {displayBarAccordion} from '../componentsHelpers/acordion'
// const NavBar = (props) => {
//    const {user,acordion} = props
//     const {admin} = user
//     const noLoginBar = ()=>{
//       return (
//         <>
//           <li className="bar-item  bar-accordion">
//             <Link to='/business/login' className="bar-item ">Sign in as a business</Link>
//           </li>
//           <li className="bar-item  bar-accordion">
//             <Link to='/login' className="bar-item ">Sign in</Link>
//           </li>
//           <li className="bar-item  bar-accordion">
//             {!user.is_login? <Link to='/signup' className="bar-item">Sign up</Link>: null}
//           </li>
//         </>
//       )
//     }
//     const loginBar = ()=>{
//       return (
//             <>
//               <li className="bar-item bar-accordion">
//                 {admin && user.user?.id? <Link to={`/settings/${user.user.id}`} className="bar-item">Settings</Link>: null}
//               </li>
//               <li className="bar-item  bar-accordion">
//                 {user.user?.id && !admin ? <Link to={`/employee_setting/${user.user.id}`} className="bar-item">Settings</Link>: null}
//               </li>
//               <li className="bar-item  bar-accordion">
//                 <Link to='/buildings' className="bar-item">Buildings</Link>
//               </li>
//               <li className="bar-item  bar-accordion">
//                 <Link to='/work_orders' className="bar-item">Work Orders</Link>
//               </li>
//               <li className="bar-item  bar-accordion">
//                 {!user.admin? <Link to='/my_work_orders' className="bar-item">My Work Orders</Link>: null}
//               </li>
//               <li className="bar-item  bar-accordion">
//                 <Link to='/employees' className="bar-item">Employees</Link>
//               </li>
//               <li className="bar-item  bar-accordion">
//                 <Link to='/documentation' className="bar-item">Documentation</Link>
//               </li>
//               <li className="bar-item  bar-accordion">
//                 <Link to='signout' className="bar-item">Sign Out</Link> 
//               </li>
//           </>
//       )
//     }
//     const navManu=()=>{
//       return(              
//       <div id="nav-links"  className={`${displayBarAccordion("display-nav-bar",acordion)} bar-accordion`}>
//       <div className="var-menu bar-accordion" id="p">
//         <ul className="bar-menu-list bar-accordion">
//           <li className="bar-item bar-accordion">
//             <Link to='/' className="bar-item">Home</Link>
//            </li>
//           {isLoginToken()?loginBar():noLoginBar()}
//           <div className=''>
//             <div className='bar-lines-width'></div>
//             <div className='bar-lines-width'></div>
//             <div className='bar-lines-width'></div>
//           </div>
//         </ul>
//       </div>
//     </div>)
//     }
   
//     return(
//       <header>
//         <nav className="nav-bar">
//               <div className='acordion-bar'>
//                 <div className='profile-container  bar-accordion'>
//                    <NavBarButton/>
//                    {user.profile_image? <img src={user.profile_image} className="profile-image  bar-accordion" ></img> : user.is_login ? <img src="/nyc.ico"  className="profile-image  bar-accordion" ></img> : <div className="bar-with-no-login bar-accordion" ></div>}
//                    {user.is_login && user.profile_image? <p className="profile_name  bar-accordion">{admin ? user.user.name: user.user.name} </p>:null}
//                    {user.is_login && !user.profile_image? <p className='profile_name  bar-accordion'>{admin ? user.user.name : user.user.name} </p>:null}
//                    { navManu()}
//                 </div>
//               </div>
//         </nav>
//       </header>
//     )
// }

// const mapStateToProps = state => { 
//     return {
//       acordion: state.acordion.acordion,
//       user: state.user.user,
//       workOrders: state.workOrders.workOrders,
//     }
//   }
   
// export default connect(mapStateToProps, null)(NavBar)