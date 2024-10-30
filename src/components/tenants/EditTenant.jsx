import {useState} from 'react';
import { useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';
import '../../styles/styles.css'
import { patchFetchAction } from '../../actions/fetchActions';
import { editTenantReceived } from '../../state/reducers/unitReducer';

const EditTenant = ({tenant})=>{
    const {buildingId,unitId} = useParams()
    const dispatch = useDispatch()
    const [editTenant,setEditTenant] = useState({
        name: tenant.name,
        phone: tenant.phone,
        email: tenant.email,
    })

    let handleOnChange = (e)=>{
        setEditTenant({
          ...editTenant,
          [e.target.name]: e.target.value
        })
    }

    let handleOnSubmit = (e,type) =>{
        e.preventDefault()
        const payload = {
            payload: {tenant: editTenant},
            path: `/buildings/${buildingId}/units/${unitId}/tenants/${tenant.id}`,
            itemsReducer: editTenantReceived
        }
        dispatch(patchFetchAction(payload))
    }

    return (
        <>
            <form onSubmit={(e)=>handleOnSubmit(e,"name")} className='accordion'>
                <input onChange={handleOnChange} placeholder={tenant.name} name="name" className="edit-input" type="text" value={editTenant.name}/>
                <input onChange={handleOnChange} placeholder={tenant.phone} name="phone" className="edit-input" type="text" value={editTenant.phone}/>
                <input onChange={handleOnChange}  placeholder={tenant.email} name="email" className="edit-input" type="text" value={editTenant.email}/>
                <button type='submit' className="standar-button accordion">Save</button>
            </form>  
        </>
    )
}
    
export default EditTenant