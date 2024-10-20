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
