import React, {useState,useEffect  } from 'react';
import { connect } from 'react-redux';
import {resetUserPassword} from '../../actions/usersActions'
import {useParams,Navigate,Link} from 'react-router-dom';
import {clearErrors} from '../../actions/errorsActions'
import {accountTypeToken }from '../../componentsHelpers/token'
import Errors from '../Errors';
import '../../styles/styles.css'

const ResetPassword= (props) =>{
    const {id} = useParams()
    const {errorsOrMessages} = props
    const [user, setUser] = useState({
      password: "",
      password_confirmation: "",
    })
    
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
            accountTypeToken() === 'business' 
            ?
             props.resetUserPassword({path: '/reset_password' ,user: user}) 
             : 
             props.resetUserPassword({path: '/reset_employee_password' ,user: user})
        }
    
    const passwordForm = () =>{
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
                </div>
            )
    }

    
    return (
        <div>
            {passwordForm()}
            <br/>
            <div className="center"> 
            {/* <Errors/> */}
              {errorsOrMessages.msg?.map((e,k) => {
                  return (
                    <div key={k}>
                      <p> {e} </p>
                      {e.includes("expired") || e.includes('successfully') ? <Link to='/business/login'>Click here to login</Link> : null}
                    </div>
                  )
                }
              )}
            </div> 
        </div>
    )


}



const mapStateToProps = state => { 
    return {
      errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        resetUserPassword: (action) => dispatch(resetUserPassword(action)),
        clearErrors: () => dispatch(clearErrors()),
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)