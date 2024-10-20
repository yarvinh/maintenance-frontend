import {useDispatch } from 'react-redux';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import '../../styles/styles.css'
import {} from '../../actions/unitsActions'
import { postFetchAction } from '../../actions/fetchActions';
import { createUnitSetter } from '../../componentsHelpers/fetchingFunctions';

const CreateUnit = ()=>{
    const dispatch = useDispatch()
    const {buildingId} = useParams()
    const [unit,setUnit] = useState({
        unit: "",
        building_id: buildingId
    })

    const handleOnChange = (e)=>{
        setUnit({
            ...unit,
            unit: e.target.value
        })
    }

    const handleOnSubmit=(e)=>{
        e.preventDefault()
        const payload = createUnitSetter({payload: {unit: unit}, buildingId: buildingId})
        dispatch(postFetchAction(payload))
        setUnit({
            ...unit,
            unit: ""
        })
    }

  return(
    <form className="unit-form" onSubmit={handleOnSubmit}>
      <input onChange={handleOnChange} maxLength="8" name="address" className="add-unit" placeholder="Add an unit" type="text" value={unit.unit} />
      <button type='submit' hidden/>
    </form>  
  )
}

export default CreateUnit