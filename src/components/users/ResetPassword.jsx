import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {resetUserPassword} from '../../actions/usersActions'
import '../../styles/styles.css'
import ErrorsOrMsg from '../ErrosOrMsg';

const ResetPassword= () =>{
    const errorsOrMsg =  useSelector(state => state.errorsOrMessages.errorsOrMessages)
    const dispatch = useDispatch()
    const [user, setUser] = useState({
      password: "",
      password_confirmation: "",
    })
    
    let handleOnChange = (e)=>{
      setUser({
       ...user,[e.target.name]: e.target.value
      })
    }

    let handleOnSubmit = (e) =>{
        e.preventDefault()
        dispatch(resetUserPassword({path: '/reset_password' ,user: user}) )
    }

    return (
        <div>
              <div className="container d-flex justify-content-center align-items-center"> 
                  <form onSubmit={handleOnSubmit}>  
                      <label>New Password:</label>
                      <input onChange={handleOnChange} value={user.password}className="form-control" type="password" name="password" />
                      <label>Confirm Password:</label>
                      <input onChange={handleOnChange}  value={user.password_confirmation} className="form-control" type="password" name="password_confirmation" />
                      <br/>
                      <button type='submit' className="btn btn-primary">Save</button>
                  </form>  
              </div>
            <br/>
            <div className="center"> 
            {errorsOrMsg.from === 'reset_password' &&  <ErrorsOrMsg errors={errorsOrMsg?.errors} msg={errorsOrMsg?.msg}/>}
            </div> 
        </div>
    )
}

export default ResetPassword