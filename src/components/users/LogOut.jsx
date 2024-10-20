import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogOut } from '../../actions/usersActions'
import {Navigate} from 'react-router-dom'

const LogOut = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const loading = useSelector(state => state.user.userLoading)
    const handleLogOut = () => {
        dispatch(fetchLogOut())
    }
     
    useEffect(()=>{
      handleLogOut()
    },[])

    return(
      <div>
          {!user.is_login && !loading && <Navigate to='/'/> }     
      </div>
    );    
};

export default LogOut