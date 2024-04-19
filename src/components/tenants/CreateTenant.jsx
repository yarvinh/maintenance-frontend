import React, {useState,useEffect } from 'react';
import { connect } from 'react-redux';
import {createTenant} from '../../actions/tenantsActions'
import {useParams} from 'react-router-dom';
import {clearErrors} from '../../actions/errorsActions'
import {acordionButtonClass,diplayAcordion} from '../../componentsHelpers/acordion'
import '../../styles/styles.css'

const CreateTenant = (props) =>{
    const {acordion} = props
    let {unit_id,building_id} = useParams()
    
    const [tenant,setTenant] = useState({
        building_id: building_id,
        unit_id: unit_id,
        name: "",
        phone: "",
        email: ""

    })
    
    let handleOnChange = (e)=>{
        setTenant({
            ...tenant,[e.target.name]: e.target.value
        })
    }

    let handleOnSubmit = (e) =>{
        e.preventDefault()
        props.createTenant(tenant)
        setTenant({
            ...tenant,
            name: "",
            phone: "",
            email: ""
        })
    }

    return(   
      <div className='center'>
            <button id='create-tenant' className={acordionButtonClass('create-tenant',acordion)}> Add a new tenant</button>
            <div className={diplayAcordion('create-tenant',acordion)}>
                <div className="standar-forms acordion">
                    <form onSubmit={handleOnSubmit} className='acordion'>
                        <div className='acordion' > 
                          {props.errorsOrMessages.map((e,k) => {return <li key={k} className="errors acordion">{e}</li>})}
                        </div>  
                        <input onChange={handleOnChange}  placeholder="Tenant name" name="name" className="standar-input acordion" type="text" value={tenant.name}/><br></br>
                        <input onChange={handleOnChange}  placeholder="Tenant phone #" name="phone" className="standar-input acordion" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required value={tenant.phone}/><br></br>
                        <input onChange={handleOnChange}  placeholder={"Tenant email"} className="standar-input acordion"  type="email"  name="email" value={tenant.email}/> <br/>
                        <button type='submit' className="btn btn-primary  acordion">Save</button>
                    </form>    
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
        createTenant: (action) => dispatch(createTenant(action)),
        clearErrors: () => dispatch(clearErrors()),
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(CreateTenant)