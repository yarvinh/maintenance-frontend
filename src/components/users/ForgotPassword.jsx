import React, {useState ,useEffect } from 'react';
import { connect } from 'react-redux';
import {clearErrors} from '../../actions/errorsActions'
import {recoveryPassword} from '../../actions/usersActions'
import '../../styles/styles.css'
import Errors from '../Errors';
import { setAccountType } from '../../actions/usersActions';

const ForgotPassword = (props) =>{
    const {account, errorsOrMessages} = props
    const {business, text} = account
    const [user, setUser] = useState({
      username: ""
    })

    const handleOnClick=(e)=>{
      if(business) {
        props.setAccountType({business: false, text: "business"})
      }else {
        props.setAccountType({business: true, text:  "personal"})
      }
    }


    let handleOnChange = (e)=>{
      setUser({
       ...user,[e.target.name]: e.target.value
      })
    }

    let handleOnSubmit = (e) =>{
        e.preventDefault()
           business ? props.recoveryPassword({path: "/recovery_password" ,username: user.username}) : props.recoveryPassword({path: '/recovery_employee_password', username: user.username})
            setUser({
                username: ""
            }) 
        }
    
    return (
        <div>
          <br/>
          <div className='center login-messages'>
            <button onClick={handleOnClick} className="login-message-button" >Recover {text} account password</button>
          </div>
            <div className="container d-flex justify-content-center align-items-center">
                <form onSubmit={handleOnSubmit} className="form">
                <label >Enter your username:</label >
                <input  onChange={handleOnChange} className="form-control" value={user.username} name="username" type='text'/> <br/>
                <button type='submit' className="white-blue-buttons">Submit</button>
                </form>   
            </div>
            <div className="center"> 
            {errorsOrMessages.from === 'set_password_session' ? <Errors errorsOrMessages={errorsOrMessages}/>: null}
            </div> 
        </div>
    )


}



const mapStateToProps = state => { 
    return {
      loading: state.user.loading,
      errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
      account: state.account.account
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        setAccountType: (action)=> dispatch(setAccountType(action)),
        recoveryPassword: (action) => dispatch(recoveryPassword(action)),
        clearErrors: () => dispatch(clearErrors()),
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)