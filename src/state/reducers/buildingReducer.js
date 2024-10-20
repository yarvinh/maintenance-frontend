import { createSlice} from "@reduxjs/toolkit";

const buildingSlice =  createSlice({
    name: 'building',
    initialState: {
        buildingLoading: false,
        building: {}
    },
    reducers: {
        buildingLoading: (state)=>{
            state.buildingLoading = !state.buildingLoading
        },
        buildingReceived: (state,action)=>{
            state.building = action.payload
            state.buildingLoading = false
        }
    }
})

export const {buildingLoading, buildingReceived} =  buildingSlice.actions
export default  buildingSlice.reducer