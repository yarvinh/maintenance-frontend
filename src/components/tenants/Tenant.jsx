
import {useParams} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import EditTenant from './EditTenant';
import { deleteFetchAction } from '../../actions/fetchActions';
import { createdOrDeleteTenant } from '../../state/reducers/unitReducer';
import EditPencil from '../EditPencil';
import { useState } from 'react';

const Tenant = ({tenant})=>{
    const {buildingId, unitId} = useParams()
    const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()
    const handleOnClick=(e)=>{
        const confirmBox = window.confirm(
          "Are you sure you want to delete this tenant?"     
        )
        const payload = {
            path: `/buildings/${buildingId}/units/${unitId}/tenants/${tenant.id}`,
            reducer: createdOrDeleteTenant
        }
        if (confirmBox === true) 
            dispatch(deleteFetchAction(payload))
    }
    
    return (
        <div className='tenant-text-container tenant-card'>
            <div className='tenant-text'>
                <button onClick={handleOnClick}  className='delete-x' name="work-order">X</button>
            </div>

            <EditPencil editMode={editMode} setEditMode={setEditMode}/> <br/>
            { !editMode ? <div >
                <div className="tenant-inf">
                   <strong className='tenant-text tenant-inf'>{tenant.name}</strong> <br/>
                </div>
                <div className="tenant-inf">
                   <strong className='tenant-text'></strong> <a href={`tel:${tenant.phone}`}><span className="bottom">{tenant.phone}</span></a> <br/>
                </div>
                <div className="tenant-inf">
                <strong className='tenant-text'>{tenant.email}</strong> 
                </div>
            </div> : 
            <div>
              <EditTenant tenant={tenant}/>
            </div>}

        </div>
      ) 

}

export default Tenant