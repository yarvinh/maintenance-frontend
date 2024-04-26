
import {acordionDisplay} from '../componentsHelpers/acordion'
import { connect } from 'react-redux'; 
import Home from '../components/home/Home'
import HomeWithoutLogin from '../components/home/HomeWithoutLogin'
import {isLoginToken} from "../componentsHelpers/token"

const HomeContainer = ({user})=>{

    return (
        <>  
            {user.is_login? <Home />:null}
            {!user.is_login?<HomeWithoutLogin />:null }
        </>
    )
}

const mapStateToProps = state => { 
    return {
       user: state.user.user,
       loading: state.loading.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        acordionDisplay: (action) => dispatch(acordionDisplay(action)),
    }
} 

export default connect(mapStateToProps,mapDispatchToProps)(HomeContainer)