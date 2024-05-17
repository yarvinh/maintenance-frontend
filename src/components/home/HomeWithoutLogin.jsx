
import {Link,Navigate} from 'react-router-dom'
import { connect } from 'react-redux'; 
import CreateEmployees from "../employees/CreateEmployees"
import LogIn from '../users/LogIn';


const HomeWithoutLogin = ({errorsOrMessages,fetchAppContent}) => {
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
        
        <section className='try-it-container'>
          <p className='try-it'>
            <strong style={{color: "black"}}>Do you want to see how this app works ? </strong>
            <Link to='/try_it_yourself' className="white-blue-buttons" > Try it yourself</Link>  
          </p>
        </section>
  
      </section>
    )
  }
}

const mapStateToProps = state => { 
  return {
    user: state.user.user,
    errorsOrMessages: state.errorsOrMessages.errorsOrMessages
  }
}


export default connect(mapStateToProps,null)(HomeWithoutLogin)