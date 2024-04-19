import {useNavigate} from 'react-router-dom';

const Documentation = (props)=>{
    const navigate = useNavigate()
    const goBack = (e) => {
        return navigate(-1)
     }
 
   return (
    <div>
        <div>
            {/* <p>Testing</p>  */}
        </div>
        
        <br></br>
            <button  onClick={goBack}  className="back-button"> {"<< Back"} </button>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
    </div>
   )
}

export default Documentation