import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'

  // export const fetchWorkOrders = () => {
  //   return (dispatch) => {
  //     dispatch({ type: 'LOADING_WORK_ORDERS'})
  //     axios.get(`${baseUrl()}/work_orders`,{headers: token(), withCredentials: true})
  //     .then(response => {
  //       const error = response.data.errors_or_messages
  //       error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}):  dispatch({ type: 'ADD_WORK_ORDERS', workOrders: response.data})
  //     })
  //   }
  // }

  export const fetchWorkOrder = (id) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_WORK_ORDER'})
      axios.get(`${baseUrl()}/work_orders/${id}`,{headers: token(), withCredentials: true})
      .then(response => {
        const error = response.data.errors_or_messages
        error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}):  dispatch({ type: 'ADD_WORK_ORDER', workOrder: response.data})
      })
    }
  }

  export const createWorkOrder = (payload) => {
    const {workOrders, workOrder,path} = payload
    return (dispatch) => {
          dispatch({type: "LOADING_WORK_ORDER"})
          axios.post(`${baseUrl()}/${path}`, workOrder ,{headers: token(),withCredentials: true})
          .then(response => {
              const error = response.data.errors_or_messages
              if(error) 
                dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages})
              else
                dispatch({ type: 'ADD_WORK_ORDERS', workOrders: [response.data,...workOrders]})
                dispatch({ type: 'ADD_WORK_ORDER', workOrder: response.data})
          })
      }  
  }


  export const editWorkOrder = (payload) => {
  const {workOrder,workOrders } = payload
    return (dispatch) => {
        dispatch({type: "LOADING_WORK_ORDER"})
        axios.patch(`${baseUrl()}/work_orders/${workOrder.id}`, workOrder ,{headers: token(), withCredentials: true})
        .then(response => {
          const error = response.data.errors_or_messages
          const index = workOrders.findIndex(e=> e.id?.toString() === workOrder.id)
          if(error){
            dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages})
          }else{
            workOrders[index] = response.data
            dispatch({ type: 'ADD_WORK_ORDER', workOrder: response.data})
            dispatch({ type: 'ADD_WORK_ORDERS', workOrders: workOrders})
          }
        })
    } 
}


export const deleteWorkOrder = (id) => {
  return (dispatch) => {
    dispatch({ type: 'LOADING_WORK_ORDERS'})
    axios.delete(`${baseUrl()}/work_orders/${id}`,{headers: token(), withCredentials: true}
    ).then(response => {   
      dispatch({ type: 'ADD_WORK_ORDERS', workOrders: response.data })
    }).catch( error =>{
      console.log(typeof error.toString())
      dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: [ error.toString(), "Something went wrong"] })
    })
  }
}


export const removeEmployee = (payload) => {
  const {workOrders, ids} = payload
  return (dispatch) => {
    dispatch({ type: 'LOADING_WORK_ORDER'})
    axios.delete(`${baseUrl()}/remove_employee`,{params: ids, headers: token(), withCredentials: true}
    ).then(response => {   
      const error = response.data.errors_or_messages
      const index = workOrders.findIndex(e=> e.id?.toString() === ids.work_order_id)
      if(error)
        dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages})
      else
        workOrders[index] = response.data
        dispatch({ type: 'ADD_WORK_ORDER', workOrder: response.data})
        dispatch({ type: 'ADD_WORK_ORDERS', workOrders: workOrders})
    })
  }
}



export const  workOrderFilter = (workOrders) => {
  return ({ type: 'ADD_WORK_ORDERS_TO_FILTER', workOrders: workOrders.workOrders,filter_by: workOrders.filter_by})
}

export const getEmployeeWorkOrders = (employeeWorkOrders) =>{
  return ({ type: 'EMPLOYEE_WORK_ORDERS', employeeWorkOrders: employeeWorkOrders.workOrders, filter_by: employeeWorkOrders.filter_by})     
}

export const workOrderIndex = (index) => {
  return (dispatch) => {
    dispatch({ type: 'WORK_ORDER_INDEX', workOrderIndex: index})
  }
}





