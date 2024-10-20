import { createSlice} from "@reduxjs/toolkit";

const accountSlice =  createSlice({
    name: 'account',
    initialState: {
        account: {}
    },
    reducers: {
        accountReceived: (state,action)=>{
            state.account = action.payload
        }
    }
})

export const {accountReceived} =  accountSlice.actions
export default  accountSlice.reducer