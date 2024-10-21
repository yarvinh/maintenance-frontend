import {useState} from 'react';
import {useParams} from 'react-router-dom';
import {accordionButtonClass,diplayAccordion} from '../../componentsHelpers/accordion'
import Errors from '../Errors';
import '../../styles/styles.css'

const EditUnit = (props) =>{
    const {errorsOrMessages,accordion} = props
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
    //   props.editUnit({unit: unit, building_id: building_id, unit_id: unit_id})
    }

    return(   
      <div className='center '>
            <button id='edit-unit' className={accordionButtonClass("edit-unit",accordion)}> Edit Unit</button>
            <div className={diplayAccordion("edit-unit",accordion)}>
                <div className="standar-forms accordion">
                    <form onSubmit={handleOnSubmit} className='accordion'>
                        <div className='accordion'> 
                        {(errorsOrMessages.from === "update_unit") && <Errors errorsOrMessages={errorsOrMessages}/>}
                        </div>  
                        <input onChange={handleOnChange} maxLength="8" placeholder="Edit Unit" name="unit" className="standar-input accordion" type="text" value={unit.unit}/>
                        <button type='submit' className="standar-button accordion">Save</button>
                    </form>    
                    <br/>
                </div>
            </div>
           
        </div>   
   )
}

  
export default EditUnit