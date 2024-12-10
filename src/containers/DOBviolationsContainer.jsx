import {violationsFetch} from "../actions/violationsActions"
import {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DOBviolation from '../components/violations/DOBviolation'
import {useParams} from 'react-router-dom';

const DOBviolationsContainer = ()=>{
    const dispatch = useDispatch()
    const violations = useSelector(state => state.violations.violations)
    const {bin} = useParams()
    
    useEffect(() => {
      dispatch(violationsFetch(`https://data.cityofnewyork.us/resource/3h2n-5cm9.json?bin=${bin}`))
    } ,[]); 

    return (
        <div>    
            {violations.map((violation)=>{return <DOBviolation key={Math.random()} violation={violation}/> })} 
        </div>
    )
};


export default DOBviolationsContainer