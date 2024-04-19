
import {Link,useParams} from 'react-router-dom'
import { connect } from 'react-redux';
import {deleteTenant} from '../../actions/tenantsActions'
import EditTenant from './EditTenant';
const Tenant = (props)=>{
    const {building_id, unit_id} = useParams()
    const {tenant} = props
    const handleOnClick=(e)=>{
        const confirmBox = window.confirm(
          "Are you sure you want to delete this tenant?"     
        )
        if (confirmBox === true) {
            props.deleteTenant({buildingId: building_id, unitId: unit_id,tenantId: tenant.id})  
        }
    }
    return (
        < div className='tenant-text-container'>
            <div className='tenant-text'>
                <button onClick={handleOnClick}  className='delete-x' name="work-order">X</button>
            </div>
            <strong className='tenant-text'>{tenant.name}</strong> <br/>
            <strong className='tenant-text'></strong> <a href={`tel:${tenant.phone}`}><span className="bottom">{tenant.phone}</span></a> <br/>
            <strong className='tenant-text'>{tenant.email}</strong> <br/>
            <div>
                <EditTenant tenant={tenant}/>
                <br/>
            </div>
            {/* <br/> */}
        </div>
      ) 

}

const mapDispatchToProps = dispatch => {
    return {
        deleteTenant: (action) => dispatch(deleteTenant(action))
    }
}




  export default connect(null, mapDispatchToProps)(Tenant)