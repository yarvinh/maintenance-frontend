
import {useNavigate,useParams} from 'react-router-dom';
import { connect } from 'react-redux';
import {useEffect} from 'react';
import {getUnit,deleteUnit} from "../../actions/unitsActions"
import EditUnit from './EditUnit';
import CreateTenant from '../tenants/CreateTenant'
import TenantContainer from '../../containers/TenantContainer';

const UnitsDetails = (props)=>{
    const {unit,user} = props
    const {building_id, unit_id} = useParams()
    let navigate = useNavigate()
    useEffect(() => {
        if(unit_id){
          props.getUnit({unitId: unit_id,buildingId: building_id})
        }
    },[]);


    const handleOnClick=(e)=>{
      const confirmBox = window.confirm(
        "Are you sure you want to delete this unit?"     
      )
      if (confirmBox === true) {
          props.deleteUnit({unitId: unit_id,buildingId: building_id})  
          navigate(-1)
      }
    }

    const goBack = (e) => {
        return navigate(-1)
    }
 
    return (
        <div>
            <div className="container d-flex ">
                <div className="card-container mb-3 car-shadow">
                    {user.admin ? <i onClick={handleOnClick}  className="fa-solid fa-trash-can delete-task "></i>:null} 
                    <div >
                        <div className="card-header text-font">
                            <h4 >{unit.building?.address}</h4>
                            <h4>Unit: {unit.unit}</h4>
                        </div>
                        <EditUnit unit={unit}/>
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
            <br/>
            <br/>
            <button  className="back-button" onClick={goBack}> {"<< Back"} </button>
            <div className='empty-space'></div>
        </div>
            
    ) 
   
};

const mapStateToProps = state => { 
    return {
      user: state.user.user,
      acordion: state.acordion.acordion,
      unit: state.unit.unit
    }

}

const mapDispatchToProps = dispatch => {
    return {
        getUnit: (action) => dispatch(getUnit(action)),
        deleteUnit: (action) => dispatch(deleteUnit(action)),
    }
}




  export default connect(mapStateToProps, mapDispatchToProps)(UnitsDetails)