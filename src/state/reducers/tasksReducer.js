import { createSlice} from "@reduxjs/toolkit";
import { addItemToArray, deleteItemFromArray, editItemFromArray } from "../../componentsHelpers/arrayHelper";

const tasksSlice =  createSlice({
    name: 'tasks',
    initialState: {
        tasksLoading: false,
        tasks: []
    },
    reducers: {
        tasksLoading: (state)=>{
            state.tasksLoading = !state.tasksLoading
        },
        tasksReceived: (state,action)=>{
            state.tasks = action.payload
        },
        createdOrDeleteTasks: (state,action) => {
            if (action.payload.task_removed){
                deleteItemFromArray({array: state.tasks, id: action.payload.id})
            } else {
                addItemToArray({array: state.tasks, item: action.payload})  
                state.tasksLoading = false 
            }
        },
        editTaskReceived: (state, action) => {
            console.log(action.payload)
            editItemFromArray({array: state.tasks, item: action.payload})
        }
    }
})

export const {tasksLoading, tasksReceived, createdOrDeleteTasks, editTaskReceived} =  tasksSlice.actions
export default tasksSlice.reducer