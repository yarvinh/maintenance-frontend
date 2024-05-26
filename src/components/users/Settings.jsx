import  {useState } from 'react';
import { connect } from 'react-redux';
import {editUser} from '../../actions/usersActions'
import {useParams} from 'react-router-dom';
import UploadProfileImage from './UpdloadProfileImage';
import '../../styles/styles.css'
import Errors from '../Errors';

const Settings = (props) =>{
    const {id} = useParams()
    const {errorsOrMessages} = props
    const currentUser = props.user
    const [user, setUser] = useState({
        name: "",
        address: "",
        email: "",
        username: "",
        password: "",
        old_password: '',
    })

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
        
        <section className='settings-forms standar-form-position center'>
            <UploadProfileImage employeeOrUser={"user"} user={currentUser}/>
            {(errorsOrMessages.from === "update_user") && <Errors errorsOrMessages={errorsOrMessages}/>}          
            <strong>Name: {currentUser.user?.name}</strong>
            <form onSubmit={(e)=>handleOnSubmit(e,"name")}>
                <input onChange={handleOnChange} value={user.name} placeholder={"Edit name"} className="standar-input" type="text" name="name"/>
                <button type='submit' className="standar-button">Save name</button>
            </form>

            <strong>Address: {currentUser.user?.address}</strong>
            <form onSubmit={e => handleOnSubmit(e,'address')}>
                <input onChange={handleOnChange} value={user.address} placeholder={"Edit address"} className="standar-input"  type="address" name="address" />
                <button type='submit' className="standar-button">Save address</button>
            </form> 
    
        
            <strong>Email: {currentUser.user?.email}</strong>
            <form onSubmit={ e=> handleOnSubmit(e,'email')}>
                <input onChange={handleOnChange}  value={user.email} placeholder={"Edit email"} className="standar-input"  type="email"  name="email"/>
                <button type='submit' className="standar-button">Save email</button>
            </form>

            <strong>Username: {currentUser.user?.username}</strong>
            <form onSubmit={e => handleOnSubmit(e,'username')}>
                <input onChange={handleOnChange}  value={user.username} placeholder={"Edit username"}className="standar-input"  type="text"  name="username"/>
                <button type='submit' className="standar-button">Save username</button>
            </form>

            <form onSubmit={e => handleOnSubmit(e,'password')}>  
                <input onChange={handleOnChange} value={user.password} placeholder={"Enter new password"} className="standar-input"  type="password" name="password" /> 
                <input onChange={handleOnChange}  value={user.old_password} className="standar-input"  placeholder={"Enter old password"} type="password" name="old_password" />
                <button type='submit' className="standar-button">Save password</button>
            </form>  
        </section>  
  )
}


const mapStateToProps = state => { 
    return {
      user: state.user.user,
      loading: state.user.loading,
      errorsOrMessages: state.errorsOrMessages.errorsOrMessages
    }
  }
  
const mapDispatchToProps = dispatch => {
    return {
        editUser: (action) => dispatch(editUser(action))
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(Settings)

