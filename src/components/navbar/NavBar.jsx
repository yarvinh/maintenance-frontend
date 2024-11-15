
import "../../styles/nav-bar.css"
import { useDispatch, useSelector } from "react-redux"
import { displayElement } from "../../actions/displayElementActions"
import NoLoginBar from "./NoLoginBar"
import LoginBar from "./LoginBar"

const NavBar=({isDisplay})=>{
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const handleOnClick = (e)=>{
        if (!e.target.className.includes("display") && isDisplay)
          dispatch(displayElement('profile-inf'))
    }

    return (
        <section onClick={handleOnClick} className={`${isDisplay ? "nav-bar-container close" : "hide-navbar"} `}>
            <nav className="display nav-bar">
                <ul className="display nav-bar-ul"> 
                   {!user?.is_login ? <NoLoginBar/> : <LoginBar/> }
                </ul>    
            </nav>
        </section>
    )
}


export default NavBar