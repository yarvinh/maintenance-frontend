
import {Navigate} from 'react-router-dom'
import {useSelector } from 'react-redux'; 
import CreateEmployees from "../employees/CreateEmployees"
import LogIn from '../users/LogIn';


const HomeWithoutLogin = ({fetchAppContent}) => {
  const errorsOrMessages = useSelector(state => state.errorsOrMessages.errorsOrMessages)
  if (errorsOrMessages.msg?.includes("Account was successfully created" )){
    return <Navigate to='/login'/>
  } else {
    return(
      <section className="no-login-home">
        <section className='home-links-container'>
          <div className='personal-account-form'>
            <CreateEmployees/>
          </div>
          <div className="login-section">
            <LogIn  fetchAppContent={fetchAppContent}/>
          </div>
        </section>
      </section>
    )
  }
}

export default HomeWithoutLogin