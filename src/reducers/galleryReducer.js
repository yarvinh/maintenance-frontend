export const galleryReducer = (state = {gallery: [],uploading: false},action)=>{
    switch(action.type) {
      case "UPLOADING_GALLERY":
      return state = {
        ...state,
        gallery: state.gallery,
        loading: true,  
        uploading:  true 
      }
      case 'ADD_GALLERY':
        return {
           ...state,
          gallery: action.gallery,
          uploading: false
      } 
    default:
      return state;
    }
}
  