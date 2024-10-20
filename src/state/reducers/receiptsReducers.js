
import { createSlice} from "@reduxjs/toolkit";
import { addItemToArray, deleteItemFromArray, editItemFromArray } from "../../componentsHelpers/arrayHelper";

const receiptsSlice =  createSlice({
    name: 'receipts',
    initialState: {
        receiptsLoading: false,
        receipts: []
    },
    reducers: {
        receiptsLoading: ( state ) => {
            state.receiptsLoading = !state.receiptsLoading
        },
        receiptsReceived: ( state, action ) => {
            state.receipts = action.payload
            state.receiptsLoading = false
        },
        createdOrDeleteReceipt: (state,action) => {
            if (action.payload.receipt_removed){
                deleteItemFromArray({array: state.receipts, id: action.payload.id})
            } else {
                addItemToArray({array: state.receipts, item: action.payload})  
            }
            state.receiptsLoading = false 
        },
        editReceiptsReceived: (state, action) => {
            editItemFromArray({array: state.receipts, item: action.payload})
        }
    }
})

export const {receiptsLoading, receiptsReceived, createdOrDeleteReceipt, editReceiptsReceived} =  receiptsSlice.actions
export default  receiptsSlice.reducer

