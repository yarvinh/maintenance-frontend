
import {Link} from 'react-router-dom';
import {useDispatch } from 'react-redux';
import '../../styles/styles.css'
import { deleteFetchAction } from '../../actions/fetchActions';
import { employeeDeleteSetter } from '../../componentsHelpers/fetchingFunctions';

const Employee = (props)=>{
    const dispatch = useDispatch()
    const {employee,admin} = (props)

    const handleOnClick = (e)=> {
        const confirmBox = window.confirm(
            "Are you sure you want to delete this employee?!"     
          )
          const payload = employeeDeleteSetter({id: employee.id})
          if (confirmBox === true) {
            dispatch(deleteFetchAction(payload))  
          }    
     }
   
    return (
        <>
            <tr>
                <td>{props.index}</td>
                <td>
                    <Link to={`/employees/${employee.id}`}>   <p >{employee.name}</p>  </Link>
                </td>
                <td><p>{employee.email}</p></td>
                <td> <a href={`tel:${employee.phone}`}><span className="bottom">{employee.phone}</span></a> </td>
                <td>{admin && <i onClick={handleOnClick}  className="fa-solid fa-trash-can delete-task "></i>} </td>
            </tr>
   
        </>        
    )
};

export default Employee