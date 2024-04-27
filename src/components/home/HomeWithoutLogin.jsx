
import {Link,Navigate} from 'react-router-dom'
import { connect } from 'react-redux'; 
import CreateEmployees from "../employees/CreateEmployees"
import LogIn from '../users/LogIn';


const HomeWithoutLogin = (props) => {
  const {errorsOrMessages,fetchAppContent} = props
  // console.log(errorsOrMessages)
  if (errorsOrMessages.msg?.includes("Account was successfully created" )){
    return <Navigate to='/login'/>
  } else {
    return(
      <div className="no-login-home">
        <section className='home-links-container'>
          <section className='personal-account-form'>
            <CreateEmployees/>
          </section>
          <section className="login-section">
            <LogIn  fetchAppContent={fetchAppContent}/>
          </section>
        </section>
        
        <section className='try-it-container'>
          <p className='try-it'>
            <strong style={{color: "black"}}>Do you want to see how this app works ? </strong><br></br>
            <Link to='/try_it_yourself' className="home-links" > Try it yourself</Link>  
          </p>
        </section>
  
      </div>
    )
  }
}

const mapStateToProps = state => { 
  return {
    user: state.user.user,
    // errorsOrMessages: state.errorsOrMessages.errorsOrMessages
  }
}


export default connect(mapStateToProps,null)(HomeWithoutLogin)