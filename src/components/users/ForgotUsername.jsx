import {useState} from 'react';
import { connect } from 'react-redux';
import {clearErrors} from '../../actions/errorsActions'
import {recoveryUsername} from '../../actions/usersActions'
import '../../styles/styles.css'
import Errors from '../Errors';

const ForgotUsername = (props) =>{
    const {errorsOrMessages} = props
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
            props.recoveryUsername({email: user.email})   
    }
  
    return (
        <section>
            <div className="container d-flex justify-content-center align-items-center">
                <form onSubmit={handleOnSubmit} className="form">
                  <label >Enter your email:</label >
                  <input  onChange={handleOnChange} className="form-control" value={useState.email} name="email" type='text'/> <br/>
                  <button type='submit' className="white-blue-buttons">Submit</button>
                </form>   
            </div>
            <div className="center"> 
              {(errorsOrMessages.from === 'forgot_username') && <Errors errorsOrMessages={errorsOrMessages}/>}
            </div> 
        </section>
    )


}



const mapStateToProps = state => { 
    return {
      loading: state.user.loading,
      errorsOrMessages: state.errorsOrMessages.errorsOrMessages
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        recoveryUsername: (action) => dispatch(recoveryUsername(action)),
        clearErrors: () => dispatch(clearErrors()),
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(ForgotUsername)