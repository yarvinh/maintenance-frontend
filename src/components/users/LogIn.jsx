import React, { useState} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { fetchLogIn,setAccountType} from '../../actions/usersActions'
import '../../styles/styles.css'
import {Navigate} from 'react-router-dom'
import {verificationSessionToken} from "../../componentsHelpers/token"

const LogIn = (props) => {
  const {login,verificationSession,errorsOrMessages,account} = props
    const {business, text} = account
    const handleOnClick=(e)=>{
      if(business) {
        props.setAccountType({business: false, text: "Login to business account"})
      }else {
        props.setAccountType({business: true, text:  "Login to your account"})
      }
    }

    const [user, setUser] = useState({
      username: '',
      password: ''
    })
 
    const redirect = ()=>{
      return <Navigate to='/' /> 
    }

    const handleOnChange = (e) => {  
        setUser({
         ...user,[e.target.name]: e.target.value   
        })
    }
  
    const handleOnSubmit = (e) => {
        e.preventDefault()
        account.business ? props.fetchLogIn(user,'business_login'): props.fetchLogIn(user,'login')
    }

    return(
      <div>
           {verificationSession && verificationSessionToken()? <Navigate to="/verifying_email"/> : null }
           <div className="center login-messages" > 
            {errorsOrMessages.map((e,k) => {return <li className="login-error" key={k}>{e}</li>})} 
          </div>
          <div className='center login-messages'>
            <button onClick={handleOnClick} className="login-message-button" >{text}</button>
          </div>
         
         
       <div className="container h-100  d-flex  justify-content-center align-items-center">
        <form onSubmit={handleOnSubmit} className="form">
            <br/>
            <label htmlFor='login-username' className="mt-3 form-label">Username</label>
            <input id='login-username' className="form-control" onChange={handleOnChange} name="username" type="text" value={user.username}/>
            <label htmlFor='login-password' className="form-label">Password</label >
            <input id='login-password' className="form-control" onChange={handleOnChange } name="password" type="password" value={user.password}/>
          <button  className="my-4 btn btn-primary" type="submit">Login</button>

        </form>
         {login ? redirect():null}
      </div>
      <div  className="center">
        <Link to="/password_recovery" className="nav-link login-a-color">Forgot password?</Link>
        <Link to="/username_recovery" className="nav-link login-a-color">Forgot username?</Link>
        <Link  to="/signup" className="nav-link login-a-color">Sign up as business account?</Link> 
      </div>
      <br/>
      </div>
    );
};

const mapStateToProps = state => { 
  return {
    errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
    user: state.user.user,
    login: state.user.user.is_login,
    loading: state.user.loading,
    verificationSession: state.user.user.verification_session,
    account: state.account.account
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    fetchLogIn: (action,path) => dispatch(fetchLogIn(action,path)),
    setAccountType: (action)=> dispatch(setAccountType(action)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)