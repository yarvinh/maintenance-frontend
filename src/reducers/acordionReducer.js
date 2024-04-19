export const AcordionReducer = (state = { acordion: {acordion: 'display_accordion',barDisplay: "hide-bar" ,varAcordion:'display-nav-bar', display: 'hide_elements' ,elementId: ''}, loading: false }, action) => {
    switch(action.type) {
        case 'DEFAULT_ACORDION':
        return state ={
          ...state,
          acordion: state.acordion,
          loading: true,    
        }
  
        case 'ACORDION':
          return {
             ...state,
            acordion: action.acordion,
            loading: false
        } 
  
      default:
        return state;
    }
}