export const AccordionReducer = (state = { accordion: {accordion: 'display_accordion',barDisplay: "hide-bar" ,barAccordion:'display-nav-bar', display: 'hide_elements' ,elementId: ''}, loading: false }, action) => {
    switch(action.type) {
        case 'DEFAULT_ACCORDION':
        return state ={
          ...state,
          accordion: state.accordion,
          loading: true,    
        }
  
        case 'ACCORDION':
          return {
             ...state,
            accordion: action.accordion,
            loading: false
        } 
  
      default:
        return state;
    }
}