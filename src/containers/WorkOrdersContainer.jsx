import { useState,useEffect, useMemo} from 'react';
import CreateWorkOrder from "../components/workorders/CreateWorkOrder"
import WorkOrder from "../components/workorders/WorkOrder"
import {getSearchWorkOrders} from "../componentsHelpers/workOrdersHelper"
import { useDispatch, useSelector } from 'react-redux';
import {filterWorkOrderSetter} from '../componentsHelpers/fetchingFunctions';
import { getFetchAction } from '../actions/fetchActions';
import LoadingItems from '../components/LoadingItems';
import { calculateTotal } from '../componentsHelpers/arrayHelper';
import ToolTip from '../components/ToolTip';

const WorkOrdersContainer = ( {unit, workOrders, building, fromHome, employee })=>{  
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const employees = useSelector(state => state.employees.employees)
    const buildings = useSelector(state => state.buildings.buildings)
    const loading = useSelector(state => state.workOrders.workOrdersLoading)
    const [displayWorkOrders, setDisplayWorkOrders] = useState([])
    const [searchBoxValue, setSearchBoxValue] = useState('')

    useEffect(()=>{
      workOrders?.length > 0 && setDisplayWorkOrders(workOrders)
    },[workOrders])

    const handleOnChange = (e)=>{
        setSearchBoxValue(e.target.value)
        const searchedWorkOrders = getSearchWorkOrders({value: e.target.value, workOrdersArr: workOrders})
        setDisplayWorkOrders(searchedWorkOrders)
    }

    const totalReceiptAmount = useMemo(() => calculateTotal(displayWorkOrders, 'receipts_total'), [displayWorkOrders]);
    const taskInventoryTotal = useMemo(() => calculateTotal(displayWorkOrders, 'task_inventory_total'), [displayWorkOrders]);
    const totalProfit = (parseInt(taskInventoryTotal) - parseInt(totalReceiptAmount))?.toString()
    const handleOnclick = (e) => {  
        const setter = filterWorkOrderSetter({query_string: e.target.value})
         dispatch(getFetchAction(setter))
         setSearchBoxValue("")
    }

    return(
       <div className=' content-container'>
            <div className='workorder-content'>
                <div>
                    {user?.is_login && <CreateWorkOrder  unit={unit} building={building} employees={employees} employee={employee} buildings={buildings}/>}
                </div>
                <br/>
                <div className='center'>
                    <div className='search-box'>
                      {workOrders?.length > 10 && <input onChange={handleOnChange} className='search_box' placeholder='Search Work Orders ' type='search' value={searchBoxValue}/>}
                      {workOrders?.length > 10 && <ToolTip>
                        <p> Search by date, address, and employee.</p> 
                       </ToolTip>}
                    </div>
                    {!fromHome && 
                        <select onChange={handleOnclick} className='form-select my-3 mx-auto' > 
                            <option value='pending'>Pending Work Orders</option>
                            <option value="2025">2025</option>
                            <option value="2024">2024</option>
                            <option value="2023">2023</option>
                        </select> 
                    }
                </div>
                    <p className='center inventory'>
                       <strong>Receipts total: {totalReceiptAmount?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} </strong> <br/>
                       <strong>Tasks inventory total: {taskInventoryTotal?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} </strong> <br/>
                       <strong>Total profit: {totalProfit?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} </strong>
                    </p>
                    <div className='center'>
                       {loading && <LoadingItems/>} 
                    </div>
                    {workOrders?.length > 0 ? 
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
                            {displayWorkOrders?.map((workOrder,index) => {return (<WorkOrder key={workOrder.id} workOrders={displayWorkOrders} user={user} index={index } workOrder={workOrder}/>)})}
                        </tbody>
                    </table>
                :
                    <h3 className='text'>You have no work orders to display at this moment</h3>}  
            </div>
       </div>
    )
}

export default WorkOrdersContainer