import {sanitationViolations} from "../actions/violationsActions"
import {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sanitation from '../components/violations/Sanitation'
import {useParams} from 'react-router-dom';

const SanitationContainer = ()=>{
    const dispatch = useDispatch()
    const violations = useSelector(state => state.violations.violations)
    let {lot,block} = useParams()
    if(lot.length < 2)
      lot = `000${lot}`
    else if(lot.length < 3)
      lot = `00${lot}`
    else if(lot.length < 4)
      lot = `0${lot}`

    if(block.length < 2)
      block = `0000${block}`
    else if(block.length < 3)
      block = `000${block}`
    else if(block.length < 4)
      block = `00${block}`
    else if (block.length < 5)
       block = `0${block}`
       
    const localViolations =  violations.filter(vioArr => {
        return vioArr.violation_location_lot_no === lot
    })

    useEffect(() => {
        dispatch(sanitationViolations(block))
    } ,[]); 

    return (
       
        <div>    
            {localViolations.map((violation)=>{return <Sanitation key={Math.random()} violation={violation}/> })} 
        </div>
        )
};


export default SanitationContainer