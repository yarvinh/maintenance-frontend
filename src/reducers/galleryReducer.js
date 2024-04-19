export const galleryReducer = (state = {gallery: [],loading: true},action)=>{
    switch(action.type) {
      case "UPLOADING_GALLERY":
      return state = {
        ...state,
        gallery: state.gallery,
        loading: true,  
        uploading:  true 
      }
      case 'LOADING_GALLERY':
      return state = {
        ...state,
        gallery: state.gallery,
        loading: true,  
      }
      case 'ADD_GALLERY':
        return {
           ...state,
          gallery: action.gallery,
          loading: false
      } 
    default:
      return state;
    }
}
  