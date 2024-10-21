
import { displayElementReceived, displayFormReceived } from "../state/reducers/displayElementReducer"

export const displayElement = (payload) => {
    return (dispatch) =>{
        dispatch(displayElementReceived(payload))
    }
}

export const displayForms = (payload) => {
    return  (dispatch) =>{
        dispatch(displayFormReceived(payload))
    }
}