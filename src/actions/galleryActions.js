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

