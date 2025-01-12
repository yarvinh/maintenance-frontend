import {useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react';
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
import EmailValidation from './components/users/EmailValidation';
import GalleryContainer from './containers/GalleryContainer';
import UnitDetails from "./components/units/UnitDetails"
import EditEmployee from './components/employees/EditEmployee';
import MyWorkOrders from './components/workorders/MyWorkOrders';
import HomeContainer from './containers/HomeContainer';
import PendingToAccept from './components/workorders/PendingToAccept';
import TryItYourself from './components/tryItYourself';
import { getFetchAction } from './actions/fetchActions';
import { CURRENT_USER_SETTER, WORKORDERS_SETTER } from './componentsHelpers/fetchingConstants';
import HpdComplaintsContainer from './containers/HpdComplaintsContainer';
import Layout from './components/Layout';
import SanitationContainer from './containers/SanitationContainer';
import NoMatch from './components/NoMatch';
import NewUserInstructions from './components/users/NewUserInstructions';
import { isLoginToken } from './componentsHelpers/token';

const App  = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const workOrders = useSelector(state=> state.workOrders.workOrders)

  useEffect(() => {
    !user.is_login && isLoginToken() && dispatch(getFetchAction(CURRENT_USER_SETTER))
    user.is_login && dispatch(getFetchAction(WORKORDERS_SETTER))
  },[user.is_login , dispatch]); 
  return (
    <BrowserRouter >
          <Routes>
            <Route path="/" element={<Layout user={user}/> }>
              <Route index element={<HomeContainer/>} /> 
              <Route path='login' element={<LogIn admin={false}/>} />
              <Route path='business/login' element={<LogIn admin={true} />} />
              <Route path='signup'  element={<SignUp />}/> 
              <Route path='username_recovery' element={<ForgotUsername/>} />
              <Route path='verifying_email' element={<EmailValidation/>} />
              <Route path='password_recovery' element={<ForgotPassword/>} />
              <Route path='reset_password' element={<ResetPassword/>} /> 
              <Route path='signout' element={<LogOut/>}/>
              <Route path='settings/:id' element={<Settings />}/>
              <Route path='documentation' element={<Documentation/>}/>
              <Route path='try_it_yourself' element={<TryItYourself/>} /> 
              <Route path='employees'  element={<EmployeesContainer />}/>
              <Route path='employees/:employeeId' element={<EmployeeDetails />}/>
              <Route path='employee_setting/:id' element={<EditEmployee/> }/> 
              <Route path='work_orders'  element={<WorkOdersContainer fromHome={true} workOrders={workOrders} />}/>
              <Route path='my_work_orders' element={<MyWorkOrders />}/>
              <Route path='work_orders/:workOrderId/receipts' element={<ReceiptsContainer/>}/>
              <Route path='work_orders/:workOrderId/gallery' element={<GalleryContainer/> }/>
              <Route path='work_orders/:workOrderId' element={<WorkOrderDetail/>}/>
              <Route path='pending_to_accept' element={<PendingToAccept/>} /> 
              <Route path='buildings'  element={<BuildingsContainer/>}/>
              <Route path='buildings/:buildingId/*' element={<BuildingDetail />}/>
              <Route path="buildings/:buildingId/units/:unitId/" element={<UnitDetails/>}/>
              <Route path='buildings/:bin/dob_violations' element={<DOBviolationsContainer/>}/>
              <Route path='buildings/:bin/hpd_complaints' element={<HpdComplaintsContainer/>}/>
              <Route path='buildings/:lot/hpd_violations/:block' element={<HPDviolationsContainer/>}/>
              <Route path='buildings/:lot/:block/sanitation_violations' element={<SanitationContainer/>}/> 
              <Route path="*" element={<NoMatch />} /> 
              <Route path="new_user" element={<NewUserInstructions/>}/>
            </Route>
          </Routes>
    </BrowserRouter>    
  ); 
}

export default App


