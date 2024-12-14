import {useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { userPostFetchAction } from '../../actions/usersActions'
import '../../styles/styles.css'
import EmailValidation from './EmailValidation';
import NewUserInstructions from './NewUserInstructions';
import { createUserSetter } from '../../componentsHelpers/fetchingFunctions';
import ErrorsOrMsg from '../ErrosOrMsg';

const SignUp = () => {
  const dispatch = useDispatch()

  const verificationSession  = useSelector(state => state.user.user.verification_session)
  const currentUser = useSelector(state => state.user.user)

  const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)

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
      const payload = createUserSetter({user: user})
      dispatch( userPostFetchAction(payload)) 
  }

  const handleOnChange = (e) => {
    setUser({
       ...user,[e.target.name]: e.target.value 
    })
  }
  
  if(currentUser.is_login)
    return <NewUserInstructions/>
  else if (!verificationSession )
    return (
        <div className="container d-flex justify-content-center align-items-center">
          <form onSubmit={handleOnSubmit} className="form">
            <div className="center"> 
            {errorsOrMsg.from === "create_user" && <ErrorsOrMsg errors={errorsOrMsg?.errors || errorsOrMsg?.msg} />}
            </div>  
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
          </form> 
      </div>
    )
  else 
      return (
        <EmailValidation/>
      ) 
  

};



export default SignUp 