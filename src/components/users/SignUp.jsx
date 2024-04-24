import React, {useState } from 'react';
import { connect } from 'react-redux';
import {Navigate} from 'react-router-dom'
import { createUser } from '../../actions/usersActions'
import {clearErrors} from '../../actions/errorsActions'
import '../../styles/styles.css'

const SignUp = (props) => {
  const {verificationSession} = props
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
            <button type='submit' className="btn btn-primary">Submit</button>
            <div className="center"> 
            {props.errorsOrMessages.map((e,k) => {return (
              <div key={k}>
                <strong className="signup-errors">{e}</strong>
              </div>
            )
            })}
        </div>  
          </form> 
        </div>
        <br/>
        <br/>
        {verificationSession? <Navigate to="/verifying_email"/> : null }
      </div>
    );

};

const mapStateToProps = state => { 
  return {
    verificationSession: state.user.user.verification_session,
    errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
    // loading: state.user.loading,
    // user: state.user.user
  }
}
 
const mapDispatchToProps = dispatch => {
  return {
     createUser: (action) => dispatch(createUser(action)),
     clearErrors: () => dispatch(clearErrors()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp )