import  {useState,useEffect } from 'react';
import { connect } from 'react-redux';
import '../../styles/styles.css'
import {clearErrors} from '../../actions/errorsActions'
import {acordionButtonClass,diplayAcordion} from '../../componentsHelpers/acordion'
import { postFetchAction } from '../../actions/fetchActions';
import { paths } from '../../actions/actionsHelper';
import Errors from '../Errors';

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
    }

  return(  
    <div className="center">
    <button id="create-building" className={acordionButtonClass("create-building",acordion)}> Create A Building</button>
    <div className={diplayAcordion("create-building",acordion)}>
    <div className="standar-forms standar-form-position acordion">
      <div className="container d-flex justify-content-center align-items-center acordion" > 
          <form onSubmit={handleOnSubmit} className='acordion'>
              <div className='acordion'> 
              {(errorsOrMessages.from === "create_building") && <Errors errorsOrMessages={errorsOrMessages}/>}
              </div>  
              <label htmlFor='c-b-address' className='acordion'>Address</label>
              <input id='c-b-address' onChange={handleOnChange}  name="address" className="standar-input acordion" type="text" value={building.address}/><br/>
              <label htmlFor='c-b-superintendent' className='acordion'>Superintendent</label>
              <input id='c-b-superintendent' onChange={handleOnChange} name="super_name" className="standar-input acordion" type="text" value={building.super_name}/><br/>
              <label htmlFor='c-b-phone' className='acordion'>Phone</label>
              <input id='c-b-phone' onChange={handleOnChange}  name="phone_number" className="standar-input acordion" type="phone" value={building.phone_number}/><br/>
              <label htmlFor='cb-bin-number' className='acordion'>Bin Number</label>
              <input id='c-b-bin-number' onChange={handleOnChange}  name="bin" className="standar-input acordion" type="text" value={building.bin}/><br/>
              <label htmlFor='cb-tax-lot' className='acordion'>Tax lot</label>
              <input id='c-b-tax-lot' onChange={handleOnChange}  name="lot" className="standar-input acordion" type="text" value={building.lot}/><br/>
              <label htmlFor='cb-tax-block' className='acordion'>Tax block</label>
              <input id='c-b-tax-block' onChange={handleOnChange}  name="block" className="standar-input acordion" type="text" value={building.block}/><br/>
              <button type='submit' className="white-blue-buttons acordion">Submit</button>
          </form> 
        </div>    
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
        loading: state.buildings.loading
    }
}
      
const mapDispatchToProps = dispatch => {
    return {
        postFetchAction: (action) => dispatch(postFetchAction(action)),
        clearErrors: () => dispatch(clearErrors()),
    }
}   
      
export default connect(mapStateToProps , mapDispatchToProps)(CreateBuilding)

