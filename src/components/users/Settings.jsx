import React, {useState ,useEffect} from 'react';
import { connect } from 'react-redux';
import {editUser} from '../../actions/usersActions'
import {useParams,useNavigate} from 'react-router-dom';
import {clearErrors} from '../../actions/errorsActions'
import UploadProfileImage from './UpdloadProfileImage';
import '../../styles/styles.css'
import Errors from '../Errors';
const Settings = (props) =>{
    let navigate = useNavigate()
    const {id} = useParams()
    // const {errorsOrMessages} = props
    const currentUser = props.user
    const [user, setUser] = useState({
        name: "",
        address: "",
        email: "",
        username: "",
        password: "",
        old_password: '',
    })

    // useEffect(() => {
    //     if (errorsOrMessages.length > 0){
    //       props.clearErrors()
    //     }
    //   },[ ]);

    const goBack = (e) => {
        return navigate(-1)
    }
 

    let handleOnChange = (e)=>{
      setUser({
       ...user,[e.target.name]: e.target.value
      })
    }

    let handleOnSubmit = (e,type) =>{
        e.preventDefault()
        if(type === 'password'){
            props.editUser({user:{password: user.password,old_password: user.old_password}, id: id}) 
        }else{ 
            props.editUser({user: {[type]: user[type]}, id: id})  
            setUser({
                ...user,[type]: ""
            }) 
        }
    
    }
    
    return( 
        
        <div>
            <div  className='settings-forms standar-form-position'>
                <UploadProfileImage employeeOrUser={"user"} user={currentUser}/>
                <Errors/>
                {/* { errorsOrMessages?.map((e,k) => {return (
                    < ul key={k}>
                    <strong className={"errors"}>{e}</strong> 
                    </ul>
                ) } ) } */}
                <div className='center' >           
                    <div > 
                        <strong>Name: {currentUser.user?.name}</strong>
                        <form onSubmit={(e)=>handleOnSubmit(e,"name")}>
                            <input onChange={handleOnChange} value={user.name} placeholder={"Edit name"} className="standar-input" type="text" name="name"/>
                            <button type='submit' className="standar-button">Save name</button>
                        </form>
                    </div>
                    <br></br>
                    <div >
                        <strong>Address: {currentUser.user?.address}</strong>
                        <form onSubmit={e => handleOnSubmit(e,'address')}>
                            <input onChange={handleOnChange} value={user.address} placeholder={"Edit address"} className="standar-input"  type="address" name="address" />
                            <button type='submit' className="standar-button">Save address</button>
                        </form> 
                    </div>
                        <br/>
                    <div> 
                        <strong>Email: {currentUser.user?.email}</strong>
                        <form onSubmit={ e=> handleOnSubmit(e,'email')}>
                            <input onChange={handleOnChange}  value={user.email} placeholder={"Edit email"} className="standar-input"  type="email"  name="email"/>
                            <button type='submit' className="standar-button">Save email</button>
                        </form>
                    </div>
                    <br></br>
                    <div> 
                        <strong>Username: {currentUser.user?.username}</strong>
                        <form onSubmit={e => handleOnSubmit(e,'username')}>
                            <input onChange={handleOnChange}  value={user.username} placeholder={"Edit username"}className="standar-input"  type="text"  name="username"/>
                            <button type='submit' className="standar-button">Save username</button>
                        </form>
                    </div>
                    <br></br>
                    <div> 
                        <form onSubmit={e => handleOnSubmit(e,'password')}>  
                            <input onChange={handleOnChange} value={user.password} placeholder={"Enter new password"} className="standar-input"  type="password" name="password" /> 
                            <input onChange={handleOnChange}  value={user.old_password} className="standar-input"  placeholder={"Enter old password"} type="password" name="old_password" />
                            <button type='submit' className="standar-button">Save password</button>
                        </form>  
                    </div>
                    <br></br>
                </div>
                <br/>
            <button className='back-button' onClick={goBack}> {"<< Back"} </button>
            <br/>
            <br/>
            <br/> 

            </div>
        </div>
      
  )
}


const mapStateToProps = state => { 
    return {
      user: state.user.user,
      loading: state.user.loading,
    //   errorsOrMessages: state.errorsOrMessages.errorsOrMessages
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        editUser: (action) => dispatch(editUser(action)),
        clearErrors: () => dispatch(clearErrors()),
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(Settings)

