import { useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { fetchLogIn,setAccountType} from '../../actions/usersActions'
import '../../styles/styles.css'
import {Navigate} from 'react-router-dom'
import {verificationSessionToken} from "../../componentsHelpers/token"
import Errors from '../Errors';
import { paths } from '../../actions/actionsHelper';
import ErrorsOrMsg from '../ErrosOrMsg';

const LogIn = () => {
  const dispatch = useDispatch()
  const account = useSelector(state => state.account.account)
  // const loading = useSelector(state => state.user.loading)
  const login = useSelector(state => state.user.user.is_login)
  const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)
  const verificationSession = useSelector(state => state.user.user.verification_session )

  // const {business, text} = account
    // const handleOnClick=(e)=>{
    //   if(business) 
    //     dispatch(setAccountType({business: false, text: "business"}))
    //   else 
    //     dispatch(setAccountType({business: true, text:  "personal"}))
    // }
  
    const [user, setUser] = useState({
      username: '',
      password: ''
    })
 
    const redirect = ()=>{ 
      return <Navigate to='/'/>
    }

    const handleOnChange = (e) => {  
        setUser({
         ...user,[e.target.name]: e.target.value   
        })
    }
  
    const handleOnSubmit = (e) => {
        e.preventDefault()
        account.business ? dispatch(fetchLogIn(user,paths(true).login)) : dispatch(fetchLogIn(user,paths(false).login))
    }

    return(
      <section>
        {/* {login && <Navigate to="/verifying_email"/>} */}
        {(verificationSession && verificationSessionToken()) && <Navigate to="/verifying_email"/>}
        <div className="center login-messages" > 
          {errorsOrMsg.from === "login" && <ErrorsOrMsg errors={errorsOrMsg?.errors || errorsOrMsg?.msg} />}
        </div>
        {/* <div className='center login-messages'>
          <button onClick={handleOnClick} className="login-message-button" >Login to {text} account</button>
        </div> */}
        <div className="container h-100  d-flex  justify-content-center align-items-center">
          <form onSubmit={handleOnSubmit} className="form">
            <br/>
            <label htmlFor='login-username' className="mt-3 form-label">Username</label>
            <input id='login-username' className="form-control" onChange={handleOnChange} name="username" type="text" value={user.username}/>
            <label htmlFor='login-password' className="form-label">Password</label >
            <input id='login-password' className="form-control" onChange={handleOnChange } name="password" type="password" value={user.password}/>
            <button  className="white-blue-buttons" type="submit">Login</button>
          </form>
         {login && redirect()}
        </div>
        <div  className="center">
          <Link to="/password_recovery" className="nav-link login-a-color">Forgot password?</Link>
          <Link to="/username_recovery" className="nav-link login-a-color">Forgot username?</Link>
          <Link  to="/signup" className="nav-link login-a-color">Sign up as business account?</Link> 
        </div>
      </section>
    );
};

export default LogIn