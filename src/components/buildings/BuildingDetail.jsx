
import { useDispatch, useSelector } from 'react-redux';
import {useParams,useNavigate,Link} from 'react-router-dom';
import EditBuilding from "./EditBuilding"
import '../../styles/styles.css'
import WorkOrdersContainer from '../../containers/WorkOrdersContainer';
import UnitsContainer from '../../containers/UnitsContainer';
import { date } from '../../componentsHelpers/date';
import { useEffect } from 'react';
import { deleteFetchAction, getFetchAction } from '../../actions/fetchActions';
import { buildingDeleteSetter, buildingGetSetter } from '../../componentsHelpers/fetchingFunctions';

const BuildingDetails = ()=>{
    const {buildingId} = useParams()
    const dispatch = useDispatch()
    let navigate = useNavigate()
    const user = useSelector(state => state.user.user)
    const building = useSelector(state => state.building.building)
    const workOrders = useSelector(state => state.workOrders.workOrders)
    const loading = useSelector(state => state.building.buildingLoading)

    const buildingWorkOrders = workOrders.filter(wo => wo.building && wo.building_id.toString() === buildingId) 
    useEffect(()=>{
        const payload = buildingGetSetter({id: buildingId})
        dispatch(getFetchAction(payload))
    },[])

    const handleOnClick=(e)=>{
       const payload = buildingDeleteSetter({id: building.id})
        const confirmBox = window.confirm(
            "Are you sure you want to delete this building?"     
          )
          if (confirmBox === true) {
            dispatch(deleteFetchAction(payload))
            navigate('/buildings')
          }    
    }

    return (
        <section className="text-font">
            <div className="container d-flex ">
                <div  className="card-container mb-3 car-shadow">
                    {user.admin && <i onClick={handleOnClick}  className="fa-solid fa-trash-can delete-task "></i>} 
                    <div >
                        <div>
                            <h3 className="card-header">{building.address}</h3>
                        </div>
                        <div className="card-body">
                            {building.id && building.user_id && <EditBuilding currentBuilding={building} />}
                            {building.id && !building.user_id && <EditBuilding currentBuilding={building} />}
                            <span>Created date: {date(building.created_at)}</span> <br/>
                            <strong>Superintendent: {building.super_name}</strong><br></br>
                            <strong>contact: <a href={`tel:${building.phone_number}`}><span className="bottom">{building.phone_number}</span></a> </strong> <br></br>
                            <strong>Bin: {building.bin}</strong><br></br>
                            <strong>Lot: {building.lot}</strong><br></br>
                            <strong>Block: {building.block}</strong> <br></br> 
                        </div> 
                        <div className='building-warning'>
                            {building.bin ? <Link to={`/buildings/${building.bin}/dob_violations`} >DOB Violations</Link>  :<p>Bin number must exist to see dob violations</p>}<br/>
                            {building.bin ? <Link to={`/buildings/${building.bin}/hpd_complaints`} >HPD complaints</Link>  :<p>Bin number must exist to see hpd complaints</p>}<br/>
                            {building.lot && building.block ? <Link to={`/buildings/${building.lot}/hpd_violations/${building.block}`} >HPD Violations</Link>: <p>Lot and block must exist to see HPD violations.</p> } <br/>
                        </div>
                        {user.admin || user.user?.user_id ? <UnitsContainer building={building}/>:<strong className='building-warning'>You are not an authorize user to see units</strong>}
                    </div>  
                </div>
            </div>
            {building.id && <WorkOrdersContainer  building={building} workOrders={buildingWorkOrders} user={user}/>}
        </section>     
    )
};


  export default BuildingDetails