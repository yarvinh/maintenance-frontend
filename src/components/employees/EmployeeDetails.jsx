import { connect } from 'react-redux';
import {useParams,useNavigate} from 'react-router-dom';
import React, {useEffect,useState } from 'react';
import WorkOrdersContainer from '../../containers/WorkOrdersContainer';
import {deleteEmployee} from "../../actions/employeesActions"
import { getFetchAction } from '../../actions/fetchActions';
import '../../styles/styles.css'

const EmployeeDetails = (props)=>{    
    const {id} = useParams()
    const navigate = useNavigate()
    let { workOrders,user,employee} = props
    const [imageClassName, setImageClassName] = useState("employee_card_image")
    const employeeWorkOrders =  employee?.work_orders 
    
    useEffect(() => {
      props.getFetchAction({
        loading: "LOADING_EMPLOYEE", 
        type: 'ADD_EMPLOYEE',
        path: `/employees/${id}`, 
        stateName: 'employee'
      })
    },[workOrders]);

    const handleOnClick = (e)=> {
        const confirmBox = window.confirm(
            "Are you sure you want to delete this employee?!"     
          )
        if (confirmBox === true) 
        props.deleteEmployee(employee.id)  
        navigate("/employees")

              
    }

    const handleOnImg=(e)=>{
      if (imageClassName === 'employee_card_image-larger'){
        setImageClassName('employee_card_image')
      }else{
        setImageClassName('employee_card_image-larger')
      }
    }

    const employeeAsUser = ()=>{
       return(
        <>
          <br/>
          <br/>
          <div className="container d-flex justify-content-center">
            <div className="card-container mb-3">    
                <div className="card-header employee-header-size">
                  <img src={user.profile_image} className="employee_card_image" ></img> 
                  <p >{user.user?.name}</p>
                </div> 
                <div className="card-body">
                  <strong>{user.user?.email}</strong> <br/>
                  <a href={`tel:${user.user?.phone}`}><span className="bottom">{user.user?.phone}</span></a> 
                </div>    
            </div>
          </div>
           <h3 className="center">Work Orders</h3>
          {user.user && employeeWorkOrders ? <WorkOrdersContainer   workOrders={user.user?.work_orders} employee={user.user} />: null}
        </>
      )
    }

    const otherEmployee=()=>{
      return (
        <>
        <br/>
        <br/>
            <div className="container d-flex justify-content-center">
                <div className="card-container mb-3 car-shadow">   
                    {user.admin? <i onClick={handleOnClick}  className="fa-solid fa-trash-can delete-task "></i>:null}   
                    <div className="card-header employee-header-size">
                      {employee.image ? <img src={employee.image} onClick={handleOnImg} className={imageClassName} ></img> : null}
                       <p >{employee.name}</p>
                    </div> 
                    <div className="card-body">
                       <strong>{employee.email}</strong> <br/>
                       <a href={`tel:${employee.phone}`}><span className="bottom">{employee.phone}</span></a> 
                    </div>    
                </div>
            </div>
            <h3 className="center">Work Orders</h3>
            {employee && employeeWorkOrders? <WorkOrdersContainer   workOrders={employeeWorkOrders} employee={employee} />:null}
        </>
      )
    }
  
    return (
        <>
            <div>
              {!user.admin && user.user?.id === id? employeeAsUser() : otherEmployee()}
            </div>
        </>
    )
};

const mapStateToProps = state => { 
    return {
      workOrders: state.workOrders.workOrders,
      user: state.user.user,
      workOrder: state.workOrder.workOrder,
      employee: state.employee.employee
    }
}

const mapDispatchToProps = dispatch => {
    return {
      getFetchAction: (action) => dispatch(getFetchAction(action)),
      deleteEmployee: (action) => dispatch(deleteEmployee(action))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetails)