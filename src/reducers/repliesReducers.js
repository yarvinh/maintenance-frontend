// export const RepliesReducer = (state={replies: [],loading: false},action)=>{
//     switch(action.type) {
//       case 'LOADING_REPLIES':
//       return state = {
//         ...state,
//         replies: state.replies,
//         loading: true,    
//       }
//       case 'ADD_REPLIES':
//         return {
//            ...state,
//           replies: action.replies,
//           loading: false
//       } 
//     default:
//       return state;
//     }
// }
  
// export const ReplyReducer = (state = { reply: {}, loading: false }, action)=>{
//     switch(action.type) {
//       case 'LOADING_REPLY':
//       return state = {
//         ...state,
//         reply: state.reply,
//         loading: true,    
//       }
  
//       case 'ADD_REPLY':
//         return {
//            ...state,
//           reply: action.reply,
//           loading: false
//       } 
  
//     default:
//       return state;
//     }
// }