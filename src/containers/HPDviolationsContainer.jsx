import {ViolationsFetch} from "../actions/violationsActions"
import React, {useEffect } from 'react';
import { connect } from 'react-redux';
import HPDviolation from '../components/buildings/HPDviolation'
import {useParams} from 'react-router-dom';

const HPDviolationsContainer = (props)=>{
    const {lot,block} = useParams()
    let {violations} = props
    
    useEffect(() => {
        props.ViolationsFetch(`https://data.cityofnewyork.us/resource/csn4-vhvf.json?$where=lot%20=%20${lot}%20and%20block%20=%20${block}`)
    } ,[]); 

    return (
       
        <div>    
            {violations.map((violation)=>{return <HPDviolation key={Math.random()} violation={violation}/> })} 
        </div>
        )
};

const mapStateToProps = state => { 

    return {
        violations: state.violations.violations,
        loading: state.violations.loading
    }

}


const mapDispatchToProps = dispatch => {
    return {
        ViolationsFetch: (action) => dispatch(ViolationsFetch(action)), 
    }
}

  export default connect(mapStateToProps, mapDispatchToProps)(HPDviolationsContainer)