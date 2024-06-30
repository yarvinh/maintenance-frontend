import { connect } from 'react-redux';
import {barButtonClass} from '../../componentsHelpers/accordion'

const NavBarButton = (props)=>{
    const {accordion} = props
    const buttonLines=()=>{
        if (accordion.barAccordion === 'display-nav-bar'){
            return(
                <>
                    <div id="display-nav-bar-1"className={`${barButtonClass("display-nav-bar",accordion)} lines`}></div>
                    <div id="display-nav-bar-2"className={`${barButtonClass("display-nav-bar",accordion)} lines`}></div>
                    <div id="display-nav-bar-3"className={`${barButtonClass("display-nav-bar",accordion)} lines`}></div>
                </>
            )
        } else{
            return <p className="x">X</p>
        }
    }

    return(
        <button id="display-nav-bar" className={`${barButtonClass("display-nav-bar",accordion)} nav-bar-button`}>  
          {buttonLines()}
        </button>
    )
}


const mapStateToProps = state => { 
    return {
        accordion: state.accordion.accordion,
    }
}
      

      
export default connect(mapStateToProps , null)(NavBarButton)