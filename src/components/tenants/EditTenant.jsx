import {useState} from 'react';
import { connect } from 'react-redux';
import {editTenant} from '../../actions/tenantsActions'
import {useParams} from 'react-router-dom';
import {accordionButtonClass,diplayAccordion} from '../../componentsHelpers/accordion'
import '../../styles/styles.css'
import Errors from '../Errors';

const EditTenant = (props)=>{
    const {building_id} = useParams()
    const {tenant,errorsOrMessages,accordion} = props
    const [editTenant,setEditTenant] = useState({
        name: "",
        phone: "",
        email: "",
    })

    let handleOnChange = (e)=>{
        setEditTenant({
          ...editTenant,
          [e.target.name]: e.target.value
        })
    }

    let handleOnSubmit = (e,type) =>{
        e.preventDefault()
      props.editTenant({tenant: {[type]: editTenant[type]}, building_id: building_id, tenant_id: tenant.id})
      setEditTenant({
        ...editTenant,
        [type]: ""
      })
    }

  return (
    <div className='center' >
    <button id={`edit-tenant-${tenant.id}`} className={`${accordionButtonClass(`edit-tenant-${tenant.id}`,accordion)} standar-button`}> Edit tenant</button>
    <div className={diplayAccordion(`edit-tenant-${tenant.id}`,accordion)}>

        <div className="tenant-form accordion">
            <div className='accordion'> 
            {(errorsOrMessages.from === "update_tenant") &&  <Errors errorsOrMessages={errorsOrMessages}/>}
            </div>  
            <form onSubmit={(e)=>handleOnSubmit(e,"name")} className='accordion'>
                <input onChange={handleOnChange} placeholder={tenant.name} name="name" className="standar-input accordion" type="text" value={editTenant.name}/>
                <button type='submit' className="standar-button accordion">Save full name</button>
            </form>   
            <form onSubmit={(e)=>handleOnSubmit(e,"phone")} className='accordion'>
                <input onChange={handleOnChange} placeholder={tenant.phone} name="phone" className="standar-input accordion" type="text" value={editTenant.phone}/>
                <button type='submit' className="standar-button accordion">Save number</button>
            </form>  
            <form onSubmit={(e)=>handleOnSubmit(e,"email")} className='accordion'>
                <input onChange={handleOnChange}  placeholder={tenant.email} name="email" className="standar-input accordion" type="text" value={editTenant.email}/>
                <button type='submit' className="standar-button accordion">Save email</button>
            </form>  
            <br/>
        </div>
    </div>
   

</div>   
  )
}

const mapStateToProps = state => { 
    return {
        accordion: state.accordion.accordion,
        errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        editTenant: (action) => dispatch(editTenant(action))
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(EditTenant)