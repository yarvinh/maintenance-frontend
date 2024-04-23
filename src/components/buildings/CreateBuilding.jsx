import React, {useState,useEffect } from 'react';
import { connect } from 'react-redux';
import '../../styles/styles.css'
// import { createBuilding} from '../../actions/buildingsActions'
import {clearErrors} from '../../actions/errorsActions'
import {acordionButtonClass,diplayAcordion} from '../../componentsHelpers/acordion'
import { postFetchAction } from '../../actions/fetchActions';
import { paths } from '../../actions/actionsHelper';

const CreateBuilding = (props) =>{
    const {errorsOrMessages ,acordion,buildings} = props
    const [building, setBuilding] = useState({
        address: "",
        super_name: "",
        phone_number: "",
        bin: "",
        lot: "",
        block: "",
    })
    
    useEffect(() => {
      if (errorsOrMessages.length > 0){
        props.clearErrors()
      }
    },[ ]);
    
    let handleOnChange = (e)=>{
      setBuilding({
       ...building,[e.target.name]: e.target.value
      })
    }

    let handleOnSubmit = (e) =>{
        e.preventDefault()
        props.postFetchAction({
          path: paths().buildingsPath,
          stateName:{itemName: "building", arrayName: "buildings"} ,
          type: { addItemToArray: "ADD_BUILDINGS", addItem: "ADD_BUILDING"}, 
          params: {payload: {building: building}, array: buildings}
        })
        setBuilding({
          address: "",
          super_name: "",
          phone_number: "",
          bin: "",
          lot: "",
          block: "",
        })

        if (errorsOrMessages.length > 0){
          props.clearErrors()
        }
    }

  return(  
    <div className="center">
    <button id="create-building" className={acordionButtonClass("create-building",acordion)}> Create A Building</button>
    <div className={diplayAcordion("create-building",acordion)}>
    <div className="standar-forms standar-form-position acordion">
      <div className="container d-flex justify-content-center align-items-center acordion" > 
          <form onSubmit={handleOnSubmit} className='acordion'>
              <div className='acordion'> 
                {errorsOrMessages.map((e,k) => {return <p className='errors acordion' key={k} >{e}</p>})}
              </div>  
              <label className='acordion'>Address</label>
              <input onChange={handleOnChange}  name="address" className="standar-input acordion" type="text" value={building.address}/><br/>
              <label className='acordion'>Superintendent</label>
              <input onChange={handleOnChange} name="super_name" className="standar-input acordion" type="text" value={building.super_name}/><br/>
              <label className='acordion'>Phone</label>
              <input onChange={handleOnChange}  name="phone_number" className="standar-input acordion" type="phone" value={building.phone_number}/><br/>
              <label className='acordion'>Bin Number</label>
              <input onChange={handleOnChange}  name="bin" className="standar-input acordion" type="text" value={building.bin}/><br/>
              <label className='acordion'>Tax lot</label>
              <input onChange={handleOnChange}  name="lot" className="standar-input acordion" type="text" value={building.lot}/><br/>
              <label className='acordion'>Tax block</label>
              <input onChange={handleOnChange}  name="block" className="standar-input acordion" type="text" value={building.block}/><br/>
              <button type='submit' className="btn btn-primary acordion">Submit</button>
          </form> 
        </div>    
    </div>
    <br/>
    </div>
</div>
  )
}

const mapStateToProps = state => { 
    return {
        buildings: state.buildings.buildings,
        acordion: state.acordion.acordion,
        errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
        loading: state.buildings.loading
    }
}
      
const mapDispatchToProps = dispatch => {
    return {
        postFetchAction: (action) => dispatch(postFetchAction(action)),
        // createBuilding: (action) => dispatch(createBuilding(action)),
        clearErrors: () => dispatch(clearErrors()),
    }
}   
      
export default connect(mapStateToProps , mapDispatchToProps)(CreateBuilding)

