import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'

  export const getImages = (id) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING'})
      axios.get(`${baseUrl()}/work_orders/${id}/gallery`,{headers: token(), withCredentials: true})
      .then(response => {
      const error = response.data.errors_or_messages
      error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}):  dispatch({ type: 'ADD_GALLERY', gallery: response.data})
      })
    }
  }



export const createGalleryImages = (gallery) => {
    const id = gallery.id
    return (dispatch) => {
        dispatch({type: "UPLOADING_GALLERY"})
        axios.post(`${baseUrl()}/work_orders/${id}/add_gallery_images`,gallery.images.images,{headers: token('multipart/form-data'), withCredentials: true})
        .then(response => {
            const error = response.data.errors_or_messages
            error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}):  dispatch({ type: 'ADD_GALLERY', gallery: response.data})
        }).catch(
          function (error) {
            console.log(error, 'Show error notification!')
          }
        )
      
    } 
}


export const updateGalleryImage = (gallery) => {
    const work_order_id = gallery.work_order_id
    const gallery_image_id = gallery.gallery_image_id
    return (dispatch) => {
        dispatch({type: "LOADING"})
        axios.patch(`${baseUrl()}/work_orders/${work_order_id}/edit_gallery/${gallery_image_id}`, gallery.gallery_image,{headers: token(), withCredentials: true})
        .then(response => {
            const error = response.data.errors_or_messages
           
            error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}):  dispatch({ type: 'ADD_GALLERY', gallery: response.data})
        })
    } 
}


export const removeImage = (id) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING'})
      axios.delete(`${baseUrl()}/remove_image/${id}`,{headers: token(), withCredentials: true}
      ).then(response => {   
        dispatch({ type: 'ADD_GALLERY', gallery: response.data })
      })
    }
  }