import {useState} from 'react';
import { connect } from 'react-redux';
import {createTenant} from '../../actions/tenantsActions'
import {useParams} from 'react-router-dom';
import {accordionButtonClass,diplayAccordion} from '../../componentsHelpers/accordion'
import '../../styles/styles.css'
import Errors from '../Errors';

const CreateTenant = (props) =>{
    const {accordion,errorsOrMessages} = props
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
            <button id='create-tenant' className={accordionButtonClass('create-tenant',accordion)}> Add a new tenant</button>
            <div className={diplayAccordion('create-tenant',accordion)}>
                <div className="standar-forms accordion">
                    <form onSubmit={handleOnSubmit} className='accordion'>
                        <div className='accordion' > 
                        {(errorsOrMessages.from === "create_tenant") && <Errors errorsOrMessages={errorsOrMessages}/> }
                        </div>  
                        <input onChange={handleOnChange}  placeholder="Tenant name" name="name" className="standar-input accordion" type="text" value={tenant.name}/><br></br>
                        <input onChange={handleOnChange}  placeholder="Tenant phone #" name="phone" className="standar-input accordion" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required value={tenant.phone}/><br></br>
                        <input onChange={handleOnChange}  placeholder={"Tenant email"} className="standar-input accordion"  type="email"  name="email" value={tenant.email}/> <br/>
                        <button type='submit' className="white-blue-buttons  accordion">Save</button>
                    </form>    
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
        createTenant: (action) => dispatch(createTenant(action))
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(CreateTenant)