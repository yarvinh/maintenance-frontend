import {violationsFetch} from "../actions/violationsActions"
import {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HPDviolation from '../components/violations/HPDviolation'
import {useParams} from 'react-router-dom';
import ToolTip from "../components/ToolTip";

const HPDviolationsContainer = ()=>{

    const {lot,block} = useParams()
    const allViolations = useSelector(state => state.violations.violations)
    const dispatch = useDispatch()
    const [violations, setViolations] = useState([])

    const handleOnChange = (e) => {
        const searchResult = allViolations.filter((violation)=>{
            return (
                violation.apartment?.toLowerCase().includes(e.target.value) ||
                violation.inspectiondate?.includes(e.target.value) ||
                violation.currentstatus?.toLowerCase().includes(e.target.value) ||
                violation.violationid?.includes(e.target.value) ||
                violation.novdescription?.toLowerCase().includes(e.target.value)
            )   
        })
        setViolations(searchResult)
    }
    useEffect(() => {
        dispatch(violationsFetch(`https://data.cityofnewyork.us/resource/csn4-vhvf.json?$where=lot=${lot} AND block = ${block}`))
    } ,[dispatch, lot, block]); 

    useEffect(()=>{
        if (allViolations.length >  0)
          setViolations(allViolations)
    },[ allViolations])

    return (
        <div>
            <div className="center violation-search">    
              {<input onChange={handleOnChange} className='search_box' placeholder='Search violations ' />}
                <ToolTip>
                    <p> Search by inspection date, current status, violation id, description and by apartment.</p> 
                </ToolTip>
            </div>    
            {violations.map((violation)=>{return <HPDviolation key={Math.random()} violation={violation}/> })} 
        </div>
        )
};

export default HPDviolationsContainer