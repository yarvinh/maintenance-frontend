import { createSlice} from "@reduxjs/toolkit";

const violationsSlice =  createSlice({
    name: 'violations',
    initialState: {
        violationsLoading: false,
        violations: []
    },
    reducers: {
        violationsLoading: (state)=>{
            state.violationsLoading = !state.violationsLoading
        },
        violationsReceived: (state,action)=>{
            state.violations = action.payload
            state.violationsLoading = false
        }
    }
})

export const {violationsLoading, violationsReceived} =  violationsSlice.actions
export default  violationsSlice.reducer