
import { connect } from 'react-redux';
import {useParams,useNavigate,Link} from 'react-router-dom';
import EditBuilding from "./EditBuilding"
import '../../styles/styles.css'
import {deleteBuilding} from "../../actions/buildingsActions"
import WorkOrdersContainer from '../../containers/WorkOrdersContainer';
import UnitsContainer from '../../containers/UnitsContainer';
import { date } from '../../componentsHelpers/date';
import { useEffect } from 'react';
import { getFetchAction } from '../../actions/fetchActions';
import { buildingSetter } from '../../componentsHelpers/fetchingFunctions';

const BuildingDetails = (props)=>{
    const {id} = useParams()
    let navigate = useNavigate()
    const {building,workOrders,user} = props
    const buildingWorkOrders = workOrders.filter(wo => wo.building && wo.building_id.toString() === id) 
    
    useEffect(()=>{
      props.getFetchAction(buildingSetter(id))
    },[])

    const handleOnClick=(e)=>{
        const confirmBox = window.confirm(
            "Are you sure you want to delete this building?"     
          )
          if (confirmBox === true) {
              props.deleteBuilding(building.id)  
              navigate('/buildings')
          }    
    }

    return (
        <section className="text-font">
            <div className="container d-flex ">
                <div  className="card-container mb-3 car-shadow">
                    {user.admin ? <i onClick={handleOnClick}  className="fa-solid fa-trash-can delete-task "></i>:null} 
                    <div >
                        <div>
                            <h3 className="card-header">{building.address}</h3>
                        </div>
                        <div className="card-body">
                              {building.id && building.user_id?<EditBuilding currentBuilding={building} />:null}
                              {building.id && !building.user_id?<EditBuilding currentBuilding={building} />:null}
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
                        {user.admin || user.user?.user_id? <UnitsContainer building={building}/>:<strong className='building-warning'>You are not an authorize user to see units</strong>}
                    </div>  
                </div>
            </div>
            {building.id? <WorkOrdersContainer  building={building} workOrders={buildingWorkOrders} user={props.user}/>:null}
        </section>     
    )
};


const mapStateToProps = state => { 
    return {
      user: state.user.user,
      building: state.building.building,
      workOrders: state.workOrders.workOrders,
      loading: state.building.loading
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      getFetchAction: (action) => dispatch(getFetchAction(action)),
      deleteBuilding: (action) => dispatch(deleteBuilding(action))
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(BuildingDetails)