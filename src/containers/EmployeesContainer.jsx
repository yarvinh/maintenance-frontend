import React, {useState} from 'react';
import { connect } from 'react-redux';
import CreateEmployees from '../components/employees/CreateEmployees'
import Employee from "../components/employees/Employee"
import {useParams,useNavigate} from 'react-router-dom';
import {searchEmployees} from "../actions/employeesActions"
import { useEffect } from 'react';
import {employeesFilter} from '../componentsHelpers/employees'
import { getFetchAction } from '../actions/fetchActions';
import { EMPLOYEES_SETTER } from '../componentsHelpers/fetchingConstants';
const EmployeesContainer = (props) => {
    let navigate = useNavigate()
    let {admin,user} = props.user
    const {id} = useParams()
    const [employees, setEmployees] = useState([])
    const [searchBoxValue, setSearchBoxValue] = useState("")
    useEffect(()=>{
        props.getFetchAction(EMPLOYEES_SETTER)
    },[])
    useEffect(()=>{
        if(props.employees?.length > 0)
          setEmployees(props.employees)
    },[props.employees])
    
    const goBack = (e) => {
        return navigate(-1)
    }

   let handleOnChange = (e)=>{
        const filteredEmployees = employeesFilter({employees: props.employees,value: e.target.value.toLowerCase()})
        if (e.target.name === 'local-search'){
          setEmployees(filteredEmployees)
        }
        setSearchBoxValue(e.target.value.toLowerCase())
   } 

   const handleOnSubmit = (e)=>{
       e.preventDefault()
       if (searchBoxValue.trim() !== ''){
        return props.searchEmployees(searchBoxValue)
    }
   }

    const renderEmployees = () => {   
        return (
            <>
                <table className="table table-striped" > 
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee,index) => {return (<Employee key={employee.id} admin={admin} employee={employee} index={index + 1} />)}) }
                    </tbody>
                </table>
            </>
        ) 
    }

    return (
        <div> 
            {!id && admin?<CreateEmployees />: null }
            <br/>
            <div className="center">
                {props.employees?.length > 0 && user?.user_id || props.employees?.length > 0 && admin?<input onChange={handleOnChange} className='search_box' name="local-search" placeholder='Search employees ' type='search' value={searchBoxValue}/>:null}
            </div>
            <div >
                <form onSubmit={handleOnSubmit} className="text-area-section">
                  {!user?.user_id && !admin ? <input onChange={handleOnChange} className='search_box' placeholder='Search employees' name='backend-search' type='search' value={searchBoxValue}/>:null}
                </form>
            </div>
            <br/>
            <div>
              {!id && props.employees?.length > 0 ? renderEmployees(): <h3 className='text'>You have no employees to display at this moment</h3> }
            </div>
            <button className="back-button"  onClick={goBack}> {"<< Back"} </button>
            <div className='empty-space'></div>
        </div>
    )
}

const mapStateToProps = state => { 
    return {
       user: state.user.user,
       employees: state.employees.employees,
       loading: state.employees.loading
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        getFetchAction: (action) => dispatch(getFetchAction(action)),
        searchEmployees: (action) => dispatch(searchEmployees(action)),
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(EmployeesContainer)
  