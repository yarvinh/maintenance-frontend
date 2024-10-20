import {useDispatch, useSelector } from 'react-redux';
import {useEffect ,useRef} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
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
import SignUp from './components/users/SignUp'
import WorkOrderDetail from './components/workorders/WorkOrderDetail';
import Documentation from './components/Documentation';
import Notification from './components/workorders/Notifications';
import EmailValidation from './components/users/EmailValidation';
import GalleryContainer from './containers/GalleryContainer';
import UnitDetails from "./components/units/UnitDetails"
import EditEmployee from './components/employees/EditEmployee';
import { handleOnAccordion} from './componentsHelpers/accordion'
import MyWorkOrders from './components/workorders/MyWorkOrders';
import HomeContainer from './containers/HomeContainer';
import PendingToAccept from './components/workorders/PendingToAccept';
import TryItYourself from './components/tryItYourself';
import { getFetchAction } from './actions/fetchActions';
import { CURRENT_USER_SETTER, WORKORDERS_SETTER } from './componentsHelpers/fetchingConstants';
import Footer from './components/Footer';
import NavBackButton from './components/NavBackButton';
import HpdComplaintsContainer from './containers/HpdComplaintsContainer';
import ErrorsOrMsg from './components/ErrosOrMsg';
import NavBar from './components/navbar/NavBar';
import NavButton from './components/navbar/NavButton';
import { displayFormReceived } from './state/reducers/displayElementReducer';

const App  = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const workOrders = useSelector(state=> state.workOrders.workOrders)
  const displayForm = useSelector(state => state.isDisplay.formDisplay)
  const fetchTimesRef = useRef(1)
  const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)
  const isDisplay = useSelector(state=> state.isDisplay)
  const handleOnclick = (e) => {
    const payload = handleOnAccordion(displayForm.id)
    if (displayForm.buttonClass.includes("active") && !e.target.className.includes("accordion"))
      dispatch(displayFormReceived(payload))
  }

  useEffect(() => {
    dispatch(getFetchAction(CURRENT_USER_SETTER)  )
  },[] ); 

  useEffect(() => {
    if(fetchTimesRef.current === 1){
      fetchTimesRef.current += 1  
      dispatch(getFetchAction(WORKORDERS_SETTER) )
    }
  },[user] ); 
  if( !user.is_login) fetchTimesRef.current = 1  
  return (
    <BrowserRouter >
      <div  className="App text-font body">
        <section className={`${!isDisplay.isDisplay && isDisplay.className} pc-profile-inf `}>
          {user.profile_image  ? 
          <img src={user.profile_image} className={`profile-image  bar-accordion ${isDisplay.isDisplay && "hide-profile"}`} ></img> 
          : user.is_login ? <img src="/blank-profile-picture-973460_1280.webp"  className={`profile-image  bar-accordion ${isDisplay.isDisplay && "hide-profile"}`} ></img> 
          : <div className="bar-with-no-login bar-accordion" ></div>}
          {user.is_login && <strong className={`user-name ${isDisplay.isDisplay && "hide-profile"}`}> {user.user.name}</strong>}
          <NavButton/>
        </section>
        <NavBar isDisplay={isDisplay.isDisplay} loggedIn={user.is_login}/>
        {errorsOrMsg.from === "from_server" && <ErrorsOrMsg errors={errorsOrMsg?.errors || errorsOrMsg?.msg} />}
        <section>
          <div>
            {user.is_login && <Notification/> }
            {errorsOrMsg.from.includes("server") && <ErrorsOrMsg {...(errorsOrMsg.errors ? { errors: errorsOrMsg.errors } :{msg: errorsOrMsg.msg })} />}
          </div>
        </section>
        <main onClick={handleOnclick} >
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
              <Route exact path='/employees/:employeeId' element={<EmployeeDetails />}/>
              <Route exact path='/my_work_orders' element={<MyWorkOrders />}/>
              <Route exact path='/buildings/:buildingId/*' element={<BuildingDetail />}/>
              <Route exact path="/buildings/:buildingId/units/:unitId/" element={<UnitDetails/>}/>
              <Route exact path='/work_orders/:workOrderId' element={<WorkOrderDetail/>}/>
              <Route exact path='/settings/:id' element={<Settings />}/>
              <Route exact path='/documentation' element={<Documentation/>}/>
              <Route path='/buildings/:bin/dob_violations' element={<DOBviolationsContainer/>}/>
              <Route path='/buildings/:bin/hpd_complaints' element={<HpdComplaintsContainer/>}/>
              <Route path='/buildings/:lot/hpd_violations/:block' element={<HPDviolationsContainer/>}/>
              <Route exact path='/work_orders/:workOrderId/receipts' element={<ReceiptsContainer/>}/>
              <Route exact path='/work_orders/:workOrderId/gallery' element={<GalleryContainer/> }/>
              <Route exact path='/employee_setting/:id' element={<EditEmployee/> }/>       
              <Route exact path='/pending_to_accept' element={<PendingToAccept/>} />   
              <Route exact path='/try_it_yourself' element={<TryItYourself/>} />   
          </Routes>
          {(window.location.pathname !== "/") && <NavBackButton/>}
          <Footer/>
        </main>
      </div>  
    </BrowserRouter>    
  ); 
}

export default App


