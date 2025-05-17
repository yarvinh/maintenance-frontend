import  {useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import '../../styles/styles.css'
import { postFetchAction } from '../../actions/fetchActions';
import { displayFormReceived } from '../../state/reducers/displayElementReducer';
import { buildingPostSetter } from '../../componentsHelpers/fetchingFunctions';
import ErrorsOrMsg from '../ErrosOrMsg';

const CreateBuilding = () =>{
    const dispatch = useDispatch()
    const isDisplay = useSelector(state => state.isDisplay.formDisplay)
    const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)

    const [building, setBuilding] = useState({
        address: "",
        super_name: "",
        phone_number: "",
        bin: "",
        lot: "",
        block: "",
    })
    
    let handleOnChange = (e)=>{
      setBuilding({...building,[e.target.name]: e.target.value})
    }

    const handleOnClick = (e)=>{
      if (e.target.className.includes("active"))
        dispatch(displayFormReceived({buttonClass: "display_accordion", formClass: 'hide_elements', id: e.target.id}))
      else
        dispatch(displayFormReceived({buttonClass: "display_accordion active", formClass: 'display_elements', id: e.target.id}))   
    }

    let handleOnSubmit = (e) =>{
        e.preventDefault()
        const payload = buildingPostSetter({payload: {building: building}})
        dispatch(postFetchAction(payload))
        setBuilding({
          address: "",
          super_name: "",
          phone_number: "",
          bin: "",
          lot: "",
          block: "",
        })
    }

  return(  
    <div className="center">
    <button id="create-building" onClick={handleOnClick} className={isDisplay.buttonClass}> Create A Building</button>
    <div className={isDisplay.id.includes("create-building") ? `${isDisplay.formClass} form-wrapper`: 'hide_elements'}>
    <div className="standar-forms standar-form-position accordion">
      <div className="container d-flex justify-content-center align-items-center accordion" > 
          <form onSubmit={handleOnSubmit} className='accordion'>
              <div className='accordion'> 
              {errorsOrMsg.from.includes("create_building") && <ErrorsOrMsg {...(errorsOrMsg.errors ? { errors: errorsOrMsg.errors } :{msg: errorsOrMsg.msg })} />}
              </div>  
              <label htmlFor='c-b-address' className='accordion required-field'>Address</label>
              <input id='c-b-address' onChange={handleOnChange}  name="address" className="standar-input accordion" type="text" value={building.address}/><br/>
              <label htmlFor='c-b-superintendent' className='accordion required-field'>Superintendent</label>
              <input id='c-b-superintendent' onChange={handleOnChange} name="super_name" className="standar-input accordion" type="text" value={building.super_name}/><br/>
              <label htmlFor='c-b-phone' className='accordion required-field'>Phone</label>
              <input id='c-b-phone' onChange={handleOnChange}  name="phone_number" className="standar-input accordion" type="phone" value={building.phone_number}/><br/>
              <label htmlFor='c-b-bin-number' className='accordion'>Bin Number</label>
              <input id='c-b-bin-number' onChange={handleOnChange}  name="bin" className="standar-input accordion" type="text" value={building.bin}/><br/>
              <label htmlFor='c-b-tax-lot' className='accordion'>Tax lot</label>
              <input id='c-b-tax-lot' onChange={handleOnChange}  name="lot" className="standar-input accordion" type="text" value={building.lot}/><br/>
              <label htmlFor='c-b-tax-block' className='accordion'>Tax block</label>
              <input id='c-b-tax-block' onChange={handleOnChange}  name="block" className="standar-input accordion" type="text" value={building.block}/><br/>
              <button type='submit' className="white-blue-buttons accordion">Submit</button>
          </form> 
        </div>    
    </div>
    </div>
</div>
  )
}
        
export default CreateBuilding

