import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import {clearErrors} from '../../actions/errorsActions'
import {acordionButtonClass,diplayAcordion} from '../../componentsHelpers/acordion'
import { postFetchAction } from '../../actions/fetchActions';
import '../../styles/styles.css'
import Errors from '../Errors';

const  CreateEmployees =(props)=> {
  const {errorsOrMessages,acordion,user,employees} = props
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
        <div className='center'>
            <button id="create-employee" className={acordionButtonClass("create-employee",acordion)}> {user.is_login ? "Create An Employee": "Create a personal account"}</button>
            <div className={diplayAcordion("create-employee",acordion)}>
            <div className="standar-forms standar-form-position acordion">
                <form onSubmit={handleOnsubmit} className='acordion'>
                    <div className='acordion'> 
                    {errorsOrMessages.from  === "create_employee" ? <Errors errorsOrMessages={errorsOrMessages}/> : null}
                    </div>  
                    <label className='acordion'>Name</label>
                    <input onChange={handleOnChange} placeholder={"Enter full name"} name="name" className="standar-input acordion" type="text" value={employee.name}/><br/>
                    <label className='acordion'>Phone number</label>
                    <input onChange={handleOnChange} placeholder="Enter phone number "name="phone" className="standar-input acordion" type="phone" value={employee.phone}/><br/>
                    <label className='acordion'>Email</label>
                    <input onChange={handleOnChange} placeholder="Enter email" name="email" className="standar-input acordion" type="email" value={employee.email}/><br/>
                    <label className='acordion'>Username</label>
                    <input onChange={handleOnChange} placeholder="Enter username" name="username" className="standar-input acordion" type="text" value={employee.username}/><br/>
                    <label className='acordion'>Password</label>
                    <input onChange={handleOnChange} placeholder="Enter password" name="password" className="standar-input acordion" type="password" value={employee.password}/><br/>
                    <input onChange={handleOnChange} placeholder="Confirm password" name="password_confirmation" className="standar-input acordion" type="password" value={employee.password_confirmation}/><br/>
                    <button type='submit' className="standar-button acordion">Submit</button>
                </form> 
                <br/>   
            </div>
            </div>
        </div>
      );    
    

};

const mapStateToProps = state => { 
  return {
    user: state.user.user,
    acordion: state.acordion.acordion,
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