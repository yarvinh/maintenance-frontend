import axios from 'axios'

export const ViolationsFetch = (url) => {
        return (dispatch) => {   
            dispatch({ type: 'LOADING_VIOLATIONS'})
            axios.get(url)
            .then(response => {
                dispatch({ type: 'ADD_VIOLATIONS', violations: response.data})
            }).catch(e=> console.log("error",e))
        } 
}
