import { createSlice} from "@reduxjs/toolkit";

const employeeSlice =  createSlice({
    name: 'employee',
    initialState: {
        employeeLoading: false,
        employee: {}
    },
    reducers: {
        employeeLoading: (state)=>{
            state.employeeLoading = !state.employeeLoading
        },
        employeeReceived: (state,action)=>{
            state.employee = action.payload
        }
    }
})

export const {employeeLoading, employeeReceived} =  employeeSlice.actions
export default  employeeSlice.reducer