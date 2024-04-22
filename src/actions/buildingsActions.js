import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'

// export const editBuilding = (payload) => {
//   const {id, buildings, building} = payload
//   return (dispatch) => {
//       dispatch({type: "LOADING_BUILDING"})
//       axios.patch(`${baseUrl()}/buildings/${id}`, building ,{headers: token(), withCredentials: true})
//       .then(response => {
//         const error = response.data.errors_or_messages
//         const index = buildings.findIndex(e=> e.id?.toString() === id)
//         if(error){
//           dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages})
//         }else{
//           buildings[index] = response.data
//           dispatch({ type: 'ADD_BUILDING', building: response.data})
//           dispatch({ type: 'ADD_BUILDINGS', buildings: buildings})
//         }
//       })
//   }
// }

export const deleteBuilding = (id) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_BUILDING'})
    axios.delete(`${baseUrl()}/buildings/${id}`,{headers: token(), withCredentials: true}
    ).then(response => {   
      dispatch({ type: 'ADD_BUILDINGS', buildings: response.data })
    })
  }
}

export const searchBuilding = (params) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_BUILDINGS'})
    axios.get(`${baseUrl()}/search/buildings/`,{params: {address: params}, headers: token(), withCredentials: true}
    ).then(response => {   
      dispatch({ type: 'ADD_BUILDINGS', buildings: response.data })
    })
  }
}