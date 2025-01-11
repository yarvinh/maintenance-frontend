import {violationsFetch} from "../actions/violationsActions"
import {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DOBviolation from '../components/violations/DOBviolation'
import {useParams} from 'react-router-dom';

const DOBviolationsContainer = ()=>{
    const dispatch = useDispatch()
    const allViolations = useSelector(state => state.violations.violations)
    const {bin} = useParams()
    const [violations, setViolations] = useState([])
    useEffect(() => {
      dispatch(violationsFetch(`https://data.cityofnewyork.us/resource/3h2n-5cm9.json?bin=${bin}`))
    } ,[dispatch, bin]); 

    const handleOnChange = (e) => {
        const searchResult = allViolations.filter((violation)=>{
            return (
                violation.violation_type?.toLowerCase().includes(e.target.value) ||
                violation.issue_date.includes(e.target.value) ||
                violation.violation_number?.includes(e.target.value) ||
                violation.violation_type?.toLowerCase().includes(e.target.value) ||
                violation.violation_category?.toLowerCase().includes(e.target.value)   
            )   
        })
        setViolations(searchResult)
    }
    useEffect(()=>{
        if (allViolations.length >  0)
          setViolations(allViolations)
    },[allViolations])

    return (
            <div>    
            <div className="center violation-search">    
               {<input onChange={handleOnChange} className='search_box' placeholder='Search violations ' />}
            </div>
            {violations.map((violation)=>{return <DOBviolation key={Math.random()} violation={violation}/> })} 
        </div>
    )
};


export default DOBviolationsContainer