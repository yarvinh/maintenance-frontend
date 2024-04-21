import React, { useState,useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchLogIn } from '../actions/usersActions'
// import '../../styles/styles.css'
import {Navigate,Link} from 'react-router-dom'
import { fetchAppContent } from '../componentsHelpers/fetching';
import { getFetchAction } from '../actions/fetchActions';

const TryItYourself = (props) => {
  const {login,user} = props
    useEffect(() => {
        props.fetchLogIn({username: "testapp",password: "12345@"},'business_login')
    } ,[]); 

    useEffect(() => {
      if(!user.reload && login) {
        fetchAppContent(props.getFetchAction) 
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
    user: state.user,
    login: state.user.user.is_login,
    loading: state.user.loading,

  }
}
 
const mapDispatchToProps = dispatch => {
  return {
    fetchLogIn: (action,path) => dispatch(fetchLogIn(action,path)),
    getFetchAction: (action) => dispatch(getFetchAction(action))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TryItYourself)