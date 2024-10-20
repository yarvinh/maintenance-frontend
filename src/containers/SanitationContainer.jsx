import {violationsFetch} from "../actions/violationsActions"
import React, {useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Sanitation from '../components/violations/HPDviolation'
import {useParams} from 'react-router-dom';

const SanitationContainer = (props)=>{
    const dispatch = useDispatch()
    const {lot,block} = useParams()
    let {violations} = props
    
    useEffect(() => {
        // <props className="violationsFetch"></props>(`https://data.cityofnewyork.us/resource/csn4-vhvf.json?$where=lot%20=%20${lot}%20and%20block%20=%20${block}`)
    } ,[]); 

    return (
       
        <div>    
            {violations.map((violation)=>{return <Sanitation key={Math.random()} violation={violation}/> })} 
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
        violationsFetch: (action) => dispatch(violationsFetch(action)), 
    }
}

  export default connect(mapStateToProps, mapDispatchToProps)(SanitationContainer)