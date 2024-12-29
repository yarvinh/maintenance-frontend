import { ERRORS } from "../componentsHelpers/errors"
import { errorsOrMessagesReceived } from "../state/reducers/errorsOrMessagesReducer"

export const baseUrl = () => { 
   return  process.env.NODE_ENV === "development" ? 'http://localhost:3000'
   : process.env.NODE_ENV === 'test' ? 'http://localhost:3000'
   : 'https://workorders.herokuapp.com'  
    
}

export  const wsurl = ()=>{
   return  process.env.NODE_ENV === "development" ? "ws://localhost:3000/cable" : "wss://workorders.herokuapp.com/cable"
}

export const serverErrors = async ({dispatch,message}) =>{
   if(message.includes("errors_or_messages")){
      const data = JSON.parse(message)
      dispatch(errorsOrMessagesReceived(data.errors_or_messages))
    } else {
      dispatch(errorsOrMessagesReceived(ERRORS))
    }
}

