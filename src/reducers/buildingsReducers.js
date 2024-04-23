export const BuildingsReducer = (state = { buildings: [], loading: true }, action) => {
    switch(action.type) {
        // case 'LOADING_BUILDINGS':
        // return state ={
        //   ...state,
        //   buildings: state.buildings,
        //   loading: true,    
        // }
 
        case 'ADD_BUILDINGS':
          return {
             ...state,
            buildings: action.buildings,
            loading: false
        } 

      default:
        return state;
    }
}

export   const BuildingReducer = (state = { building: {}, loading: false }, action)=>{
    switch(action.type) {
      // case 'LOADING_BUILDING':
      // return state = {
      //   ...state,
      //   building: state.building,
      //   loading: true,    
      // }

      case 'ADD_BUILDING':
        return {
           ...state,
          building: action.building,
          loading: false
        } 

      default:
        return state;
    }
}