import { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import {clearErrors} from '../../actions/errorsActions'
import {accordionButtonClass,diplayAccordion} from '../../componentsHelpers/accordion'
import { postFetchAction } from '../../actions/fetchActions';
import '../../styles/styles.css'
import Errors from '../Errors';

const  CreateEmployees =(props)=> {
  const {errorsOrMessages,accordion,user,employees} = props
  const [employee,setEmployee] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
        phone: ""
  })

  useEffect(()=>{  
      if (errorsOrMessages.errors?.length > 0){
        props.clearErrors()
      }
  },[])
 
  const handleOnsubmit = (e) =>{
    e.preventDefault()
    props.postFetchAction({
      path: '/employees',
      stateName:{itemName: "employee", arrayName: "employees"} ,
      type: { addItemToArray: "ADD_EMPLOYEES", addItem: "ADD_EMPLOYEE"}, 
      params: {payload: {employee: employee}, array: employees}
    })
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
      setEmployee(
        { 
          ...employee, 
          [e.target.name]: e.target.value
      })
    }

      return(
        <section className='center'>
            <button id="create-employee" className={accordionButtonClass("create-employee",accordion)}> {user.is_login ? "Create An Employee": "Create a personal account"}</button>
            <div className={diplayAccordion("create-employee",accordion)}>
            <div className="standar-forms standar-form-position accordion">
                <form onSubmit={handleOnsubmit} className='accordion accor-diplay-form'>
                    <div className='accordion'> 
                    {(errorsOrMessages.from  === "create_employee") && <Errors errorsOrMessages={errorsOrMessages}/>}
                    </div>  
                    <label className='accordion'>Name</label>
                    <input onChange={handleOnChange} placeholder={"Enter full name"} name="name" className="standar-input accordion" type="text" value={employee.name}/><br/>
                    <label className='accordion'>Phone number</label>
                    <input onChange={handleOnChange} placeholder="Enter phone number "name="phone" className="standar-input accordion" type="phone" value={employee.phone}/><br/>
                    <label className='accordion'>Email</label>
                    <input onChange={handleOnChange} placeholder="Enter email" name="email" className="standar-input accordion" type="email" value={employee.email}/><br/>
                    <label className='accordion'>Username</label>
                    <input onChange={handleOnChange} placeholder="Enter username" name="username" className="standar-input accordion" type="text" value={employee.username}/><br/>
                    <label className='accordion'>Password</label>
                    <input onChange={handleOnChange} placeholder="Enter password" name="password" className="standar-input accordion" type="password" value={employee.password}/><br/>
                    <input onChange={handleOnChange} placeholder="Confirm password" name="password_confirmation" className="standar-input accordion" type="password" value={employee.password_confirmation}/><br/>
                    <button type='submit' className="white-blue-buttons accordion">Submit</button>
                </form> 
            </div>
            </div>
        </section>
      );    
    

};

const mapStateToProps = state => { 
  return {
    user: state.user.user,
    accordion: state.accordion.accordion,
    employees: state.employees.employees,
    loading: state.employees.loading,
    errorsOrMessages: state.errorsOrMessages.errorsOrMessages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    postFetchAction: (action) => dispatch(postFetchAction(action)),
    clearErrors: () => dispatch(clearErrors()),
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(CreateEmployees)