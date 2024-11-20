
import {useNavigate,useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect, useState} from 'react';
import EditUnit from './EditUnit';
import CreateTenant from '../tenants/CreateTenant'
import TenantContainer from '../../containers/TenantContainer';
import { deleteFetchAction, getFetchAction} from '../../actions/fetchActions';
import { deleteUnitSetter, getUnitSetter } from '../../componentsHelpers/fetchingFunctions';
import WorkOrdersContainer from '../../containers/WorkOrdersContainer';

const UnitsDetails = ()=>{
    const {buildingId, unitId} = useParams()
    const workOrders = useSelector(state =>  state.workOrders.workOrders )
    const dispatch = useDispatch()
    const unit = useSelector(state => state.unit.unit)
    const user = useSelector(state => state.user.user)
    const [editMode, setEditMode] = useState(false)
    let navigate = useNavigate()
    const unitsWorkOrders = workOrders.filter((workOrder =>{
        return workOrder.building_id?.toString() === buildingId && workOrder.unit?.toLowerCase() === unit.unit?.toLowerCase()
    }))

    useEffect(() => {
        const payload = getUnitSetter({buildingId: buildingId, id: unitId})
        if(unitId)
          dispatch(getFetchAction(payload))
    },[]);


    const handleOnClick=(e)=>{
        const confirmBox = window.confirm(
            "Are you sure you want to delete this unit?"     
        )
        const payload = deleteUnitSetter({id: unitId, buildingId: buildingId})
        if (confirmBox === true) {
            dispatch(deleteFetchAction(payload))
        navigate(-1)
      }
    }

    const handleOnEdit = (e) => {
        setEditMode((prev) => {  
            return !prev
        })
    }

    return (
        <section>
            <div className="container d-flex ">
                <div className="card-container mb-3 car-shadow">
                    {user.admin && <i onClick={handleOnClick}  className="fa-solid fa-trash-can delete-task "></i>} 
                    <div >
                        <div className="card-header text-font">
                            <h4 >{unit.building?.address}</h4>
                            <h3 className="static-height"> {editMode ? <EditUnit  unit={unit}/> : unit.unit } </h3>
                            <button onClick={handleOnEdit} className='unit-button'> {editMode ? "Close" : <img src='/pencil_1.png' className='pencil' alt="Edit"/>} </button>   
                        </div>
                        
                        <div className="card-body">
                           <h3 className='text-font'>Tenants</h3>
                           <div className='tenant-container'>
                               <TenantContainer unit={unit}/>
                           </div>  
                        </div> 
                        <CreateTenant user={user}/>
                    </div>
                </div>
            </div>
            {unit.id && <WorkOrdersContainer  workOrders={unitsWorkOrders} unit={unit}/>}
        </section>        
    )  
};


  export default UnitsDetails