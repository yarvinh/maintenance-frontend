import  {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchLogIn } from '../actions/usersActions'
import {Navigate} from 'react-router-dom'
import { paths } from '../actions/actionsHelper';
const TryItYourself = (props) => {
  const {login} = props
    useEffect(() => {
        props.fetchLogIn({username: "testapp",password: "12345@"},paths(true).login)
    } ,[]); 

     const redirect = ()=>{
      return <Navigate to='/' /> 
     }

    return(
      <div>
        {login? redirect(): null}
      </div>
    );
};

const mapStateToProps = state => { 
  return {
    user: state.user,
    login: state.user.user.is_login,
    loading: state.user.loading,

  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    fetchLogIn: (action,path) => dispatch(fetchLogIn(action,path)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TryItYourself)