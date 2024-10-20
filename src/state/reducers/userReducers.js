import { createSlice} from "@reduxjs/toolkit";

const userSlice =  createSlice({
    name: 'user',
    initialState: {
        userLoading: false,
        user: {
            is_login: false,
            admin: false, 
            user: {id: 0}
        }
    },
    reducers: {
        userLoading: (state)=>{
            state.userLoading = !state.userLoading
        },
        userReceived: (state,action)=>{
            state.user = action.payload
            state.userLoading = false
        }
    }
})

export const {userLoading, userReceived} =  userSlice.actions
export default  userSlice.reducer