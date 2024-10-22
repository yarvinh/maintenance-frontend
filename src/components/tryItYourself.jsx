import  {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogIn } from '../actions/usersActions'
import {Navigate} from 'react-router-dom'
import { paths } from '../actions/actionsHelper';
const TryItYourself = () => {
    const user = useSelector(state => state.user.user)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchLogIn({username: "testapp",password: "12345@"} ,paths(false).login))
    } ,[]); 

     const redirect = ()=>{
      return <Navigate to='/' /> 
     }

    return(
      <div>
        {user.is_login? redirect(): null}
      </div>
    );
};


export default TryItYourself