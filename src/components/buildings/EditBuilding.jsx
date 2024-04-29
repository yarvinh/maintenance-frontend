import React, {useState,useEffect } from 'react';
import { connect } from 'react-redux';
// import {editBuilding} from '../../actions/buildingsActions'
import {useParams} from 'react-router-dom';
import {clearErrors} from '../../actions/errorsActions'
import {acordionButtonClass,diplayAcordion} from '../../componentsHelpers/acordion'
import { patchFetchAction } from '../../actions/fetchActions';
import '../../styles/styles.css'
import Errors from '../Errors';

const EditBuilding = (props) =>{
    const {currentBuilding,buildings,acordion,errorsOrMessages} = props
    let {id} = useParams()
    const [building, setBuilding] = useState({
        address: "",
        super_name: "",
        phone_number: "",
        bin: "",
        block: "",
        lot: "",
    })

    useEffect(() => {
        if (errorsOrMessages.errors.length > 0){
          props.clearErrors()
        }
    },[ ]);
    
    let handleOnChange = (e)=>{
      setBuilding({
       ...building,[e.target.name]: e.target.value
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
                ...building,[type]: ""
        })    
    }

  return(   
      <div className="center">
            <button  id="edit-building" className={acordionButtonClass("edit-building",acordion)}> Edit Building</button>
            <div className={diplayAcordion("edit-building",acordion)}>
                <div className='standar-forms acordion'>
                    <div className='acordion errors'> 
                    {errorsOrMessages.from === "edit_building" ?<Errors/> : null}
                        {/* {errorsOrMessages?.map((e,k) => {return <p key={k} className='acordion'>{e}</p>})} */}
                    </div> 
                    <div className="container d-flex justify-content-center align-items-center  acordion" > 
                        <form onSubmit={(e)=>handleOnSubmit(e,"address")} className='acordion' >
                            <label className='acordion'>{currentBuilding.address}</label>
                            <input onChange={handleOnChange}  value={building.address} className="standar-input acordion" type="text" name="address"/>
                            <button type='submit' className="standar-button acordion">Save address</button>
                        </form>
                    </div>
                    <div className="container d-flex justify-content-center align-items-center acordion"> 
                        <form onSubmit={e => handleOnSubmit(e,'phone_number')} className='acordion'>
                            <label className='acordion'>{currentBuilding.phone_number}</label>
                            <input onChange={handleOnChange} value={building.phone_number} className="standar-input acordion" type="phone" name="phone_number" />
                            <button type='submit' className="standar-button acordion">Save number</button>
                        </form> 
                    </div>
                    <div > 
                        <form onSubmit={ e=> handleOnSubmit(e,'super_name')} className='acordion'>
                            <label className='acordion'>{currentBuilding.super_name}</label>
                            <input onChange={handleOnChange}  value={building.super_name} className="standar-input acordion" type="text"  name="super_name"/>
                            <button type='submit' className="standar-button acordion">Save super name</button>
                        </form>
                    </div>
                    <div className="container d-flex justify-content-center align-items-center acordion"> 
                        <form onSubmit={ e=> handleOnSubmit(e,'bin')} className='acordion'>
                            <label className='acordion'>{currentBuilding.bin}</label>
                            <input onChange={handleOnChange}  value={building.bin} className="standar-input acordion" type="text"  name="bin"/>
                            <button type='submit' className="standar-button acordion">Save bin number</button>
                        </form>
                    </div>
             
                    <div className="container d-flex justify-content-center align-items-center acordion"> 
                        <form onSubmit={ e=> handleOnSubmit(e,'block')} className='acordion'>
                            <label className='acordion'>{currentBuilding.block}</label>
                            <input onChange={handleOnChange}  value={building.block} className="standar-input acordion" type="text"  name="block"/>
                            <button type='submit' className="standar-button acordion">Save tax block</button>
                        </form>
                    </div>
             
                    <div className="container d-flex justify-content-center align-items-center acordion"> 
                        <form onSubmit={ e=> handleOnSubmit(e,'lot')} className='acordion'>
                            <label className='acordion'>{currentBuilding.lot}</label>
                            <input onChange={handleOnChange}  value={building.lot} className="standar-input acordion" type="text"  name="lot"/>
                            <button type='submit' className="standar-button acordion">Save tax lot</button>
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
        acordion: state.acordion.acordion,
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