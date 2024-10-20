import { createSlice} from "@reduxjs/toolkit";

const accordionSlice =  createSlice({
    name: 'accordion',
    initialState: {
            accordion: {
            accordion: 'display_accordion',
            barDisplay: "hide-bar" ,
            barAccordion:'display-nav-bar', 
            display: 'hide_elements' ,
            elementId: ''
        }, 
        loading: false   
    },
    reducers: {
        accordionReceived: (state,action)=>{
            state.accordion = action.payload
        }
    }
})

export const {accordionReceived} =  accordionSlice.actions
export default  accordionSlice.reducer