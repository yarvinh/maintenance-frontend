import { createSlice } from "@reduxjs/toolkit";
import { addItemToArray, deleteItemFromArray } from "../../componentsHelpers/arrayHelper";

const unitsSlice = createSlice({
    name: "units",
    initialState: {
        unitsLoading: false,
        units: []
    },
    reducers: {
        unitsLoading: (state) => {
            state.unitsLoading = !state.unitsLoading
        },
        unitsReceived: (state,action)=>{
            state.units = action.payload
        },
        createdOrDeleteUnit: (state,action) => {
            if (action.payload.unit_removed){
                deleteItemFromArray({array: state.units, id: action.payload.id})
            } else {
                addItemToArray({array: state.units, item: action.payload})  
                state.unitsLoading = false 
            }
        },
    }
})

export const {unitsLoading, unitsReceived, createdOrDeleteUnit} = unitsSlice.actions
export default unitsSlice.reducer