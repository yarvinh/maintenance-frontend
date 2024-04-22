
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import '../../styles/styles.css'
import {deleteEmployee} from "../../actions/employeesActions"

const Employee = (props)=>{
    const {employee,admin} = (props)

    const handleOnClick = (e)=> {
        const confirmBox = window.confirm(
            "Are you sure you want to delete this employee?!"     
          )
          if (confirmBox === true) {
            props.deleteEmployee(employee.id)  
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
                <td>{admin ? <i onClick={handleOnClick}  className="fa-solid fa-trash-can delete-task "></i>:null} </td>
            </tr>
   
        </>        
    )
};


const mapDispatchToProps = dispatch => {
    return {
      deleteEmployee: (action) => dispatch(deleteEmployee(action)),
    }
  }

  export default connect(null, mapDispatchToProps)(Employee)