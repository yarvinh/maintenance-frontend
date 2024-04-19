
export const UnitsReducer = (state = { units: [], loading: false }, action) => {
    switch(action.type) {
        case 'LOADING_UNITS':
        return state ={
          ...state,
          units: state.units,
          loading: true,    
        }
  
        case 'ADD_UNITS':
          return {
             ...state,
            units: action.units,
            loading: false
        } 
  
      default:
        return state;
    }
}
  
export const UnitReducer = (state = { unit: {}, loading: false }, action) => {
    switch(action.type) {
        case 'LOADING_UNIT':
        return state ={
          ...state,
          unit: state.unit,
          loading: true,    
        }
  
        case 'ADD_UNIT':
          return {
             ...state,
            unit: action.unit,
            loading: false
        } 
  
    default:
        return state;
    }
}