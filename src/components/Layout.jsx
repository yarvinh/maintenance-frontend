import { Outlet } from "react-router"
import ErrorsOrMsg from "./ErrosOrMsg"
import NavBar from "./navbar/NavBar"
import NavButton from "./navbar/NavButton"
import Notification from "./workorders/Notifications"
import Footer from "./Footer"
import NavBackButton from "./NavBackButton"
import { useDispatch, useSelector } from "react-redux"
import { handleOnAccordion } from "../componentsHelpers/accordion"
import { displayFormReceived } from "../state/reducers/displayElementReducer"

const Layout = ({user}) => {
    const dispatch = useDispatch()
    const isDisplay = useSelector(state=> state.isDisplay)
    const displayForm = useSelector(state => state.isDisplay.formDisplay)
    const errorsOrMsg = useSelector(state => state.errorsOrMessages.errorsOrMessages)
    const handleOnclick = (e) => {
        const payload = handleOnAccordion(displayForm.id)
        if (displayForm.buttonClass.includes("active") && !e.target.className.includes("accordion"))
          dispatch(displayFormReceived(payload))
    }

    const handleOnImg=(e)=>{
        if (e.target.className.includes('profile-image-larger'))
           e.target.className = 'profile-image'
        else
           e.target.className = 'profile-image-larger' 
      }
  
    return (
        <div  className="App text-font body">
            <main onClick={handleOnclick} >
                <section className={`${!isDisplay.isDisplay && isDisplay.className} pc-profile-inf `}>
                    {user.profile_image  ? 
                    <img src={user.profile_image} onClick={handleOnImg} className={`profile-image  bar-accordion ${isDisplay.isDisplay && "hide-profile"}`} ></img> 
                    : user.is_login ? <img src="/blank-profile-picture-973460_1280.webp"  className={`profile-image  bar-accordion ${isDisplay.isDisplay && "hide-profile"}`} ></img> 
                    : <div className="bar-with-no-login bar-accordion" ></div>}
                    {user.is_login && <strong className={`user-name ${isDisplay.isDisplay && "hide-profile"}`}> {user.user.name}</strong>}
                    <NavButton/>
                </section>
                <NavBar isDisplay={isDisplay.isDisplay} loggedIn={user.is_login}/>
                {isDisplay.isDisplay && <div className="gost-bar"></div>}
                {errorsOrMsg.from === "from_server" && <ErrorsOrMsg errors={errorsOrMsg?.errors || errorsOrMsg?.msg} />}
                <section>
                    <div>
                        {user.is_login && <Notification/> }
                        {errorsOrMsg.from.includes("server") && <ErrorsOrMsg {...(errorsOrMsg.errors ? { errors: errorsOrMsg.errors } :{msg: errorsOrMsg.msg })} />}
                    </div>
                </section>
                <Outlet/>
                {(window.location.pathname !== "/") && <NavBackButton/>}
                <Footer/>
            </main>
        </div>
    )
}

export default Layout