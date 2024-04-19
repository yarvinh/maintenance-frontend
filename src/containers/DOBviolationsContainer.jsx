import {ViolationsFetch} from "../actions/violationsActions"
import React, {useEffect } from 'react';
import { connect } from 'react-redux';
import DOBviolation from '../components/buildings/DOBviolation'
import {useParams} from 'react-router-dom';
const DOBviolationsContainer = (props)=>{
    const {bin} = useParams()
    let {violations} = props
    
    useEffect(() => {
      props.ViolationsFetch(`https://data.cityofnewyork.us/resource/3h2n-5cm9.json?bin=${bin}`)
    } ,[]); 

    return (
       
        <div>    
            {violations.map((violation)=>{return <DOBviolation key={Math.random()} violation={violation}/> })} 
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

  export default connect(mapStateToProps, mapDispatchToProps)(DOBviolationsContainer)