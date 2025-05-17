import { useRef, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postFetchAction } from '../../actions/fetchActions';
import '../../styles/styles.css'
import { employeePostSetter } from '../../componentsHelpers/fetchingFunctions';
import ErrorsOrMsg from '../ErrosOrMsg';
import { displayFormReceived } from '../../state/reducers/displayElementReducer';

const  CreateEmployees = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.user)
  const formRef = useRef()
  const isDisplay = useSelector(state => state.isDisplay.formDisplay)
  const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)
    const [employee,setEmployee] = useState({
          name: "",
          email: "",
          username: "",
          password: "",
          password_confirmation: "",
          phone: ""
    })

    const handleOnClick = (e)=>{
        if (e.target.className.includes("active"))
          dispatch(displayFormReceived({buttonClass: "display_accordion", formClass: 'hide_elements', id: e.target.id}))
        else
          dispatch(displayFormReceived({buttonClass: "display_accordion active", formClass: 'display_elements', id: e.target.id}))   
    }

    const handleOnsubmit = (e) =>{
      e.preventDefault()
      const payload = employeePostSetter({payload: {employee: employee}})
      dispatch(postFetchAction(payload))

      setEmployee({
        name: "",
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
        phone: "",
      })

    }
    const handleOnChange = (e) =>{  
      setEmployee({...employee, [e.target.name]: e.target.value })
    }

    return(
      <section className='center' >
          <button id="create-employee" onClick={handleOnClick} className={isDisplay.buttonClass}> {user.is_login ? "Create An Employee": "Create a personal account"}</button>
          <div ref={formRef} className={isDisplay.id.includes("create-employee") ? `${isDisplay.formClass} form-wrapper`: 'hide_elements'}>
          <div className="standar-forms standar-form-position accordion ">
              <form onSubmit={handleOnsubmit} className='accordion accor-diplay-form'>
                  <div className='accordion'> 
                  {errorsOrMsg.from.includes("create_employee") && <ErrorsOrMsg {...(errorsOrMsg.errors ? { errors: errorsOrMsg.errors } :{msg: errorsOrMsg.msg })} />}
                  </div>  
                  <label className='accordion required-field'>Name</label>
                  <input onChange={handleOnChange} placeholder={"Enter full name"} name="name" className="standar-input accordion" type="text" value={employee.name}/><br/>
                  <label className='accordion required-field'>Phone number</label>
                  <input onChange={handleOnChange} placeholder="Enter phone number "name="phone" className="standar-input accordion" type="phone" value={employee.phone}/><br/>
                  <label className='accordion required-field'>Email</label>
                  <input onChange={handleOnChange} placeholder="Enter email" name="email" className="standar-input accordion" type="email" value={employee.email}/><br/>
                  <label className='accordion required-field'>Username</label>
                  <input onChange={handleOnChange} placeholder="Enter username" name="username" className="standar-input accordion" type="text" value={employee.username}/><br/>
                  <label className='accordion required-field'>Password</label>
                  <input onChange={handleOnChange} placeholder="Enter password" name="password" className="standar-input accordion" type="password" value={employee.password}/><br/>
                  <input onChange={handleOnChange} placeholder="Confirm password" name="password_confirmation" className="standar-input accordion" type="password" value={employee.password_confirmation}/><br/>
                  <button type='submit' className="white-blue-buttons accordion">Submit</button>
              </form> 
          </div>
          </div>
      </section>
    );     
};

export default CreateEmployees