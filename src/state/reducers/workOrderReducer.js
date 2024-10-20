import { createSlice} from "@reduxjs/toolkit";

const workOrderSlice =  createSlice({

    name: 'workOrder',
    initialState: {
        workOrderLoading: false,
        workOrder: {}
    },
    reducers: {
        workOrderLoading: (state)=>{
            state.workOrderLoading = !state.workOrderLoading
        },
        workOrderReceived: (state,action)=>{
            state.workOrderLoading = false
            state.workOrder = action.payload
        }
    }
})

export const {workOrderLoading, workOrderReceived} =  workOrderSlice.actions
export default  workOrderSlice.reducer