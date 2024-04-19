

export const WorkOrdersReducer = (state = { workOrders: [], loading: true ,filter_by: ""}, action) => {
    switch(action.type) {
        case 'LOADING_WORK_ORDERS':
        return state ={
          ...state,
          workOrders: state.workOrders,
          filter_by: state.filter_by,
          loading: true,    
        }
 
        case 'ADD_WORK_ORDERS':
          return {
             ...state,
            workOrders: action.workOrders,
            filter_by: action.filter_by,
            loading: false
        } 

      default:
        return state;
    }
}

export const WorkOrderReducer = (state = { workOrder: {date: "Loading", unit: "Loading",phone_number: 'Loading', title: "loading", user_id: 0, employees: [],tasks:[]}, loading: true }, action)=>{
    switch(action.type) {
      case 'LOADING_WORK_ORDER':
      return state = {
        ...state,
        workOrder: state.workOrder,
        loading: true,    
      }
      case 'ADD_WORK_ORDER':
        return {
           ...state,
          workOrder: action.workOrder,
          loading: false
      } 

    default:
      return state;
    }
}


export const EmployeeWorkOrdersReducer = (state = { employeeWorkOrders: [], loading: false ,filter_by: ""}, action) => {
    switch(action.type) {
        case 'EMPLOYEE_WORK_ORDERS':
          return {
             ...state,
            employeeWorkOrders: action.employeeWorkOrders,
            filter_by: action.filter_by,
            loading: false
        } 

      default:
        return state;
    }
}

export const WorkOrdersToFilterReducer = (state = { workOrdersToFilter: [] ,filter_by: ""}, action) => {
    switch(action.type) {
        case 'ADD_WORK_ORDERS_TO_FILTER':
          return {
             ...state,
            workOrdersToFilter: action.workOrders,
            filter_by: action.filter_by,
        } 
      default:
        return state;
    }
}

export const WorkOrderIndex = (state = { workOrderIndex: {} }, action) => {
  // console.log(action)
  switch(action.type) {
      case 'WORK_ORDER_INDEX':
        return {
          ...state,
          workOrderIndex: action.workOrderIndex,
        } 
    default:
      return state;
  }
}