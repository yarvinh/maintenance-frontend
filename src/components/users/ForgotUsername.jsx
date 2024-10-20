import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {recoveryUsername} from '../../actions/usersActions'
import '../../styles/styles.css'
import ErrorsOrMsg from '../ErrosOrMsg';

const ForgotUsername = () =>{
    const dispatch = useDispatch()
    const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)
    const [user, setUser] = useState({
      email: ""
    })

    let handleOnChange = (e)=>{
      setUser({
       ...user,[e.target.name]: e.target.value
      })
    }

    let handleOnSubmit = (e) =>{
        e.preventDefault()
            dispatch(recoveryUsername({email: user.email}))
    }
  
    return (
        <section>
            <div className="container d-flex justify-content-center align-items-center">
                <form onSubmit={handleOnSubmit} className="form">
                  <label >Enter your email:</label >
                  <input  onChange={handleOnChange} className="form-control" value={user.email} name="email" type='text'/> <br/>
                  <button type='submit' className="white-blue-buttons">Submit</button>
                </form>   
            </div>
            <div className="center"> 
               {errorsOrMsg.from === 'forgot_username' && <ErrorsOrMsg errors={errorsOrMsg?.errors} msg={errorsOrMsg.msg}/>}
            </div> 
        </section>
    )
}

export default ForgotUsername