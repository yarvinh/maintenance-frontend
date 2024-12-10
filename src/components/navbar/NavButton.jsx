import { useDispatch, useSelector } from "react-redux"
import { displayElement } from "../../actions/displayElementActions"

const NavButton = ()=>{
    const dispatch = useDispatch()
    const isDisplay = useSelector(state => state.isDisplay)
    const handleOnclick = (e)=>{
        !isDisplay.isDisplay ? dispatch(displayElement('nav-button-active')) : dispatch(displayElement('profile-inf'))
    }
    
    if(isDisplay.isDisplay )
        return (
            <div onClick={handleOnclick} className="nav-button-active">
                <img src="/close.svg" id="nav-bar-x" alt="X close icon"/>
            </div>
        )
    else
        return(
            <div onClick={handleOnclick} className="nav-button">
                <div className="nav-button-line"></div>
                <div className="nav-button-line"></div>
                <div className="nav-button-line"></div> 
            </div>
        )
}

export default NavButton