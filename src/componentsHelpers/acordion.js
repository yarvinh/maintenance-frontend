
export const acordionDisplay = (action) =>{
  if(action.acordion.acordion === 'display_accordion' && action.element.target.className?.includes('display_accordion')){
    return (dispatch) => { 
      dispatch({ type: 'ACORDION', acordion: {acordion: 'display_accordion active' , varAcordion: 'display-nav-bar',display: 'display_elements',elementId: action.element.target.id} })  
    }
  } else {
    return (dispatch) => {
      dispatch({ type: 'ACORDION', acordion: {acordion: 'display_accordion', varAcordion: 'display-nav-bar', display: 'hide_elements',elementId: action.element.target.id} })}
  }
}

export const barAccordionDisplay = (action) =>{
  if (action.acordion.varAcordion  === 'display-nav-bar'){
    return (dispatch) => { 
      dispatch({ type: 'ACORDION', acordion: { acordion: 'display_accordion', varAcordion: 'display-nav-bar hide' ,barDisplay: 'show-bar',elementId: action.element.target.id} }) 
    }
  }else {
    return (dispatch) => { 
      dispatch({ type: 'ACORDION', acordion: {acordion: 'display_accordion' ,varAcordion: 'display-nav-bar',barDisplay: 'hide-bar',elementId: action.element.target.id} }) 
    }
  }
}

export const acordionButtonClass=(id,acordion)=>{
  return acordion.elementId === id ? acordion.acordion : 'display_accordion'
  
}

export const barButtonClass=(id,acordion) => {
  return acordion.elementId === id ? acordion.varAcordion : 'display-nav-bar'
}

export const diplayAcordion=(id,acordion)=>{
  return acordion.elementId === id ? acordion.display : 'hide_elements'
}

export const displayBarAccordion=(id,acordion)=>{
  return acordion.elementId?.includes(id) ? acordion.barDisplay : 'hide-bar'
}

