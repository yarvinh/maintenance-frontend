import { accordionReceived } from "../state/reducers/accordionReducer"

export const accordionDisplay = (action) =>{
  if(action.accordion.accordion === 'display_accordion' && action.element.target.className?.includes('display_accordion')){
    return (dispatch) => { 
      dispatch(accordionReceived({ barDisplay: 'hide-bar',accordion: 'display_accordion active' , barAccordion: 'display-nav-bar',display: 'display_elements',elementId: action.element.target.id} ))  
    }
  } else {
    return (dispatch) => {
      dispatch(accordionReceived({barDisplay: 'hide-bar',accordion: 'display_accordion', barAccordion: 'display-nav-bar', display: 'hide_elements',elementId: action.element.target.id} ))
    }
  }
}

export const barAccordionDisplay = (action) =>{
  if (action.accordion.barAccordion  === 'display-nav-bar'){
    return (dispatch) => { 
      dispatch(accordionReceived({ accordion: 'display_accordion', barAccordion: 'display-nav-bar hide' ,barDisplay: 'show-bar',elementId: action.element.target.id} )) 
    }
  }else {
    return (dispatch) => { 
      dispatch(accordionReceived( {accordion: 'display_accordion' ,barAccordion: 'display-nav-bar',barDisplay: 'hide-bar',elementId: action.element.target.id} )) 
    }
  }
}

export const accordionButtonClass=(id,accordion)=>{
  return accordion.elementId === id ? accordion.accordion : 'display_accordion'
  
}

export const barButtonClass=(id,accordion) => {
  return accordion.elementId === id ? accordion.barAccordion : 'display-nav-bar'
}

export const diplayAccordion=(id,accordion)=>{
  return accordion.elementId === id ? accordion.display : 'hide_elements'
}

export const displayBarAccordion=(id,accordion)=>{
  return accordion.elementId?.includes(id) ? accordion.barDisplay : 'hide-bar'
}


export const handleOnAccordion = (id)=>{
  return {
    buttonClass: "display_accordion", 
    formClass: 'hide_elements', 
    id: id
  }
}
