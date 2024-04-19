export const violationsReducer = (state = { violations: [], loading: false }, action) => {
    switch(action.type) {
        case 'LOADING_VIOLATIONS':
        return state ={
          ...state,
          violations: state.violations,
          loading: true,    
        }
  
        case 'ADD_VIOLATIONS':
          return {
             ...state,
            violations: action.violations,
            loading: false
        } 
  
      default:
        return state;
    }
}