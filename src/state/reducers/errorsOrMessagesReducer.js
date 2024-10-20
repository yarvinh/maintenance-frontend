import { createSlice} from "@reduxjs/toolkit";

const errorsOrMessagesSlice =  createSlice({
    name: "errors_or_msgs",
    initialState: {
        errorsOrMessages: { 
            from: 'none',
            errors: []
        }
    },
    reducers: {
        errorsOrMessagesReceived: (state,action)=>{
            state.errorsOrMessages = action.payload
        }
    }
})

export const {errorsOrMessagesReceived} =  errorsOrMessagesSlice.actions
export default  errorsOrMessagesSlice.reducer