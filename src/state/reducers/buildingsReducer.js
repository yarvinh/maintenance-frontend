import { createSlice} from "@reduxjs/toolkit";
import { addItemToArray, deleteItemFromArray, editItemFromArray } from "../../componentsHelpers/arrayHelper";

const buildingsSlice =  createSlice({
    name: 'buildings',
    initialState: {
        buildingsLoading: false,
        buildings: []
    },
    reducers: {
        buildingsLoading: (state)=>{
            state.buildingsLoading = !state.buildingsLoading
        },
        buildingsReceived: (state,action)=>{
            state.buildings = action.payload
            state.buildingsLoading = false
        },
        createdOrDeleteBuilding: (state,action) => {
            if (action.payload.building_removed){
                state.buildings = deleteItemFromArray({array: state.buildings, id: action.payload.id})
            } else {
                addItemToArray({array: state.buildings, item: action.payload})  
                state.buildingsLoading = false 
            }
        },
        editBuildingReceived: (state, action) => {
            state.buildings = editItemFromArray({array: state.buildings, item: action.payload})
        }
    }
})

export const {buildingsLoading, buildingsReceived, createdOrDeleteBuilding,editBuildingReceived} =  buildingsSlice.actions
export default  buildingsSlice.reducer