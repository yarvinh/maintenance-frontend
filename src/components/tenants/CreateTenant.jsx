import {useRef, useState} from 'react';
import { useDispatch } from 'react-redux';
import {useParams} from 'react-router-dom';
import '../../styles/styles.css'
import { postFetchAction } from '../../actions/fetchActions';

const CreateTenant = () =>{
    let {unitId,buildingId} = useParams()
    const dispatch = useDispatch()
    const [accordionDisplay, setAccordionDisplay] = useState(false)
    const formRef = useRef()
    const [tenant,setTenant] = useState({
        building_id: buildingId,
        unit_id: unitId,
        name: "",
        phone: "",
        email: ""
    })

    const handleOnClick = (e) => {
        if(accordionDisplay) {
           e.target.className = "display_accordion active"
           formRef.current.className = 'display_elements'
        } else {
            e.target.className = "display_accordion"
            formRef.current.className = 'hide_elements'
        }
        setAccordionDisplay(prev => !prev)
    }
    
    let handleOnChange = (e)=>{
        setTenant({
            ...tenant,[e.target.name]: e.target.value
        })
    }

    let handleOnSubmit = (e) =>{
        e.preventDefault()
        const payload = {
          payload: {tenant: tenant},
          path:`/buildings/${buildingId}/units/${unitId}/tenants`
        }
        dispatch(postFetchAction(payload))

        setTenant({
            ...tenant,
            name: "",
            phone: "",
            email: ""
        })
    }

    return(   
      <div className='center'>
            <button id='create-tenant' onClick={handleOnClick} className="display_accordion"> Add a new tenant</button>
            <div ref={formRef} className="hide_elements">
                <div className="standar-forms accordion">
                    <form onSubmit={handleOnSubmit} className='accordion'>
                        <div className='accordion' > 
                        {/* {(errorsOrMessages.from === "create_tenant") && <Errors errorsOrMessages={errorsOrMessages}/> } */}
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
     
export default CreateTenant