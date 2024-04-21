
import { connect } from 'react-redux';
import {useEffect ,useRef} from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import LogOut from './components/users/LogOut'
import LogIn from './components/users/LogIn'
import ResetPassword from './components/users/ResetPassword'
import ForgotPassword from './components/users/ForgotPassword'
import ForgotUsername from './components/users/ForgotUsername'
import Settings from './components/users/Settings'
import EmployeeDetails from './components/employees/EmployeeDetails'
import BuildingDetail from './components/buildings/BuildingDetail'
import DOBviolationsContainer from './containers/DOBviolationsContainer'
import HPDviolationsContainer from './containers/HPDviolationsContainer'
import EmployeesContainer from './containers/EmployeesContainer'
import WorkOdersContainer from './containers/WorkOrdersContainer'
import BuildingsContainer from './containers/BuildingsContainer'
import ReceiptsContainer from './containers/ReceiptsContainer'
import { setVerificationSession } from './actions/usersActions'
import SignUp from './components/users/SignUp'
import './styles/styles.css'
import WorkOrderDetail from './components/workorders/WorkOrderDetail';
import Documentation from './components/Documentation';
import Notification from './components/workorders/Notifications';
import EmailValidation from './components/users/EmailValidation';
import GalleryContainer from './containers/GalleryContainer';
import UnitDetails from "./components/units/UnitDetails"
import EditEmployee from './components/employees/EditEmployee';
import {acordionDisplay,barAccordionDisplay} from './componentsHelpers/acordion'
import MyWorkOrders from './components/workorders/MyWorkOrders';
import HomeContainer from './containers/HomeContainer';
import PendingToAccept from './components/workorders/PendingToAccept';
import TryItYourself from './components/tryItYourself';
import NavBarContainer from './containers/NavBarContainer';
import {verificationSessionToken,removeLoginToken} from "./componentsHelpers/token"
import Anime from "./components/Anime"
import { getFetchAction } from './actions/fetchActions';
import { fetchAppContent,fetchCurrentUser } from './componentsHelpers/fetching';
import NewUserNotification from './components/users/NewUserNotification';

const App  = (props) => {
  let { user ,workOrders,acordion,userLoading,verificationSession} = props
  const fetchTimesRef = useRef(1)

  const handleOnAcordion = (e)=>{
    const approveAcordion =  e.target.className.includes('display_accordion') 
    || (!e.target.className.includes('acordion')) 
    && (acordion.acordion === 'display_accordion active')   

    if(verificationSessionToken() && verificationSession && e.target.className.includes('exit-email-verification')){
      removeLoginToken()
      props.setVerificationSession()
      props.barAccordionDisplay({element: e, acordion: acordion})  
    }else if ( approveAcordion ){
      props.acordionDisplay({element: e, acordion: acordion})
    }else if(e.target.className.includes('display-nav-bar')  || (!e.target.className.includes('bar-accordion')) && (acordion.varAcordion === 'display-nav-bar hide')){
      props.barAccordionDisplay({element: e, acordion: acordion})  
    } 
  }
  useEffect(() => {
     fetchCurrentUser(props.getFetchAction)   
  },[] ); 

  useEffect(() => {
    if(fetchTimesRef.current === 1){
      fetchTimesRef.current += 1  
      fetchAppContent(props.getFetchAction) 
    }
  },[user] ); 

  if(!userLoading && !user.is_login) fetchTimesRef.current = 1  

  return (
    <BrowserRouter >
      <div onClick={handleOnAcordion} className="App text-font">
        <NavBarContainer/>
        <section>
          <div>
            {user.admin? <NewUserNotification/> : null}
            {user.is_login? <Notification/> :null }
          </div>
        </section>
        <main>
        <Routes>
            <Route exact path='/login' element={<LogIn admin={false}/>} />
            <Route exact path='/business/login' element={<LogIn admin={true} />} />
            <Route exact path='/signup'  element={<SignUp />}/> 
            <Route exact path='/' index element={<HomeContainer/>} /> 
            <Route exact path='/username_recovery' element={<ForgotUsername/>} />
            <Route exact path='/verifying_email' element={<EmailValidation/>} />
            <Route exact path='/password_recovery' element={<ForgotPassword/>} />
            <Route exact path='/reset_password' element={<ResetPassword/>} /> 
            <Route exact path='/signout' element={<LogOut/>}/>
            <Route exact path='/employees'  element={<EmployeesContainer />}/>
            <Route exact path='/buildings'  element={<BuildingsContainer/>}/>
            <Route exact path='/work_orders'  element={<WorkOdersContainer workOrders={workOrders} />}/>
            <Route exact path='/employees/:id' element={<EmployeeDetails />}/>
            <Route exact path='/my_work_orders' element={<MyWorkOrders />}/>
            <Route exact path='/buildings/:id/*' element={<BuildingDetail />}/>
            <Route exact path="/buildings/:building_id/units/:unit_id/" element={<UnitDetails/>}/>
            <Route exact path='/work_orders/:id' element={<WorkOrderDetail/>}/>
            <Route exact path='/settings/:id' element={<Settings />}/>
            <Route exact path='/documentation' element={<Documentation/>}/>
            <Route path='/buildings/:bin/dob_violations' element={<DOBviolationsContainer/>}/>
            <Route path='/buildings/:lot/hpd_violations/:block' element={<HPDviolationsContainer/>}/>
            <Route exact path='/work_orders/:id/receipts' element={<ReceiptsContainer/>}/>
            <Route exact path='/work_orders/:id/gallery' element={<GalleryContainer/> }/>
            <Route exact path='/employee_setting/:id' element={<EditEmployee/> }/>       
            <Route exact path='/pending_to_accept' element={<PendingToAccept/>} />   
            <Route exact path='/try_it_yourself' element={<TryItYourself/>} />   
            <Route exact path='/anime' element={<Anime/>} />   
        </Routes>
        </main>
      </div>  
    </BrowserRouter>    
  ); 
}

const mapStateToProps = state => { 
  return {
    verificationSession: state.user.user?.verification_session,
    userLoading: state.user.loading,
    acordion: state.acordion.acordion,
    employees: state.employees.employees,
    user: state.user.user,
    buildings: state.buildings.buildings,
    workOrders: state.workOrders.workOrders,
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    getFetchAction: action => dispatch(getFetchAction(action)),
    acordionDisplay: action => dispatch(acordionDisplay(action)),
    barAccordionDisplay: action => dispatch(barAccordionDisplay(action)),
    setVerificationSession: () => dispatch(setVerificationSession())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

