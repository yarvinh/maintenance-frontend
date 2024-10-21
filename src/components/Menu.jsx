import ErrorsOrMsg from "./ErrosOrMsg"
import NavBar from "./navbar/NavBar"
import NavButton from "./navbar/NavButton"
import Notification from "./workorders/Notifications"

const Menu = ({user, isDisplay, errorsOrMsg}) => {
    return (
        <>
            <section className={`${!isDisplay.isDisplay && isDisplay.className} pc-profile-inf `}>
                {user.profile_image  ? 
                <img src={user.profile_image} className={`profile-image  bar-accordion ${isDisplay.isDisplay && "hide-profile"}`} ></img> 
                : user.is_login ? <img src="/blank-profile-picture-973460_1280.webp"  className={`profile-image  bar-accordion ${isDisplay.isDisplay && "hide-profile"}`} ></img> 
                : <div className="bar-with-no-login bar-accordion" ></div>}
                {user.is_login && <strong className={`user-name ${isDisplay.isDisplay && "hide-profile"}`}> {user.user.name}</strong>}
                <NavButton/>
            </section>
            <NavBar isDisplay={isDisplay.isDisplay} loggedIn={user.is_login}/>
            {errorsOrMsg.from === "from_server" && <ErrorsOrMsg errors={errorsOrMsg?.errors || errorsOrMsg?.msg} />}
            <section>
                <div>
                    {user.is_login && <Notification/> }
                    {errorsOrMsg.from.includes("server") && <ErrorsOrMsg {...(errorsOrMsg.errors ? { errors: errorsOrMsg.errors } :{msg: errorsOrMsg.msg })} />}
                </div>
            </section>
        </>
    )
}

export default Menu