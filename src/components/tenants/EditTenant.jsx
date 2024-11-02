import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import '../../styles/styles.css'
import { patchFetchAction } from '../../actions/fetchActions';
import { editTenantReceived } from '../../state/reducers/unitReducer';
import ErrorsOrMsg from '../ErrosOrMsg';

const EditTenant = ({tenant})=>{
    const {buildingId,unitId} = useParams()
    const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)
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

    let handleOnSubmit = (e) =>{
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
            <form onSubmit={handleOnSubmit}>
                <input onChange={handleOnChange} placeholder={tenant.name} name="name" className="edit-input" type="text" value={editTenant.name}/>
                <input onChange={handleOnChange} placeholder={tenant.phone} name="phone" className="" type="text" value={editTenant.phone}/>
                <input onChange={handleOnChange}  placeholder={tenant.email} name="email" className="edit-input" type="text" value={editTenant.email}/>
                <button type='submit' className="standar-button accordion">Save</button>
                {errorsOrMsg.from.includes("edit_tenant") && <ErrorsOrMsg {...(errorsOrMsg.errors ? { errors: errorsOrMsg.errors } :{msg: errorsOrMsg.msg })} />}
            </form>  
        </>
    )
}
    
export default EditTenant