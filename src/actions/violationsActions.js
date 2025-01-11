import { ERRORS } from '../componentsHelpers/errors'
import { fixProperties, violationsFilter } from '../componentsHelpers/violations'
import { errorsOrMessagesReceived } from '../state/reducers/errorsOrMessagesReducer'
import { violationsLoading, violationsReceived } from '../state/reducers/violationsReducer'

export const violationsFetch = (url) => {
    return async (dispatch) => {   
        dispatch(violationsLoading())
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                withCredentials: true
            })
            const data =  await response.json()
            dispatch(violationsReceived(data))
           
        } catch (error){
            dispatch(errorsOrMessagesReceived(ERRORS))
        }
    } 
}

export const sanitationViolations = ({block, lot}) => {
    const {fixedBlock, fixedLot} =  fixProperties({block: block, lot: lot})
    return async (dispatch) => {
        dispatch(violationsLoading())
        try{
            const response = await fetch(`https://data.cityofnewyork.us/resource/r78k-82m3.json?violation_location_block_no=${fixedBlock}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                withCredentials: true
            })
            const data = await response.json()
            const violations = violationsFilter({allViolations: data,lot: fixedLot})
            dispatch(violationsReceived(violations))
        }catch(error){
            dispatch(errorsOrMessagesReceived(ERRORS))
        }
    }
}

// export const violationsFetch = (url) => {
//     return async (dispatch) => {   
//         dispatch(violationsLoading())
//         try {
//             const response = await axios.get(url)
//             dispatch(violationsReceived(response.data))
//         } catch (error){
//             dispatch(errorsOrMessagesReceived(ERRORS))
//         }
//     } 
// }

// export const sanitationViolations = (block) => {
//     return async (dispatch) => {
//         dispatch(violationsLoading())
//         try{
//             const response = await axios.get(`https://data.cityofnewyork.us/resource/r78k-82m3.json?violation_location_block_no=${block}` )
//             dispatch(violationsReceived(response.data))
//         }catch(error){
//             dispatch(errorsOrMessagesReceived(ERRORS))
//         }
//     }
// }
