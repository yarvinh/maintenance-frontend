import axios from 'axios'
import { ERRORS } from '../componentsHelpers/errors'
import { errorsOrMessagesReceived } from '../state/reducers/errorsOrMessagesReducer'
import { violationsLoading, violationsReceived } from '../state/reducers/violationsReducer'

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
    // console.log(`https://data.cityofnewyork.us/resource/r78k-82m3.json?violation_location_lot_no=00${lot}`)
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
