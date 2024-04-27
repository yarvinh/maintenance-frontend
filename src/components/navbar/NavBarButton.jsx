import { connect } from 'react-redux';
import {barButtonClass} from '../../componentsHelpers/acordion'

const NavBarButton = (props)=>{
    const {acordion} = props
    const buttonLines=()=>{
        if (acordion.varAcordion === 'display-nav-bar'){
            return(
                <>
                    <div id="display-nav-bar-1"className={`${barButtonClass("display-nav-bar",acordion)} lines`}></div>
                    <div id="display-nav-bar-2"className={`${barButtonClass("display-nav-bar",acordion)} lines`}></div>
                    <div id="display-nav-bar-3"className={`${barButtonClass("display-nav-bar",acordion)} lines`}></div>
                </>
            )
        } else{
            return <p className="x">X</p>
        }
    }

    return(
        <button id="display-nav-bar" className={`${barButtonClass("display-nav-bar",acordion)} nav-bar-button`}>  
          {buttonLines()}
        </button>
    )
}


const mapStateToProps = state => { 
    return {
        acordion: state.acordion.acordion,
    }
}
      

      
export default connect(mapStateToProps , null)(NavBarButton)