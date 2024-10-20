import { createSlice } from "@reduxjs/toolkit";

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
        }
    }
})

export const {unitLoading, unitReceived} = unitSlice.actions
export default unitSlice.reducer