import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import { patchFetchAction } from '../../actions/fetchActions';
import '../../styles/styles.css'
import { displayFormReceived } from '../../state/reducers/displayElementReducer';
import ErrorsOrMsg from '../ErrosOrMsg';
import { buildingPatchSetter } from '../../componentsHelpers/fetchingFunctions';

const EditBuilding = ({currentBuilding} ) =>{
    const dispatch = useDispatch()
    const isDisplay = useSelector(state => state.isDisplay.formDisplay)
    const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)
    let {buildingId} = useParams()
    const [building, setBuilding] = useState({
        address: "",
        super_name: "",
        phone_number: "",
        bin: "",
        block: "",
        lot: "",
    })

    const handleOnClick = (e)=>{
        if (e.target.className.includes("active"))
          dispatch(displayFormReceived({buttonClass: "display_accordion", formClass: 'hide_elements', id: e.target.id}))
        else
          dispatch(displayFormReceived({buttonClass: "display_accordion active", formClass: 'display_elements', id: e.target.id}))   
    }
    
    let handleOnChange = (e)=>{
      setBuilding({...building,[e.target.name]: e.target.value})
    }

    let handleOnSubmit = (e,type) =>{
        e.preventDefault()
        const payload = buildingPatchSetter({id: buildingId, payload: {[type]: building[type]}})
        dispatch(patchFetchAction(payload))
            setBuilding({...building,[type]: ""})    
    }

  return(   
      <div className="center">
            <button  id="edit-building" onClick={handleOnClick} className={isDisplay.buttonClass}> Edit Building</button>
            <div className={isDisplay.id.includes("edit-building") ? `${isDisplay.formClass} form-wrapper`: 'hide_elements'}>
                <div className='standar-forms accordion'>
                    {errorsOrMsg.from.includes("update_building") && <ErrorsOrMsg {...(errorsOrMsg.errors ? { errors: errorsOrMsg.errors } :{msg: errorsOrMsg.msg })} />}
                    <div className="container d-flex justify-content-center align-items-center  accordion" > 
                        <form onSubmit={(e)=>handleOnSubmit(e,"address")} className='accordion' >
                            <label className='accordion'>{currentBuilding.address}</label>
                            <input onChange={handleOnChange}  value={building.address} className="standar-input accordion" type="text" name="address"/>
                            <button type='submit' className="standar-button accordion">Save address</button>
                        </form>
                    </div>
                    <div className="container d-flex justify-content-center align-items-center accordion"> 
                        <form onSubmit={e => handleOnSubmit(e,'phone_number')} className='accordion'>
                            <label className='accordion'>{currentBuilding.phone_number}</label>
                            <input onChange={handleOnChange} value={building.phone_number} className="standar-input accordion" type="phone" name="phone_number" />
                            <button type='submit' className="standar-button accordion">Save number</button>
                        </form> 
                    </div>
                    <div > 
                        <form onSubmit={ e=> handleOnSubmit(e,'super_name')} className='accordion'>
                            <label className='accordion'>{currentBuilding.super_name}</label>
                            <input onChange={handleOnChange}  value={building.super_name} className="standar-input accordion" type="text"  name="super_name"/>
                            <button type='submit' className="standar-button accordion">Save super name</button>
                        </form>
                    </div>
                    <div className="container d-flex justify-content-center align-items-center accordion"> 
                        <form onSubmit={ e=> handleOnSubmit(e,'bin')} className='accordion'>
                            <label className='accordion'>{currentBuilding.bin}</label>
                            <input onChange={handleOnChange}  value={building.bin} className="standar-input accordion" type="text"  name="bin"/>
                            <button type='submit' className="standar-button accordion">Save bin number</button>
                        </form>
                    </div>
             
                    <div className="container d-flex justify-content-center align-items-center accordion"> 
                        <form onSubmit={ e=> handleOnSubmit(e,'block')} className='accordion'>
                            <label className='accordion'>{currentBuilding.block}</label>
                            <input onChange={handleOnChange}  value={building.block} className="standar-input accordion" type="text"  name="block"/>
                            <button type='submit' className="standar-button accordion">Save tax block</button>
                        </form>
                    </div>
             
                    <div className="container d-flex justify-content-center align-items-center accordion"> 
                        <form onSubmit={ e=> handleOnSubmit(e,'lot')} className='accordion'>
                            <label className='accordion'>{currentBuilding.lot}</label>
                            <input onChange={handleOnChange}  value={building.lot} className="standar-input accordion" type="text"  name="lot"/>
                            <button type='submit' className="standar-button accordion">Save tax lot</button>
                        </form>
                    </div>
                    <br/>
                </div>
            </div>
        </div>  
  )
}

export default EditBuilding