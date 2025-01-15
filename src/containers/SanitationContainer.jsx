import {sanitationViolations} from "../actions/violationsActions"
import {useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Sanitation from '../components/violations/Sanitation'
import {useParams} from 'react-router-dom';
import ToolTip from "../components/ToolTip";

const SanitationContainer = ()=>{
    const dispatch = useDispatch()
    const [violations, setViolations] = useState([])
    const allViolations = useSelector(state => state.violations.violations)

    let {lot,block} = useParams()
    
    useEffect(() => {
      dispatch(sanitationViolations({block: block, lot: lot}))
    } ,[dispatch, block, lot]); 

    const handleOnChange = (e) => {
      const searchResult = allViolations.filter((violation)=>{
            return (
               violation.violation_date.includes(e.target.value) ||
               violation.charge_1_code_description?.toLowerCase().includes(e.target.value) ||
               violation.ticket_number?.includes(e.target.value)
            )   
      })
      setViolations(searchResult)
    }

    useEffect(() => {
      allViolations.length > 0 && setViolations(allViolations)
    } ,[allViolations]);
   
    const handleOnClick = (e)=>{
      if(e.target.value !== "All")
        setViolations(
          allViolations.filter((v)=>{
            return v.compliance_status && v.compliance_status !== e.target.value 
          })
        )
      else
        setViolations(allViolations)
    }

    return ( 
      <div>  
        <div className="center violation-search">    
          {<input onChange={handleOnChange} className='search_box' placeholder='Search violations ' />}
          <ToolTip>
              <p>Search by violation date, current status, ticket number, Violation Description.</p> 
          </ToolTip>
        </div>
        <select onChange={handleOnClick} className='form-select my-3 mx-auto' > 
          <option value='All'>All</option>          
          <option value="All Terms Met">Active</option>
        </select> 
        {violations.map((violation)=>{return <Sanitation key={Math.random()} violation={violation}/> })} 
      </div>
    )
};

export default SanitationContainer