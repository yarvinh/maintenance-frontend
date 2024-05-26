import { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLogOut } from '../../actions/usersActions'
import {Navigate} from 'react-router-dom'

class LogOut extends Component {
    
    handleLogOut = () => {
        this.props.fetchLogOut()
    }
     
    componentDidMount() {
      this.handleLogOut()
    }

    render() {
      return(
        <div>
           {(!this.props.user.is_login && !this.props.loading) && <Navigate to='/'/>}     
        </div>
      );    
    }
};

const mapStateToProps = state => { 
  return {
      user: state.user.user,
      loading: state.user.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchLogOut: () => dispatch(fetchLogOut()),
  }
}


export default connect(mapStateToProps , mapDispatchToProps)(LogOut)