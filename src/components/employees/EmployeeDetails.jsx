import { useDispatch, useSelector } from 'react-redux';
import {useParams,useNavigate} from 'react-router-dom';
import {useEffect,useState } from 'react';
import WorkOrdersContainer from '../../containers/WorkOrdersContainer';
import { deleteFetchAction, getFetchAction} from '../../actions/fetchActions';
import '../../styles/styles.css'
import { employeeDeleteSetter, employeeGetSetter } from '../../componentsHelpers/fetchingFunctions';
import ErrorsOrMsg from '../ErrosOrMsg';

const EmployeeDetails = ()=>{    
    const dispatch = useDispatch()
    // const workOrders = useSelector(state => state.workOrders.workOrders)
    // const workOrder = useSelector(state => state.workOrder.workOrder)
    const employee = useSelector(state => state.employee.employee)
    const user = useSelector(state => state.user.user)
    const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)
    const {employeeId} = useParams()
    const navigate = useNavigate()
    const [imageClassName, setImageClassName] = useState("employee_card_image")
    const employeeWorkOrders =  employee?.work_orders 
    useEffect(() => {
      const payload = employeeGetSetter({id: employeeId})
      dispatch(getFetchAction(payload))
    },[]);

    const handleOnClick = (e)=> {
        const payload = employeeDeleteSetter({id: employeeId})
        const confirmBox = window.confirm(
            "Are you sure you want to delete this employee?!"     
          )
        if (confirmBox === true){
          dispatch(deleteFetchAction(payload))
          navigate("/employees")
        }

              
    }

    const handleOnImg=(e)=>{
      if (imageClassName === 'employee_card_image-larger'){
        setImageClassName('employee_card_image')
      }else{
        setImageClassName('employee_card_image-larger')
      }
    }

    // const employeeAsUser = ()=>{
    //    return(
    //     <>
    //       <div className="container d-flex justify-content-center">
    //         <div className="card-container mb-3">    
    //             <div className="card-header employee-header-size">
    //               <img src={user.profile_image ? user.profile_image: "/blank-profile-picture-973460_1280.webp"} className="employee_card_image" ></img> 
    //               <p >{user.user?.name}</p>
    //             </div> 
    //             <div className="card-body">
    //               <strong>{user.user?.email}</strong> <br/>
    //               <a href={`tel:${user.user?.phone}`}><span className="bottom">{user.user?.phone}</span></a> 
    //             </div>    
    //         </div>
    //       </div>
    //        <h3 className="center">Work Orders</h3>
    //       {(user.user && employeeWorkOrders) && <WorkOrdersContainer  workOrders={user.user?.work_orders} employee={user.user} />}
    //     </>
    //   )
    // }

    // const otherEmployee=()=>{
      return (
        <>
            <div className="container d-flex justify-content-center">
                <div className="card-container mb-3 car-shadow">   

                    {user.admin && <i onClick={handleOnClick}  className="fa-solid fa-trash-can delete-task "></i>}   
                    <div className="card-header employee-header-size">
                       <img src={employee.image ? employee.image : "/blank-profile-picture-973460_1280.webp"} onClick={handleOnImg} className={imageClassName} ></img>
                       <p >{employee.name}</p>
                    </div> 
                    <div className="card-body">
                    {errorsOrMsg.from.includes("employee") && <ErrorsOrMsg {...(errorsOrMsg.errors ? { errors: errorsOrMsg.errors } :{msg: errorsOrMsg.msg })} />}
                       <strong>{employee.email}</strong> <br/>
                       <a href={`tel:${employee.phone}`}><span className="bottom">{employee.phone}</span></a> 
                    </div>    
                </div>
            </div>
            <h3 className="center">Work Orders</h3>
            {(employee && employeeWorkOrders) && <WorkOrdersContainer  workOrders={employeeWorkOrders} employee={employee} />}
        </>
      )
    // }
  
    // return (
    //     <>
    //         <div>
    //           {!user.admin && user.user?.id === employeeId? employeeAsUser() : otherEmployee()}
    //         </div>
    //     </>
    // )
};

export default EmployeeDetails