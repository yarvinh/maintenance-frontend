import {useState} from 'react';
import { connect } from 'react-redux';
import {editUnit} from '../../actions/unitsActions'
import {useParams} from 'react-router-dom';
import {clearErrors} from '../../actions/errorsActions'
import {acordionButtonClass,diplayAcordion} from '../../componentsHelpers/acordion'
import Errors from '../Errors';
import '../../styles/styles.css'

const EditUnit = (props) =>{
    const {errorsOrMessages,acordion} = props
    let {unit_id,building_id} = useParams()
    
    const [unit,setUnit] = useState({
        unit: ""
    })
    
    let handleOnChange = (e)=>{
        setUnit({
          unit: e.target.value
        })
    }

    let handleOnSubmit = (e) =>{
        e.preventDefault()
      props.editUnit({unit: unit, building_id: building_id, unit_id: unit_id})
    }

    return(   
      <div className='center '>
            <button id='edit-unit' className={acordionButtonClass("edit-unit",acordion)}> Edit Unit</button>
            <div className={diplayAcordion("edit-unit",acordion)}>
                <div className="standar-forms acordion">
                    <form onSubmit={handleOnSubmit} className='acordion'>
                        <div className='acordion'> 
                        {(errorsOrMessages.from === "update_unit") && <Errors errorsOrMessages={errorsOrMessages}/>}
                        </div>  
                        <input onChange={handleOnChange} maxLength="8" placeholder="Edit Unit" name="unit" className="standar-input acordion" type="text" value={unit.unit}/>
                        <button type='submit' className="standar-button acordion">Save</button>
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
        editUnit: (action) => dispatch(editUnit(action)),
        clearErrors: () => dispatch(clearErrors()),
    }
}   
      
export default connect(mapStateToProps, mapDispatchToProps)(EditUnit)