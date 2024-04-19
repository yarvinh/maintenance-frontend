import axios from 'axios'
import {token,verificationToken,removeLoginToken} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'


export const getFetchAction = ({path,loading,type, stateName}) => { 
    console.log(`${baseUrl()}${path}`)
    return (dispatch) => {
        // dispatch({ type: loading})
        axios.get(`${baseUrl()}${path}`, 
        {headers: token(),withCredentials: true})    
        .then(response => {
            console.log("testing",response)
          dispatch({ type: type, [stateName]: response.data})
        })
        .catch( error => 
            dispatch({ type: 'ERRORS_OR_MESSAGES', errorOrMessages: ['Something went wrong with the server, please try again later.']})
        )
    }
}
