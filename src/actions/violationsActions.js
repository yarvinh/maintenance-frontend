import axios from 'axios'
import { ERRORS } from '../componentsHelpers/errors'
import { errorsOrMessagesReceived } from '../state/reducers/errorsOrMessagesReducer'
import { violationsLoading, violationsReceived } from '../state/reducers/violationsReducer'
import { token } from '../componentsHelpers/token'




// export const violationsFetch = (url) => {
//     return async (dispatch) => {   
//         dispatch(violationsLoading())
//         try {
//             const response = await fetch(url, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                 },
//                 withCredentials: true
//             })
//             const data =  await response.jeson()
//             dispatch(violationsReceived(data))
//         } catch (error){
//             dispatch(errorsOrMessagesReceived(ERRORS))
//         }
//     } 
// }

// export const sanitationViolations = (block) => {
//     return async (dispatch) => {
//         dispatch(violationsLoading())
//         try{
//             const response = await fetch(`https://data.cityofnewyork.us/resource/r78k-82m3.json?violation_location_block_no=${block}`, {
//                 method: "GET",
//                 headers: {
//                     "Content-Type": "application/x-www-form-urlencoded",
//                 },
          
//                 withCredentials: true
//             })
//             const data = await response.json()
//             dispatch(violationsReceived(data))
//         }catch(error){
//             dispatch(errorsOrMessagesReceived(ERRORS))
//         }
//     }
// }

export const violationsFetch = (url) => {
    return async (dispatch) => {   
        dispatch(violationsLoading())
        try {
            const response = await axios.get(url)
            dispatch(violationsReceived(response.data))
        } catch (error){
            dispatch(errorsOrMessagesReceived(ERRORS))
        }
    } 
}

export const sanitationViolations = (block) => {
    return async (dispatch) => {
        dispatch(violationsLoading())
        try{
            const response = await axios.get(`https://data.cityofnewyork.us/resource/r78k-82m3.json?violation_location_block_no=${block}` )
            dispatch(violationsReceived(response.data))
        }catch(error){
            dispatch(errorsOrMessagesReceived(ERRORS))
        }
    }
}
