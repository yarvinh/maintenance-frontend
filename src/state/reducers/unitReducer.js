import { createSlice } from "@reduxjs/toolkit";
import { addItemToArray, deleteItemFromArray, editItemFromArray } from "../../componentsHelpers/arrayHelper";

const unitSlice = createSlice({
    name: "units",
    initialState: {
        unitLoading: false,
        unit: {}
    },
    reducers: {
        unitLoading: (state) => {
            state.unitLoading = !state.unitLoading
        },
        unitReceived: (state,action)=>{
            state.unit = action.payload
        },
        createdOrDeleteTenant: (state,action) => {
            if (action.payload.tenant_removed){
                state.unit.tenants = deleteItemFromArray({array: state.unit?.tenants, id: action.payload.id})
            } else {
                addItemToArray({array: state.unit?.tenants, item: action.payload})  
                state.unitLoading = false 
            }
        },
        editTenantReceived: (state, action) => {
            state.unit.tenants = editItemFromArray({array: state.unit.tenants, item: action.payload})
        }
    }
})

export const {unitLoading, unitReceived, createdOrDeleteTenant,editTenantReceived} = unitSlice.actions
export default unitSlice.reducer