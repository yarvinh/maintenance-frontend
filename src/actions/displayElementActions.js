
import { displayElementReceived, displayFormReceived } from "../state/reducers/displayElementReducer"

export const displayElement = (payload) => {
    return async (dispatch) =>{
        dispatch(displayElementReceived(payload))
    }
}

export const displayForms = (payload) => {
    return async (dispatch) =>{
        dispatch(displayFormReceived(payload))
    }
}