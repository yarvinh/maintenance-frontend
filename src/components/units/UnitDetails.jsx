
import {useNavigate,useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from 'react';
import EditUnit from './EditUnit';
import CreateTenant from '../tenants/CreateTenant'
import TenantContainer from '../../containers/TenantContainer';
import { deleteFetchAction, getFetchAction } from '../../actions/fetchActions';
import { deleteUnitSetter, getUnitSetter } from '../../componentsHelpers/fetchingFunctions';

const UnitsDetails = ()=>{

    const {buildingId, unitId} = useParams()
    const dispatch = useDispatch()
    const unit = useSelector(state => state.unit.unit)
    const user = useSelector(state => state.user.user)

    let navigate = useNavigate()
    useEffect(() => {
        const payload = getUnitSetter({buildingId: buildingId,id: unitId})
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

    return (
        <section>
            <div className="container d-flex ">
                <div className="card-container mb-3 car-shadow">
                    {user.admin && <i onClick={handleOnClick}  className="fa-solid fa-trash-can delete-task "></i>} 
                    <div >
                        <div className="card-header text-font">
                            <h4 >{unit.building?.address}</h4>
                            <h4>Unit: {unit.unit}</h4>
                        </div>
                        {/* <EditUnit unit={unit}/> */}
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
        </section>        
    )  
};


  export default UnitsDetails