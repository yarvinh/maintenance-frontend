import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'

// export const fetchBuildings = () => {
//   return async (dispatch) => {
//     dispatch({ type: 'LOADING_BUILDINGS'})
//     axios.get(`${baseUrl()}/buildings`,{headers: token(), withCredentials: true})
//     .then(response => {
//       const error = response.data.errors_or_messages
//       error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}):  dispatch({ type: 'ADD_BUILDINGS', buildings: response.data})
//     })
//   }
// }

export const fetchBuilding = (id) =>{
  return (dispatch) => {
    dispatch({ type: 'LOADING_BUILDING'})
    axios.get(`${baseUrl()}/buildings/${id}`,{headers: token(), withCredentials: true})
    .then(response => {
      const error = response.data.errors_or_messages
      error ?dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: error}) :dispatch({ type: 'ADD_BUILDING', building: response.data})
    })    
  }
}

// export const createBuilding = (payload) => {
//   const {building,buildings} = payload
//   return (dispatch) => {
//       dispatch({ type: 'LOADING_BUILDING'})
//       axios.post(`${baseUrl()}/buildings`, building, {headers: token(), withCredentials: true})
//       .then(response => {

//         const error = response.data.errors_or_messages
//         if(error){
//           dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: error})
//         }else{
//           dispatch({ type: 'ADD_BUILDING', building: response.data})
//           dispatch({ type: 'ADD_BUILDINGS', buildings: [...buildings, response.data]})
//         }
//     })
//   }
// }

export const editBuilding = (payload) => {
  const {id, buildings, building} = payload
  return (dispatch) => {
      dispatch({type: "LOADING_BUILDING"})
      axios.patch(`${baseUrl()}/buildings/${id}`, building ,{headers: token(), withCredentials: true})
      .then(response => {
        const error = response.data.errors_or_messages
        const index = buildings.findIndex(e=> e.id?.toString() === id)
        if(error){
          dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages})
        }else{
          console.log(response.data)
          buildings[index] = response.data
          dispatch({ type: 'ADD_BUILDING', building: response.data})
          dispatch({ type: 'ADD_BUILDINGS', buildings: buildings})
        }
        // error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}):  dispatch({ type: 'ADD_BUILDINGS', buildings: response.data})
      })
  }
}

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