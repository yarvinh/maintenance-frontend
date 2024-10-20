import  {useState} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import UploadProfileImage  from "../users/UpdloadProfileImage"
import { patchFetchAction } from '../../actions/fetchActions';
import '../../styles/styles.css'
import ErrorsOrMsg from '../ErrosOrMsg';
import { editUserSetter } from '../../componentsHelpers/fetchingFunctions';

const EditEmployee = () =>{
    let {id} = useParams()
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)
    
    const [employee, setEmployee] = useState({
        name: "",
        phone: "",
        email: "",
        username: "",
        password: "",
        old_password: '',
    })

    let handleOnChange = (e)=>{
      setEmployee({...employee,[e.target.name]: e.target.value })
    }

    let handleOnSubmit = (e,type) =>{
        e.preventDefault()
        if(type === 'password'){
            const payload = editUserSetter({userType: "employees", id: id, payload: {employee:{password: employee.password,old_password: user.old_password}}})
            dispatch(patchFetchAction(payload))
        }else{ 
            const payload = editUserSetter({userType: "employees", id: id, payload: {employee: {[type]: employee[type]} }})
            dispatch(patchFetchAction(payload)) 
            setEmployee({...employee,[type]: ""}) 
        }
    }

    return(   
      <div>
            <div className='settings-forms standar-form-position'>
                <div>
                  {!user.admin && <UploadProfileImage employeeOrUser={"employee"} user={user}/>}
                </div>
                {errorsOrMsg.from === 'update_employee' || errorsOrMsg.from === "update_profile_img" ? <ErrorsOrMsg errors={errorsOrMsg?.errors} msg={errorsOrMsg?.msg}/>: null}
              <div className='center'>  
                <form onSubmit={(e)=>handleOnSubmit(e,"name")} >
                    <label>Name: {user.user?.name}</label>
                    <input onChange={handleOnChange} placeholder={"Edit name"}  value={employee.name} className="standar-input" type="text" name="name"/>
                    <button type='submit' className="standar-button">Save name</button>
                </form>
                <form onSubmit={e => handleOnSubmit(e,'phone')}>
                    <label>Phone number: {user.user?.phone}</label>
                    <input onChange={handleOnChange} value={employee.phone} placeholder={"Edit phone number"} className="standar-input" type="phone" name="phone" />
                    <button type='submit' className="standar-button">Save phone #</button>
                </form> 
                <form onSubmit={ e=> handleOnSubmit(e,'email')}>
                    <label>Email: {user.user?.email}</label>
                    <input onChange={handleOnChange} placeholder={"Edit Email"} value={employee.email} className="standar-input" type="email"  name="email"/>
                    <button type='submit' className="standar-button">Save email</button>
                </form>
                <form onSubmit={e => handleOnSubmit(e,'username')}>
                    <label>Username: {user.user?.username}</label>
                    <input onChange={handleOnChange} placeholder={"Edit username"} value={employee.username} className="standar-input" type="text"  name="username"/>
                    <button type='submit' className="standar-button">Save username</button>
                </form>
                <form onSubmit={e => handleOnSubmit(e,'password')}>  
                    <label>Enter new password</label>
                    <input onChange={handleOnChange} placeholder={"Enter new password"} value={employee.password}className="standar-input" type="password" name="password" />
                    <label>Enter old password</label>
                    <input onChange={handleOnChange} placeholder={"Enter old password"} value={employee.old_password} className="standar-input" type="password" name="old_password" />
                    <button type='submit' className="standar-button">Save password</button> 
                </form>  
              </div> 
            </div>
        </div> 
    )
}
  
export default EditEmployee