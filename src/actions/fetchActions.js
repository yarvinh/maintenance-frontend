
import {token} from '../componentsHelpers/token'
import {baseUrl, serverErrors} from './actionsHelper'
import { errorsOrMessagesReceived } from '../state/reducers/errorsOrMessagesReducer'
import axios from 'axios'
import { ERRORS } from '../componentsHelpers/errors'

// export const getFetchAction = ({path, loading, reducer, query_string}) => { 

//   return async (dispatch) => {
//       loading && dispatch(loading())
//         try {
//             const response = await fetch(`${baseUrl()}${path}?${{query_string: query_string}}`, query_string ? {
//               method: "GET", 
//               params: {query_string}, 
//               headers: token(), 
//               withCredentials: true} : {
//               method: "GET", 
//               headers: token(), 
//               withCredentials: true
//             })  
//             if(!response.ok) throw new Error(await response.text())
//             const data = await response.json()
//             reducer && dispatch(reducer(data))
//         } catch (error){
//             loading && dispatch(loading())
//             serverErrors({dispatch: dispatch, message: error.message})  
//         }
//     }
// }

export const postFetchAction = ( {payload,path,loading,reducer}) => {
  return async (dispatch) => {
    loading && dispatch(loading())
    try {
      const response = await fetch(`${baseUrl()}${path}`, {
        method: "POST", 
        headers: token(), 
        withCredentials: true, 
        body: JSON.stringify(payload)
      })
      if(!response.ok) throw new Error(await response.text())
      const data = await response.json()
      reducer && dispatch(reducer(data))
    }catch (error){
      loading && dispatch(loading())
      serverErrors({dispatch: dispatch, message: error.message}) 
    }
  }
}

export const patchFetchAction = ({payload,path,loading,itemsReducer,itemReducer}) => {
  return async (dispatch) => {
       loading && dispatch(loading())
        try {
          const response = await fetch(`${baseUrl()}${path}`,{
            method: "PATCH",
            headers: token(), 
            withCredentials: true,
            body: JSON.stringify(payload)
          })
          if(!response.ok) throw new Error(await response.text())
          const data = await response.json()
          itemsReducer && dispatch(itemsReducer(data))
          itemReducer && dispatch(itemReducer(data))
          data.errors_or_messages && dispatch(errorsOrMessagesReceived(data.errors_or_messages))
        } catch (error){
          loading && dispatch(loading())
          serverErrors({dispatch: dispatch, message: error.message}) 
        }
    }
}

export const deleteFetchAction = ({path, reducer, optionalReducer}) => { 
  return async (dispatch) => {
    try {
      const response = await fetch(`${baseUrl()}${path}`,{method: "DELETE",headers: token(), withCredentials: true})
      const data = await response.json()
      if(!response.ok) throw new Error(await response.text())
      reducer && dispatch(reducer(data))
      optionalReducer && dispatch(optionalReducer(data))
    } catch(error) {
      serverErrors({dispatch: dispatch, message: error.message}) 
    }
  }
}

export const getFetchAction = ({path, loading, reducer, query_string}) => { 
  return async (dispatch) => {
      loading && dispatch(loading())
        try {
            const response = await axios.get(`${baseUrl()}${path}`, query_string ? {params: {query_string}, headers: token(), withCredentials: true} : { headers: token(), withCredentials: true} )  
            reducer && dispatch(reducer(response.data))
        } catch (error){
            loading && dispatch(loading())
            if(error.response?.data?.errors_or_messages)
              dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
            else
              dispatch(errorsOrMessagesReceived(ERRORS))  
        }
    }
}

// export const patchFetchAction = ({payload,path,loading,itemsReducer,itemReducer}) => {
//   return async (dispatch) => {
//        loading && dispatch(loading())
//         try {
//           const response = await axios.patch(`${baseUrl()}${path}`, payload ,{headers: token(), withCredentials: true})
//           itemsReducer && dispatch(itemsReducer(response.data))
//           itemReducer && dispatch(itemReducer(response.data))
//           response.data.errors_or_messages && dispatch(errorsOrMessagesReceived(response.data.errors_or_messages))
//         } catch (error){
//           loading && dispatch(loading())
//           if(error.response?.data.errors_or_messages)
//             dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
//           else
//             dispatch(errorsOrMessagesReceived(ERRORS))
//         }
//     }
// }

// export const deleteFetchAction = ({path, reducer, optionalReducer}) => { 
//   return async (dispatch) => {
//     try {
//       const response = await axios.delete(`${baseUrl()}${path}`,{headers: token(), withCredentials: true})
//       reducer && dispatch(reducer(response.data))
//       optionalReducer && dispatch(optionalReducer(response.data))
//     } catch(error) {
//       if(error.response?.data.errors_or_messages)
//         dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
//       else
//         dispatch(errorsOrMessagesReceived(ERRORS))
//     }
//   }
// }
  

// export const postFetchAction = ( {payload,path,loading,reducer}) => {
//   return async (dispatch) => {
//     loading && dispatch(loading())
//     try {
//       const response = await axios.post(`${baseUrl()}${path}`,payload, {headers: token(), withCredentials: true,})
//       reducer && dispatch(reducer(response.data))
//     }catch (error){
//       console.log(error)
//       loading && dispatch(loading())
//       if(error.response?.data.errors_or_messages)
//         dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
//       else
//         dispatch(errorsOrMessagesReceived(ERRORS))
//     }
//   }
// }