import { createSlice } from "@reduxjs/toolkit";
import { addItemToArray, deleteItemFromArray, findIndexById } from "../../componentsHelpers/arrayHelper";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
       commentsLoading: false,
       comments: [],
       repliesLoading: false,
       reply: {}
    },
    reducers: {
        commentsLoading: ((state)=>{
           state.commentsLoading = !state.commentsLoading
        }),
        commentsReceived: (state,action) => {
            state.comments = action.payload
            state.commentsLoading = false
        },
        moreCommentsReceived: (state,action) => {
            state.comments = state.comments.concat(action.payload)
            state.commentsLoading = false 
        },

        commentReceived: (state,action) => {
            if (action.payload.comment_removed){
                state.comments = deleteItemFromArray({array: state.comments, id: action.payload.id})
            }else{
                addItemToArray({array: state.comments, item: action.payload})  
                state.commentsLoading = false 
            }
        },

        commentLikesReceived: (state,action)=>{ 
            if (action.payload?.like_removed) {
                let commentIndex = findIndexById({array: state.comments, id: action.payload.comment_id})
                state.comments[commentIndex].likes = deleteItemFromArray({array: state.comments[commentIndex].likes, id: action.payload.like_id})
            }else{
                let commentIndex = findIndexById({array: state.comments, id: action.payload.comment_id})
                addItemToArray({array: state.comments[commentIndex].likes, item: action.payload})  
            }  
        },

        repliesRecieved: (state,action) => {
            if (action.payload.length > 0){
              const commentId = action.payload[0].comment_id
              let commentIndex = findIndexById({array: state.comments, id: commentId})
              state.comments[commentIndex].replies = action.payload 
            } else {

            }
            state.repliesLoading = false
        },

        repliesLoading: (state)=>{
            state.repliesLoading = !state.repliesLoading
        }, 

        replyReceived: (state,action) => {
            let commentIndex = findIndexById({array: state.comments, id: action.payload.comment_id})
            if(action.payload.reply_removed){
              state.comments[commentIndex].replies_total = state.comments[commentIndex].replies_total - 1
              state.comments[commentIndex].replies = deleteItemFromArray({array: state.comments[commentIndex].replies, id: action.payload.reply_id})
            }else if (action.payload.id){
              state.reply = action.payload
              if(!state.comments[commentIndex].replies)
                state.comments[commentIndex].replies = []
              state.comments[commentIndex].replies_total = state.comments[commentIndex].replies_total + 1
              addItemToArray({array: state.comments[commentIndex].replies, item: action.payload} )
            }
        },
        
        replyLikesReceived: (state, action)=>{
            if(action.payload.like_removed){
                let commentIndex = findIndexById({array: state.comments, id: action.payload?.comment_id})
                const replyIndex = findIndexById({array: state.comments[commentIndex].replies, id: action.payload?.reply_id})
                state.comments[commentIndex].replies[replyIndex].likes = deleteItemFromArray({array: state.comments[commentIndex].replies[replyIndex].likes, id: action.payload.like_id})
            }else if (action.payload?.id){
                let commentIndex = findIndexById({array: state.comments, id: action.payload?.reply.comment_id})
                const replyIndex = findIndexById({array: state.comments[commentIndex].replies, id: action.payload.reply_id})
                addItemToArray({array: state.comments[commentIndex].replies[replyIndex].likes, item: action.payload} )
            }
        },

        moreRepliesReceived: (state,action)=>{
            if (action.payload.length > 0 ){
                const commentId = action.payload[0].comment_id
                let commentIndex = findIndexById({array: state.comments, id: commentId})
                state.comments[commentIndex].replies = state.comments[commentIndex].replies.concat(action.payload)
            }
            state.repliesLoading = false
        }
    }
})

export const {
    commentsReceived,
    commentReceived,
    commentsLoading,
    commentLikesReceived,
    repliesRecieved,
    repliesLoading,
    replyReceived,
    replyLikesReceived,
    moreRepliesReceived,
    moreCommentsReceived,
} = commentsSlice.actions

export default commentsSlice.reducer