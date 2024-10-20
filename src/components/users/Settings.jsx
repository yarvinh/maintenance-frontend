import  {useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import UploadProfileImage from './UpdloadProfileImage';
import '../../styles/styles.css'
import { patchFetchAction } from '../../actions/fetchActions';
import { editUserSetter } from '../../componentsHelpers/fetchingFunctions';
import ErrorsOrMsg from '../ErrosOrMsg';

const Settings = () =>{

    const {id} = useParams()
    const dispatch = useDispatch()
    const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)
    const currentUser = useSelector(state => state.user.user)
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
            const payload = editUserSetter({userType: "users", id: id, payload: {user:{password: user.password,old_password: user.old_password}}})
            dispatch(patchFetchAction(payload))
        }else{ 
            const payload = editUserSetter({userType: "users", id: id, payload: {user:{[type]: user[type]} }})
            dispatch(patchFetchAction(payload)) 
            setUser({
                ...user,[type]: ""
            }) 
        }
    }
    
    return( 
        <section className='settings-wrapper'>
            <div className='settings-forms standar-form-position center'>
                <UploadProfileImage errorsOrMsg={errorsOrMsg} employeeOrUser={"user"} user={currentUser}/>
                {errorsOrMsg.from === "update_user" || errorsOrMsg.from === "update_profile_img" ? <ErrorsOrMsg errors={errorsOrMsg?.errors} msg={errorsOrMsg?.msg}/>: null}
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
            </div>
        </section>  
  )
}

export default Settings

