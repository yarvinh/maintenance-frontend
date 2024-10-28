import {useState} from 'react';
import {useParams} from 'react-router-dom';
import '../../styles/styles.css'
import { useDispatch } from 'react-redux';
import { patchFetchAction } from '../../actions/fetchActions';
import { unitReceived } from '../../state/reducers/unitReducer';
import { unitsReceived } from '../../state/reducers/unitsReducer';

const EditUnit = ({unit}) =>{
    const {unitId, buildingId} = useParams()
    const dispatch = useDispatch()
    const [editValue,setEditValue] = useState('')

    let handleOnChange = (e)=>{
        setEditValue(e.target.value)
    }



    let handleOnSubmit = (e) =>{
        e.preventDefault()
        const payload = {
            payload: {unit: {unit: editValue}},
            path: `/buildings/${buildingId}/units/${unitId}`,
            itemReducer: unitReceived, 
            itemsReducer: unitsReceived
        }
        dispatch(patchFetchAction(payload))
    }

    return(   
        <>
            <form onSubmit={handleOnSubmit}>
                <input onChange={handleOnChange} maxLength="8" placeholder={unit.unit} name="unit"  type="text" value={editValue.unit}/>
                <button type='submit' >Save</button>
            </form>    
        </>

   )
}

export default EditUnit