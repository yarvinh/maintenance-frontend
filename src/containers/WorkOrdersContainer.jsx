import { useState,useEffect} from 'react';
import CreateWorkOrder from "../components/workorders/CreateWorkOrder"
import WorkOrder from "../components/workorders/WorkOrder"
import {getSearchWorkOrders,workOrderSelector} from "../componentsHelpers/workOrdersHelper"
import { useSelector } from 'react-redux';

const WorkOrdersContainer = (props, { building, fromHome, employee })=>{  
    const user = useSelector(state => state.user.user)
    const employees = useSelector(state => state.employees.employees)
    const buildings = useSelector(state => state.buildings.buildings)
    const [workOrders,setWorkOrders] = useState([])
    const [searchBoxValue, setSearchBoxValue] = useState('')
    
    useEffect(()=>{
      props.workOrders?.length > 0 && setWorkOrders(props.workOrders)
    },[props.workOrders])

    const handleOnChange = (e)=>{
        setSearchBoxValue(e.target.value)
        const searchedWorkOrders = getSearchWorkOrders({value: e.target.value, workOrdersArr: props.workOrders})
        setWorkOrders(searchedWorkOrders)
    }
    const totalReceiptAmount = ()=>{
        const total =  workOrders.reduce((accumulator,{receipts_total}) => accumulator + receipts_total,0)
        return total.toFixed(2)?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    }

    const taskInventoryTotal = ()=>{
        const total =  workOrders.reduce((accumulator,{task_inventory_total}) => accumulator + task_inventory_total,0)
        return total.toFixed(2)?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    }
    
    const handleOnclick = (e) => {  
        const newfilteredWorkOrders = workOrderSelector({workOrders: props.workOrders, filterBy: e.target.value })
        setWorkOrders(newfilteredWorkOrders)
    }

    return(
       <div className=' content-container'>
            <div className='workorder-content'>
                <div>
                    {user?.is_login && <CreateWorkOrder  unit={props.unit} building={building} employees={employees} employee={employee} buildings={buildings}/>}
                </div>
                <br/>

                <div className='center'>
                    {props.workOrders?.length > 10 && <input onChange={handleOnChange} className='search_box' placeholder='Search Work Orders ' type='search' value={searchBoxValue}/>}
                    {!fromHome && 
                        <select onChange={handleOnclick} className='form-select my-3 mx-auto' > 
                            <option value='all'>All</option>          
                            <option value='today'>Today</option>
                            <option value='closed'>Closed work orders</option>
                            <option value='pending'>Pending Work Orders</option>
                            <option value='expire'>Expire work orders</option>
                        </select> 
                    }
                </div>
                    <p className='center inventory'>
                       <strong>Receipts total: {totalReceiptAmount()} </strong> <br/>
                       <strong>Tasks inventory total: {taskInventoryTotal()} </strong>
                    </p>
                {props.workOrders.length > 0 ? 
                    <table className="table table-striped" > 
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Due Date</th>
                                <th className="work_order_address" scope="col">Address</th>
                                <th scope="col">Summary</th>
                                <th className="units-column" scope="col">Units</th>
                                <th scope="col">Assigned </th>
                                <th className="tasks-receipts" scope="col">Tasks</th>
                                <th className="tasks-receipts" scope="col">Receipts </th>
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

export default WorkOrdersContainer