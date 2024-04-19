import React, {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {useParams,useNavigate} from 'react-router-dom';
import {getUnits} from "../actions/unitsActions"
import CreateUnit from "../components/units/CreateUnit"
import Unit from "../components/units/Unit"

const UnitsContainer = (props) => {
    const {building,units} = props
    const {id} = useParams()
    useEffect(() => {
        props.getUnits(id)
    },[]);

    const displayUnits = ()=>{
      return units.map((unit)=>{
        return (
            <div  key={unit.id}>
                <Unit unit={unit}/>
            </div>
        )     
      })
    }

    return (
        <div>
            <div className='unit-creater'>
              <CreateUnit building={building}/> 
            </div>
            <div className='units-container'>
              {displayUnits()} 
            </div>  
        </div>
    )

    
}


const mapStateToProps = state => { 
    return {
       units: state.units.units,
       loading: state.units.loading
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        getUnits: (action) => dispatch(getUnits(action)),
    }
  }


  export default connect(mapStateToProps, mapDispatchToProps)(UnitsContainer)