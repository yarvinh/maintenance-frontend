import { connect } from 'react-redux';
import {useState} from 'react';
import {useParams} from 'react-router-dom';
import '../../styles/styles.css'
import { createUnit} from '../../actions/unitsActions'

const CreateUnit = (props)=>{
    const {id} = useParams()
    const [unit,setUnit] = useState({
        unit: "",
        building_id: id
    })

    const handleOnChange = (e)=>{
        setUnit({
            ...unit,
            unit: e.target.value
        })
    }

    const handleOnSubmit=(e)=>{
        e.preventDefault()
        props.createUnit(unit)
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

const mapDispatchToProps = dispatch => {
    return {
      createUnit: (action) => dispatch(createUnit(action))
    }
  }

  export default connect(null, mapDispatchToProps)(CreateUnit)