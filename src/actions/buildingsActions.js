// import axios from 'axios'
// import {token} from '../componentsHelpers/token'
// import {baseUrl} from './actionsHelper'


// export const searchBuilding = (params) => {
//   return (dispatch) => {
//     dispatch({ type: 'LOADING'})
//     axios.get(`${baseUrl()}/search/buildings/`,{params: {address: params}, headers: token(), withCredentials: true}
//     ).then(response => {   
//       dispatch({ type: 'ADD_BUILDINGS', buildings: response.data })
//     })
//   }
// }