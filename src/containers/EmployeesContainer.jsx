import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreateEmployees from '../components/employees/CreateEmployees'
import Employee from "../components/employees/Employee"
import {useParams} from 'react-router-dom';
import { useEffect } from 'react';
import {employeesFilter} from '../componentsHelpers/employees'
import { getFetchAction } from '../actions/fetchActions';
import { EMPLOYEES_SETTER } from '../componentsHelpers/fetchingConstants';
import { employeesLoading, employeesReceived } from '../state/reducers/employeesReducer';

const EmployeesContainer = () => {
    const dispatch = useDispatch()
    const userData = useSelector(state => state.user.user)
    const employeesData = useSelector(state => state.employees.employees)
    let {admin,user} = userData
    const {id} = useParams()
    const [employees, setEmployees] = useState([])
    const [searchBoxValue, setSearchBoxValue] = useState("")

    useEffect(()=>{
        dispatch(getFetchAction(EMPLOYEES_SETTER))
    },[dispatch])
    
    useEffect(()=>{
        if(employeesData?.length > 0) setEmployees(employeesData )
    },[employeesData])
    
    let handleOnChange = (e)=>{
        const filteredEmployees = employeesFilter({employees: employeesData,value: e.target.value.toLowerCase()})
        if (e.target.name === 'local-search'){
          setEmployees(filteredEmployees)
        }
        setSearchBoxValue(e.target.value.toLowerCase())
   } 

    const handleOnSubmit = (e)=>{
        e.preventDefault()
        if (searchBoxValue.trim() !== '')
          dispatch(getFetchAction({path: "/search/employees/", query_string: searchBoxValue, reducer: employeesReceived, loading: employeesLoading}))
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
                {(employeesData?.length > 0 && !user?.user_id) || (employeesData?.length > 0 && admin) ?<input onChange={handleOnChange} className='search_box' name="local-search" placeholder='Search employees ' type='search' value={searchBoxValue}/>:null}
            </div>
            <div >
                <form onSubmit={handleOnSubmit} className="text-area-section center">
                  {user?.user_id && !admin ? <input onChange={handleOnChange} className='search_box' placeholder='Search employees' name='backend-search' type='search' value={searchBoxValue}/>:null}
                </form>
            </div>
            <br/>
            <div>
              {!id && employeesData?.length > 0 ? renderEmployees(): <h3 className='text'>You have no employees to display at this moment</h3> }
            </div>
        </div>
    )
}

export default EmployeesContainer
  