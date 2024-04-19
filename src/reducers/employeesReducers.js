export const EmployeesReducer = (state = { employees: [], loading: true }, action) => {
    switch(action.type) {
        case 'LOADING_EMPLOYEES':
        return state ={
          ...state,
          employees: state.employees,
          loading: true,    
        }
 
        case 'ADD_EMPLOYEES':
          return {
             ...state,
            employees: action.employees,
            loading: false
        } 

      default:
        return state;
    }
}

export const EmployeeReducer = (state = { employee: {}, loading: false }, action)=>{
    switch(action.type) {
      case 'LOADING_EMPLOYEE':
      return state = {
        ...state,
        employee: state.employee,
        loading: true,    
      }

      case 'ADD_EMPLOYEE':
        return {
           ...state,
          employee: action.employee,
          loading: false
      } 

    default:
      return state;
    }
}