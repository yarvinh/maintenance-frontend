import {useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {verifyEmail} from '../../actions/usersActions'
import {Navigate} from 'react-router-dom'
import {requestSecurityCode} from '../../actions/usersActions'
import ErrorsOrMsg from '../ErrosOrMsg';

const EmailValidation = () => {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.user)
    const errorsOrMsg = useSelector(state => state.errorsOrMessages?.errorsOrMessages)

    const [user, setUser] = useState({
      security_code: ""
    })

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(verifyEmail({user: user}))

    }

    const handleOnChange = (e) => {
      setUser({
        ...user,[e.target.name]: e.target.value 
      })
    }

    const handleOnClick=(e)=>{
       dispatch(requestSecurityCode())
    }

    if(currentUser.is_login){
      return (<Navigate to='/'/>)
    }else {
      return (
      <div>
        <div className="container d-flex justify-content-center align-items-center">
            <form onSubmit={handleOnSubmit} className="form">
                <label htmlFor="email-security-code" className="mt-5">Enter security code:</label>
                <input onChange={handleOnChange} id="email-security-code"  className="form-control" value={user.security_code} name="security_code" type='text'/> <br/>
                <button type='submit' className="btn btn-primary">Submit</button> <br/>
                <div className="center"> 
                  {errorsOrMsg?.from === 'verify_email' && (<ErrorsOrMsg errors={errorsOrMsg?.errors} msg={errorsOrMsg.msg}/>)}
                </div>  
            </form>
        </div>
        <div className='get-new-code'>
          <label  htmlFor='get-new-security-code'> Didn't receive the code?</label>
          <button id="get-new-security-code" onClick={handleOnClick} className='standar-button'> Request new code</button>
        </div>
      </div>
      )  
    }
};

export default EmailValidation 