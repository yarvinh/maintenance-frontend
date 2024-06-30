import {useState} from 'react';
import { connect } from 'react-redux';
import {useParams} from 'react-router-dom';
import {clearErrors} from '../../actions/errorsActions'
import {accordionButtonClass,diplayAccordion} from '../../componentsHelpers/accordion'
import { patchFetchAction } from '../../actions/fetchActions';
import '../../styles/styles.css'
import Errors from '../Errors';

const EditBuilding = (props) =>{
    const {currentBuilding,buildings,accordion,errorsOrMessages} = props
    let {id} = useParams()
    const [building, setBuilding] = useState({
        address: "",
        super_name: "",
        phone_number: "",
        bin: "",
        block: "",
        lot: "",
    })
    
    let handleOnChange = (e)=>{
      setBuilding({
       ...building,
       [e.target.name]: e.target.value
      })
    }

    let handleOnSubmit = (e,type) =>{
        e.preventDefault()
        props.patchFetchAction({
            id: id,
            path: `/buildings/${id}`,
            stateName:{itemName: "building", arrayName: "buildings"} ,
            type: {addItemToArray: "ADD_BUILDINGS", addItem: "ADD_BUILDING"}, 
            params: {payload: {[type]: building[type]}, array: buildings}
          })
            setBuilding({
                ...building,
                [type]: ""
        })    
    }

  return(   
      <div className="center">
            <button  id="edit-building" className={accordionButtonClass("edit-building",accordion)}> Edit Building</button>
            <div className={diplayAccordion("edit-building",accordion)}>
                <div className='standar-forms accordion'>
                    <div className='accordion errors'> 
                    {(errorsOrMessages.from === "update_building") && <Errors errorsOrMessages={errorsOrMessages}/>}
                    </div> 
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


const mapStateToProps = state => { 
    return {
        buildings: state.buildings.buildings,
        accordion: state.accordion.accordion,
        errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        patchFetchAction: (action) => dispatch(patchFetchAction(action)),
        clearErrors: () => dispatch(clearErrors()),
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(EditBuilding)