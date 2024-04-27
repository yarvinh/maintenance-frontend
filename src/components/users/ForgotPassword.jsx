import React, {useState ,useEffect } from 'react';
import { connect } from 'react-redux';
import {clearErrors} from '../../actions/errorsActions'
import {recoveryPassword} from '../../actions/usersActions'
import '../../styles/styles.css'
import Errors from '../Errors';

const ForgotPassword = (props) =>{
    const {errorsOrMessages,account} = props
    const [user, setUser] = useState({
      username: ""
    })
    const {business} = account
    useEffect(() => {
        if (errorsOrMessages.length > 0){
          props.clearErrors()
        }
    },[ ]);

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
            <div className="container d-flex justify-content-center align-items-center">
                <form onSubmit={handleOnSubmit} className="form">
                <label >Enter your username:</label >
                <input  onChange={handleOnChange} className="form-control" value={user.username} name="username" type='text'/> <br/>
                <button type='submit' className="btn btn-primary">Submit</button>
                </form>   
            </div>
            <div className="center"> 
            <Errors/>
              {/* {errorsOrMessages.map((e,k) => {return <p key={k}>{e}</p>})} */}
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
        recoveryPassword: (action) => dispatch(recoveryPassword(action)),
        clearErrors: () => dispatch(clearErrors()),
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)