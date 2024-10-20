import { createSlice } from "@reduxjs/toolkit";

const displayElementSlice = createSlice({
    name: "isDisplay",
    initialState: {
        isDisplay: false,
        className: "profile-inf",
        formDisplay: {
            buttonClass: "display_accordion", 
            formClass: 'hide_elements', 
            id: "none"
        }
    },
    reducers: {
        displayElementReceived: (state,action) => {
          state.isDisplay = !state.isDisplay 
          state.className = action.payload
        },

        displayFormReceived: (state,action) => {
            state.formDisplay = action.payload
        }
    }
})

export const {displayElementReceived,displayFormReceived} = displayElementSlice.actions
export default displayElementSlice.reducer



