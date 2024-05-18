import React, { useState,useEffect} from 'react';
import CreateWorkOrder from "../components/workorders/CreateWorkOrder"
import { connect } from 'react-redux';
import WorkOrder from "../components/workorders/WorkOrder"
// import {useNavigate} from 'react-router-dom';
import { clearErrors } from '../actions/errorsActions';
import {getSearchWorkOrders,workOrderSelector} from "../componentsHelpers/workOrdersHelper"

const WorkOrdersContainer = (props)=>{  
    let {employees,buildings,employee,building,fromHome,user} = props
    const [workOrders,setWorkOrders] = useState([])
    const [searchBoxValue, setSearchBoxValue] = useState('')
    // let navigate = useNavigate()

    useEffect(()=>{
     if (props.workOrders?.length > 0)
       setWorkOrders(props.workOrders)
    },[props.workOrders])

    // const goBack = (e) => {
    //     return navigate(-1)
    // }

    const handleOnChange = (e)=>{
        setSearchBoxValue(e.target.value)
        const searchedWorkOrders = getSearchWorkOrders({value: e.target.value, workOrdersArr: props.workOrders})
        setWorkOrders(searchedWorkOrders)
    }

    const handleOnclick = (e) => {  
        const newfilteredWorkOrders = workOrderSelector({workOrders: props.workOrders, filterBy: e.target.value })
        setWorkOrders(newfilteredWorkOrders)
    }

   return(
       <div className=' content-container'>
            <div className='workorder-content'>
                <div>
                    {user?.is_login ?<CreateWorkOrder  building={building} employees={employees} employee={employee} buildings={buildings}/>:null}
                </div>
                <br/>
                <br/>
                <div className='center'>
                    {props.workOrders?.length > 10 ?<input onChange={handleOnChange} className='search_box' placeholder='Search Work Orders ' type='search' value={searchBoxValue}/>:null}
                    {!fromHome? 
                        <select onChange={handleOnclick} className='form-select my-3 mx-auto' > 
                            <option value='all'>All</option>          
                            <option value='today'>Today</option>
                            <option value='closed'>Closed work orders</option>
                            <option value='pending'>Pending Work Orders</option>
                            <option value='expire'>Expire work orders</option>
                        </select> 
                    :
                       null}
                </div>
                {props.workOrders.length > 0 ? 
                    <table className="table table-striped" > 
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Due Date</th>
                                <th className="work_order_address" scope="col">Address</th>
                                <th scope="col">Summary</th>
                                <th scope="col">Assigned </th>
                                <th className="work_order_status" scope="col">status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {workOrders?.map((workOrder,index) => {return (<WorkOrder key={workOrder.id} workOrders={workOrders} user={user} index={index } workOrder={workOrder}/>)})}
                        </tbody>
                    </table>
                :
                    <h3 className='text'>You have no work orders to display at this moment</h3>}  
            </div>
       </div>
   )
}

const mapStateToProps = state => { 
    return {
        user: state.user.user,
        errors: state.workOrders.errors,
        employees: state.employees.employees,
        buildings: state.buildings.buildings,
        loading: state.workOrders.loading,
        acordion: state.acordion.acordion
    }
}
      
const mapDispatchToProps = dispatch => {
    return {
        clearErrors: () => dispatch(clearErrors())
    }
}   
      
export default connect(mapStateToProps,mapDispatchToProps  )(WorkOrdersContainer)