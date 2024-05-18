import {ViolationsFetch} from "../actions/violationsActions"
import {useEffect ,useState} from 'react';
import { connect } from 'react-redux';
import {useParams} from 'react-router-dom';
import HpdComplaint from "../components/violations/HpdComplaint";

const HpdComplaintsContainer = (props)=>{
    const {bin} = useParams()

    const [violations, setViolations] = useState([])

    useEffect(() => {
        props.ViolationsFetch(`https://data.cityofnewyork.us/resource/ygpa-z7cr.json?bin=${bin}`)
    } ,[]); 

    useEffect(()=>{
        if (props.violations?.length >  0)
          setViolations(props.violations)
    },[props.violations.length])

    const handleOnClick = (e)=>{
        if(e.target.value !== "All")
            setViolations(
                props.violations.filter((v)=>{
                    return v.problem_status === e.target.value
                })
            )
        else
         setViolations(props.violations)
    }

    return (
        <section>   
            <select onChange={handleOnClick} className='form-select my-3 mx-auto' > 
                <option value='All'>All</option>          
                <option value='OPEN'>Open</option>
                <option value='CLOSE'>Close</option>
            </select> 
            {violations.map((violation)=>{return <HpdComplaint key={Math.random()} violation={violation}/> })} 
        </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(HpdComplaintsContainer)