import { workOrderFilter } from "./workOrdersActions"

export const baseUrl = () => { 
    if ( process.env.NODE_ENV === "development" ) { 
       return 'http://localhost:3000'
    } else if(process.env.NODE_ENV === 'test') {
      return 'http://localhost:3000'
    }else{
       return 'https://workorders.herokuapp.com'  
    }
}

export  const wsurl = ()=>{
   if ( process.env.NODE_ENV === "development") { 
      return "ws://localhost:3000/cable"
   } else {
      return "wss://workorders.herokuapp.com/cable" 
   }
}



export const paths = ()=>{
   return {
      checkLoginPath: '/checklogin',
      usersPath: '/users',
      buildingsPath: '/buildings',
      commentsPath: "/comments",
      workOrdersPath: "/work_orders",
      searchBuildingsPath: '/search/buildings/',
      employeesPath: "/employees",
      // galleryPath: '/gallery',
   }

}