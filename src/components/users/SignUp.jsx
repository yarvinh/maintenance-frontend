import React, {useState } from 'react';
import { connect } from 'react-redux';
// import {Navigate,redirect} from 'react-router-dom'
import { createUser } from '../../actions/usersActions'
import {clearErrors} from '../../actions/errorsActions'
import '../../styles/styles.css'
import EmailValidation from './EmailValidation';
import NewUserInstructions from './NewUserInstructions';
import Errors from '../Errors';

const SignUp = (props) => {

  const {verificationSession,errorsOrMessages} = props

  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    password_confirmation: "",
    verification_code: ""
  })

  const handleOnSubmit = (e) => {
      e.preventDefault()
      props.createUser({user: user})  
  }

  const handleOnChange = (e) => {
    setUser({
       ...user,[e.target.name]: e.target.value 
    })
  }
  if(props.user.is_login){
    return <NewUserInstructions/>
  } else if (!verificationSession ){
    return (
      <div>
        <div className="container d-flex justify-content-center align-items-center">
          <form onSubmit={handleOnSubmit} className="form">
            <label className="mt-5" htmlFor="signUpName"> Name: </label>
            <input onChange={handleOnChange} id="signUpName" className="form-control" value={user.name} name="name" type='text'/> <br/>
            <label htmlFor='signUpEmail' >Email:</label >
            <input  onChange={handleOnChange} id="signUpEmail" className="form-control" value={user.email} name="email" type='text'/> <br/>
            <label htmlFor='signUpUsername'>Username:</label >
            <input onChange={handleOnChange} id="signUpUsername" className="form-control"  value={user.username} name="username" type='text'/> <br/>
            <label htmlFor='signUpPassword'> Password: </label >
            <input onChange={handleOnChange} id='signUpPassword' className="form-control"  value={user.password} name="password" type='password'/> <br/>
            <label htmlFor='signUpConfirmPassword'> Confirm password:</label >
            <input onChange={handleOnChange} id="signUpConfirmPassword" className="form-control"  value={user.password_confirmation} name="password_confirmation" type='password'/> <br/>
            <button type='submit' className="white-blue-buttons">Submit</button>
            <div className="center"> 
            {errorsOrMessages?.from === "create_user"?<Errors errorsOrMessages={errorsOrMessages}/>:null}
        </div>  
          </form> 
        </div>
        <br/>
        <br/>
      </div>
    )
  } else {
       return (
        <EmailValidation/>
       ) 
  }

};

const mapStateToProps = state => { 
  return {
    verificationSession: state.user.user.verification_session,
    errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
    user: state.user.user
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
     createUser: (action) => dispatch(createUser(action)),
     clearErrors: () => dispatch(clearErrors()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp )