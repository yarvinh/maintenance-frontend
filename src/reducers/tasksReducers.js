export const TasksReducer = (state = {tasks: [],loading: true},action)=>{
    switch(action.type) {
      case 'LOADING_TASKS':
      return state = {
        ...state,
        tasks: state.tasks,
        loading: true,    
      }
      case 'ADD_TASKS':
        return {
           ...state,
          tasks: action.tasks,
          loading: false
      } 
    default:
      return state;
    }
}
  
export const taskReducer = (state = { reply: {}, loading: true }, action)=>{
    switch(action.type) {
      case 'LOADING_TASK':
      return state = {
        ...state,
        task: state.task,
        loading: true,    
      }
  
      case 'ADD_TASK':
        return {
           ...state,
          task: action.task,
          loading: false
      } 
  
    default:
      return state;
    }
}