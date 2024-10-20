import { createSlice} from "@reduxjs/toolkit";
import { addItemToArray, deleteItemFromArray, editItemFromArray } from "../../componentsHelpers/arrayHelper";

const gallerySlice =  createSlice({
    name: 'gallery',
    initialState: {
        galleryLoading: false,
        uploadingImages: false,
        gallery: []
    },
    reducers: {
        galleryLoading: ( state ) => {
            state.galleryLoading = !state.galleryLoading
        },
        uploadingImages: ( state ) => {
            state.uploadingImages = !state.uploadingImages
        },
        galleryReceived: ( state, action ) => {
            state.gallery = action.payload
            state.galleryLoading = false
            state.uploadingImages = false
        },
        deleteImageFromGallery: (state,action) => {
            console.log(action.payload)
            if (action.payload.gallery_image_removed)
                deleteItemFromArray({array: state.gallery, id: action.payload.id})
            state.galleryLoading = false 
        }
    }
})

export const {galleryLoading, galleryReceived, deleteImageFromGallery, uploadingImages} =  gallerySlice.actions
export default  gallerySlice.reducer