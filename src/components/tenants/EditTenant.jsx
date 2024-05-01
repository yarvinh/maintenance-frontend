import React, {useState,useEffect } from 'react';
import { connect } from 'react-redux';
import {editTenant} from '../../actions/tenantsActions'
import {useParams} from 'react-router-dom';
import {clearErrors} from '../../actions/errorsActions'
import {acordionButtonClass,diplayAcordion} from '../../componentsHelpers/acordion'
import '../../styles/styles.css'
import Errors from '../Errors';

const EditTenant = (props)=>{
    const {building_id} = useParams()
    const {tenant,errorsOrMessages,acordion} = props
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
    <button id={`edit-tenant-${tenant.id}`} className={`${acordionButtonClass(`edit-tenant-${tenant.id}`,acordion)} standar-button`}> Edit tenant</button>
    <div className={diplayAcordion(`edit-tenant-${tenant.id}`,acordion)}>

    <div className="tenant-form acordion">
        <div className='acordion'> 
        {errorsOrMessages.from === "update_tenant" ? <Errors errorsOrMessages={errorsOrMessages}/> : null}
        </div>  
        <form onSubmit={(e)=>handleOnSubmit(e,"name")} className='acordion'>
            <input onChange={handleOnChange} placeholder={tenant.name} name="name" className="standar-input acordion" type="text" value={editTenant.name}/>
            <button type='submit' className="standar-button acordion">Save full name</button>
        </form>   
        <form onSubmit={(e)=>handleOnSubmit(e,"phone")} className='acordion'>
            <input onChange={handleOnChange} placeholder={tenant.phone} name="phone" className="standar-input acordion" type="text" value={editTenant.phone}/>
            <button type='submit' className="standar-button acordion">Save number</button>
        </form>  
        <form onSubmit={(e)=>handleOnSubmit(e,"email")} className='acordion'>
            <input onChange={handleOnChange}  placeholder={tenant.email} name="email" className="standar-input acordion" type="text" value={editTenant.email}/>
            <button type='submit' className="standar-button acordion">Save email</button>
        </form>  
         <br/>
    </div>


    </div>
   

</div>   
  )
}

const mapStateToProps = state => { 
    return {
        acordion: state.acordion.acordion,
        errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        editTenant: (action) => dispatch(editTenant(action)),
        clearErrors: () => dispatch(clearErrors()),
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(EditTenant)