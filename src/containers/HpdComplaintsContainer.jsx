import {violationsFetch} from "../actions/violationsActions"
import {useEffect ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom';
import HpdComplaint from "../components/violations/HpdComplaint";
import LoadingItems from "../components/LoadingItems";

const HpdComplaintsContainer = ()=>{
    const {bin} = useParams()
    const dispatch = useDispatch()
    const [violations, setViolations] = useState([])
    const allViolations = useSelector(state => state.violations.violations)
    const loading = useSelector(state => state.violations.violationsLoading)
    useEffect(() => {
        dispatch(violationsFetch(`https://data.cityofnewyork.us/resource/ygpa-z7cr.json?bin=${bin}`))
    } ,[]); 

    const handleOnChange = (e) => {
        const searchResult = allViolations.filter((violation)=>{
            return (
                violation.apartment?.toLowerCase().includes(e.target.value) ||
                violation.received_date.includes(e.target.value) ||
                violation.minor_category?.toLowerCase().includes(e.target.value) ||
                violation.major_category?.toLowerCase().includes(e.target.value)
            )   
        })
        setViolations(searchResult)
    }

    useEffect(()=>{
        if (allViolations.length >  0)
          setViolations(allViolations)
    },[ allViolations])

    const handleOnClick = (e)=>{
        if(e.target.value !== "All")
            setViolations(
                allViolations.filter((v)=>{
                    return v.problem_status === e.target.value
                })
            )
        else
         setViolations(allViolations)
    }

    return (
        <section>  
            <div className="center violation-search">    
              {<input onChange={handleOnChange} className='search_box' placeholder='Search violations ' />}
            </div>
            {loading && <LoadingItems/> }
            <select onChange={handleOnClick} className='form-select my-3 mx-auto' > 
                <option value='All'>All</option>          
                <option value='OPEN'>Open</option>
                <option value='CLOSE'>Close</option>
            </select> 
            {violations?.map((violation)=>{return <HpdComplaint key={Math.random()} violation={violation}/> })} 
        </section>
        )
};

export default HpdComplaintsContainer