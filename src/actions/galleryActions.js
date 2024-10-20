import axios from 'axios'
import {token} from '../componentsHelpers/token'
import {baseUrl} from './actionsHelper'
import { galleryReceived, uploadingImages } from '../state/reducers/galleryReducer'
import { errorsOrMessagesReceived } from '../state/reducers/errorsOrMessagesReducer'
import { ERRORS } from '../componentsHelpers/errors'

export const createGalleryImages = ({workOrderId,images}) => {
    return async (dispatch) => {
        dispatch(uploadingImages())
        try {
          const response = await axios.post(`${baseUrl()}/work_orders/${workOrderId}/gallery_images`,images.images,{headers: token('multipart/form-data'), withCredentials: true})
          dispatch(galleryReceived(response.data))
        }catch (error){
          dispatch(uploadingImages())
          if(error.response?.data.errors_or_messages){
            dispatch(errorsOrMessagesReceived(error.response.data?.errors_or_messages))
           } else{
            dispatch(errorsOrMessagesReceived(ERRORS))
           }
        }  
    } 
}


// export const updateGalleryImage = (gallery) => {
//     const work_order_id = gallery.work_order_id
//     const gallery_image_id = gallery.gallery_image_id
//     return (dispatch) => {
//         dispatch({type: "LOADING"})
//         axios.patch(`${baseUrl()}/work_orders/${work_order_id}/edit_gallery/${gallery_image_id}`, gallery.gallery_image,{headers: token(), withCredentials: true})
//         .then(response => {
//             const error = response.data.errors_or_messages
           
//             error? dispatch({ type: 'ADD_ERRORS_OR_MESSAGES', errorsOrMessages: response.data.errors_or_messages}):  dispatch({ type: 'ADD_GALLERY', gallery: response.data})
//         })
//     } 
// }


// export const removeImage = (id) => {
//     return (dispatch) => {
//       dispatch({ type: 'LOADING'})
//       axios.delete(`${baseUrl()}/remove_image/${id}`,{headers: token(), withCredentials: true}
//       ).then(response => {   
//         dispatch({ type: 'ADD_GALLERY', gallery: response.data })
//       })
//     }
//   }