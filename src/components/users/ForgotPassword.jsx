import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {recoveryPassword} from '../../actions/usersActions'
import '../../styles/styles.css'
import ErrorsOrMsg from '../ErrosOrMsg';

const ForgotPassword = () =>{
    const dispatch = useDispatch()
    const errorsOrMsg = useSelector( state => state.errorsOrMessages.errorsOrMessages )
    const [user, setUser] = useState({
      username: ""
    })
    const handleOnChange = (e)=>{
      setUser({
       ...user,[e.target.name]: e.target.value
      })
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault()
           dispatch(recoveryPassword({path: "/recovery_password" ,username: user.username})) 
            setUser({
                username: ""
            }) 
    }
    
    return (
        <section>
          <br/>
          <div className='center login-messages'>
          </div>
            <div className="container d-flex justify-content-center align-items-center">
                <form onSubmit={handleOnSubmit} className="form">
                <label >Enter your username:</label >
                <input  onChange={handleOnChange} className="form-control" value={user.username} name="username" type='text'/> <br/>
                <button type='submit' className="white-blue-buttons">Submit</button>
                </form>   
            </div>
            <div className="center"> 
              {errorsOrMsg.from === 'set_password_session' && <ErrorsOrMsg errors={errorsOrMsg?.errors} msg={errorsOrMsg?.msg}/>}
            </div> 
        </section>
    )
}
      
export default ForgotPassword