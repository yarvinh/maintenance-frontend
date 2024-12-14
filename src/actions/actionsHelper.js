
export const baseUrl = () => { 
   return  process.env.NODE_ENV === "development" ? 'http://localhost:3000'
   : process.env.NODE_ENV === 'test' ? 'http://localhost:3000'
   : 'https://workorders.herokuapp.com'  
    
}

export  const wsurl = ()=>{
   return  process.env.NODE_ENV === "development" ? "ws://localhost:3000/cable" : "wss://workorders.herokuapp.com/cable"
}

