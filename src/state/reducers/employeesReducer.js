import { createSlice} from "@reduxjs/toolkit";
import { addItemToArray, deleteItemFromArray } from "../../componentsHelpers/arrayHelper";

const employeesSlice =  createSlice({
    name: 'employees',
    initialState: {
        employeesLoading: false,
        employees: []
    },
    reducers: {
        employeesLoading: (state)=>{
            state.employeesLoading = !state.employeesLoading
        },
        employeesReceived: (state,action)=>{
            state.employees = action.payload
        },
        createdOrDeleteEmployee: (state,action) => {
            if (action.payload.employee_removed){
                deleteItemFromArray({array: state.employees, id: action.payload.id})
            } else {
                addItemToArray({array: state.employees, item: action.payload})  
                state.employeesLoading = false 
            }
        }  
    }
})

export const {employeesLoading, employeesReceived, createdOrDeleteEmployee} =  employeesSlice.actions
export default  employeesSlice.reducer