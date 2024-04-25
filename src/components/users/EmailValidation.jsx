import React, {useState,useEffect } from 'react';
import { connect } from 'react-redux';
import {verifyEmail} from '../../actions/usersActions'
import {Navigate,Link} from 'react-router-dom'
import {setVerificationSession,requestSecurityCode} from '../../actions/usersActions'
import '../../styles/styles.css'

const EmailValidation = (props) => {
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
      {props.user.is_login? redirect(): null}
      <div className="container d-flex justify-content-center align-items-center">
          <form onSubmit={handleOnSubmit} className="form">
              <label htmlFor="email-security-code" className="mt-5">Enter security code:</label>
              <input onChange={handleOnChange} id="email-security-code"  className="form-control" value={user.security_code} name="security_code" type='text'/> <br/>
              <button type='submit' className="btn btn-primary">Submit</button>
              <div className="center"> 
                {props.errorsOrMessages.map((e,k) => {return e.includes("expired")? <Link to='/business/login' key={k} className="errors">{e}</Link> : <strong key={k} >{e}</strong>})}
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