import  {useState,useEffect } from 'react';
import { connect } from 'react-redux';
import {useParams} from 'react-router-dom';
import {clearErrors} from '../../actions/errorsActions'
import UploadProfileImage  from "../users/UpdloadProfileImage"
import { patchFetchAction } from '../../actions/fetchActions';
import '../../styles/styles.css'
import Errors from '../Errors';

const EditEmployee = (props) =>{
    const {errorsOrMessages,user,employees} = props
    console.log(errorsOrMessages)
    let {id} = useParams()
    const [employee, setEmployee] = useState({
        name: "",
        phone: "",
        email: "",
        username: "",
        password: "",
        old_password: '',
    })

    useEffect(() => {  
        if (errorsOrMessages.errors?.length > 0){          
          props.clearErrors()
        }
    },[]);

    let handleOnChange = (e)=>{
      setEmployee({
       ...employee,[e.target.name]: e.target.value
      })
    }

    let handleOnSubmit = (e,type) =>{
        e.preventDefault()
        let payload = {}
        if(type === 'password'){
           payload = {old_password: employee.old_password, [type]: employee[type]}
        }else{ 
           payload = {[type]: employee[type],id: id}
            setEmployee({
                ...employee,[type]: ""
            }) 
        }
        props.patchFetchAction({
            path: `/employees/${id}`,
            id: id,
            stateName:{itemName: "user", arrayName: "employees"} ,
            type: {addItemToArray: "ADD_EMPLOYEES", addItem: 'ADD_USER'}, 
            params: {payload: {employee: payload},array: employees}
        })
    }

    return(   
      <div>
            <div className='settings-forms standar-form-position'>
                <div>
                  {!user.admin && <UploadProfileImage employeeOrUser={"employee"} user={user}/>}
                </div>
                {(errorsOrMessages.from === 'update_employee') && <Errors errorsOrMessages={errorsOrMessages}/>}
               <br/>
              <div className='center'>  
                <form onSubmit={(e)=>handleOnSubmit(e,"name")} >
                    <label>Name: {user.user?.name}</label>
                    <input onChange={handleOnChange} placeholder={"Edit name"}  value={employee.name} className="standar-input" type="text" name="name"/>
                    <button type='submit' className="standar-button">Save name</button>
                </form>
                <br/>
                <form onSubmit={e => handleOnSubmit(e,'phone')}>
                    <label>Phone number: {user.user?.phone}</label>
                    <input onChange={handleOnChange} value={employee.phone} placeholder={"Edit phone number"} className="standar-input" type="phone" name="phone" />
                    <button type='submit' className="standar-button">Save phone #</button>
                </form> 
                <br/>
                <form onSubmit={ e=> handleOnSubmit(e,'email')}>
                    <label>Email: {user.user?.email}</label>
                    <input onChange={handleOnChange} placeholder={"Edit Email"} value={employee.email} className="standar-input" type="email"  name="email"/>
                    <button type='submit' className="standar-button">Save email</button>
                </form>
                <br/>
                <form onSubmit={e => handleOnSubmit(e,'username')}>
                    <label>Username: {user.user?.username}</label>
                    <input onChange={handleOnChange} placeholder={"Edit username"} value={employee.username} className="standar-input" type="text"  name="username"/>
                    <button type='submit' className="standar-button">Save username</button>
                </form>
                <br/>
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

const mapStateToProps = state => { 
    return {
      employees: state.employees.employees,
      user: state.user.user,
      loading: state.employees.loading,
      errorsOrMessages: state.errorsOrMessages.errorsOrMessages
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        patchFetchAction: (action) => dispatch(patchFetchAction(action)),
        clearErrors: () => dispatch(clearErrors()),
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(EditEmployee)