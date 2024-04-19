import React, { useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchLogIn } from '../actions/usersActions'
// import '../../styles/styles.css'
import {Navigate,Link} from 'react-router-dom'


const TryItYourself = (props) => {
  const {login,user} = props
//     const {errorsOrMessages} = props
//     const [user, setUser] = useState({
//       username: '',
//       password: ''
//     })


    useEffect(() => {
        props.fetchLogIn({username: "testapp",password: "12345@"},'business_login')
    } ,[]); 

    useEffect(() => {
      if(!user.reload && login) {
        props.fetchAppContent() 
      }
    } ,[login]); 

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
    // errorsOrMessages: state.errorsOrMessages.errorsOrMessages,
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