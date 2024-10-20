import {violationsFetch} from "../actions/violationsActions"
import {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HPDviolation from '../components/violations/HPDviolation'
import {useParams} from 'react-router-dom';

const HPDviolationsContainer = ()=>{
    const {lot,block} = useParams()
    const violations = useSelector(state => state.violations.violations)
    const loading = useSelector(state => state.violations.violationsLoading)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(violationsFetch(`https://data.cityofnewyork.us/resource/csn4-vhvf.json?$where=lot%20=%20${lot}%20and%20block%20=%20${block}`))
    } ,[]); 

    return (
       
        <div>    
            {violations.map((violation)=>{return <HPDviolation key={Math.random()} violation={violation}/> })} 
        </div>
        )
};

export default HPDviolationsContainer