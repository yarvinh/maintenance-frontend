import {useNavigate} from 'react-router-dom';
// import "./angle-double-left.svg"

const NavBackButton = ()=>{
    const navigate  = useNavigate()
    const goBack = (e) => {
        return navigate(-1)
    }

    return(
        <button  className="white-blue-buttons" onClick={goBack}>
           {"<< Back"}
        </button>
    )
}


export default NavBackButton