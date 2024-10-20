import { createSlice} from "@reduxjs/toolkit";
import { addItemToArray, deleteItemFromArray, editItemFromArray } from "../../componentsHelpers/arrayHelper";

const workOrdersSlice =  createSlice({
    name: 'workOrders',
    initialState: {
        workOrdersLoading: false,
        workOrders: []
    },
    reducers: {
        workOrdersLoading: (state)=>{
            state.workOrdersLoading = !state.betLoading
        },
        workOrdersReceived: (state,action)=>{
            state.workOrders = action.payload
            state.workOrdersLoading = false
        },        
        createdOrDeleteWorkOrders: (state,action) => {
            if (action.payload.work_order_removed){
                deleteItemFromArray({array: state.workOrders, id: action.payload.id})
            } else {
                addItemToArray({array: state.workOrders, item: action.payload})  
                state.workOrdersLoading = false 
            }
        },
        editWorkOrderReceived: (state, action) => {
          editItemFromArray({array: state.workOrders, item: action.payload})
          state.workOrdersLoading = false 
        }
    }
})

export const {workOrdersLoading, workOrdersReceived, createdOrDeleteWorkOrders, editWorkOrderReceived} =  workOrdersSlice.actions
export default  workOrdersSlice.reducer