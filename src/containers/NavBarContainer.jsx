
import { useSelector } from "react-redux"
import { isLoginToken } from '../componentsHelpers/token'
import {displayBarAccordion} from '../componentsHelpers/accordion'
import NoLoginBar from '../components/navbar/NoLoginBar'
import LoginBar from '../components/navbar/LoginBar'
import NavBarButton from "../components/navbar/NavBarButton"

const NavBarContainer = () => {
  // const workOrders = useSelector(state => state.workOrders.workOrders)
  const user = useSelector(state => state.user.user)
  const accordion = useSelector(state => state.accordion.accordion)
    const {admin} = user
    const navManu=()=>{
      return(              
      <div id="nav-links"  className={`${displayBarAccordion("display-nav-bar",accordion)} bar-accordion`}>
      <div className="var-menu bar-accordion" id="p">
        <ul className="bar-menu-list bar-accordion">
          {user.is_login && isLoginToken() || user.is_login?<LoginBar/>:null}
          {!isLoginToken() || user.verification_session?<NoLoginBar/>:null }
          <div className=''>
            <div className='bar-lines-width'></div>
            <div className='bar-lines-width'></div>
            <div className='bar-lines-width'></div>
          </div>
        </ul>
      </div>
    </div>)
    }
   
    return(
      <header>
        <nav className="nav-bar">
              <div className='acordion-bar'>
                <div className='profile-container  bar-accordion'>
                   <NavBarButton/>

                   {user.profile_image? <img src={user.profile_image} className="profile-image  bar-accordion" ></img> : user.is_login ? <img src="/blank-profile-picture-973460_1280.webp"  className="profile-image  bar-accordion" ></img> : <div className="bar-with-no-login bar-accordion" ></div>}
                   {user.is_login && user.profile_image? <p className="profile_name  bar-accordion">{admin ? user.user.name: user.user.name} </p>:null}
                   {user.is_login && !user.profile_image? <p className='profile_name  bar-accordion'>{admin ? user.user.name : user.user.name} </p>:null}
                   { navManu()}
                </div>
              </div>
        </nav>
      </header>
    )
}

export default NavBarContainer