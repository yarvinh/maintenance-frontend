import {useState} from 'react';
import { connect } from 'react-redux';
import {verifyEmail} from '../../actions/usersActions'
import {Navigate} from 'react-router-dom'
import {setVerificationSession,requestSecurityCode} from '../../actions/usersActions'
import Errors from '../Errors';

const EmailValidation = (props) => {
    const {errorsOrMessages} = props
    const [user, setUser] = useState({
      security_code: ""
    })
    const redirect =()=>{
      return <Navigate to='/'/>
    }
    const handleOnSubmit = (e) => {
        e.preventDefault()
        props.verifyEmail({user: user})
    }

    const handleOnChange = (e) => {
      setUser({
        ...user,[e.target.name]: e.target.value 
      })
    }

    const handleOnClick=(e)=>{
       props.requestSecurityCode()
    }
    
    return (
    <div>
      {props.user.is_login && redirect()}
      <div className="container d-flex justify-content-center align-items-center">
          <form onSubmit={handleOnSubmit} className="form">
              <label htmlFor="email-security-code" className="mt-5">Enter security code:</label>
              <input onChange={handleOnChange} id="email-security-code"  className="form-control" value={user.security_code} name="security_code" type='text'/> <br/>
              <button type='submit' className="btn btn-primary">Submit</button>
              <div className="center"> 
                {(errorsOrMessages.from === 'verify_email') || (errorsOrMessages.from ==="request_security_code") ? <Errors errorsOrMessages={errorsOrMessages}/> : null}
              </div>  
          </form>
      </div>
      <div className='get-new-code'>
        <label  htmlFor='get-new-security-code'> Didn't receive the code?</label>
        <button id="get-new-security-code" onClick={handleOnClick} className='standar-button'> Request new code</button>
      </div>
    </div>
    )  
};



const mapStateToProps = state => { 
    return {
      user: state.user.user,
      errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
    }
  }
   
  const mapDispatchToProps = dispatch => {
    return {
        verifyEmail: (action) => dispatch(verifyEmail(action)),
        setVerificationSession: () => dispatch(setVerificationSession()),
        requestSecurityCode: () => dispatch(requestSecurityCode())
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(EmailValidation )