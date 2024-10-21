// import axios from 'axios'
// import {token} from '../componentsHelpers/token'
// import {baseUrl} from './actionsHelper'


// export const searchEmployees = (params) => {
//   return (dispatch) => {
//     dispatch({ type: 'LOADING'})
//     axios.get(`${baseUrl()}/search/employees`,{params: {data: params}, headers: token(), withCredentials: true}
//     ).then(response => {   
//       dispatch({ type: 'ADD_EMPLOYEES', employees: response.data })
//     })
//   }
// }