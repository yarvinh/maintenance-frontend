
import {accordionDisplay} from '../componentsHelpers/accordion'
import { connect } from 'react-redux'; 
import Home from '../components/home/Home'
import HomeWithoutLogin from '../components/home/HomeWithoutLogin'

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
        accordionDisplay: (action) => dispatch(accordionDisplay(action)),
    }
} 

export default connect(mapStateToProps,mapDispatchToProps)(HomeContainer)