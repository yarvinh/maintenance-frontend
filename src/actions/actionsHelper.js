
export const baseUrl = () => { 
   return  process.env.NODE_ENV === "development" ? 'http://localhost:3000'
   : process.env.NODE_ENV === 'test' ? 'http://localhost:3000'
   : 'https://workorders.herokuapp.com'  
    
}

export  const wsurl = ()=>{
   return  process.env.NODE_ENV === "development" ? "ws://localhost:3000/cable" : "wss://workorders.herokuapp.com/cable" 
}

export const paths = ()=>{
   const testPaths  = {
      checkLoginPath: '/test/checklogin',
      usersPath: '/test/users',
      buildingsPath: '/test/buildings',
      commentsPath: "/test/comments",
      workOrdersPath: "/test/work_orders",
      searchBuildingsPath: '/test/search/buildings/',
      employeesPath: "/test/employees"
   }  
  const paths =  {
      checkLoginPath: '/checklogin',
      usersPath: '/users',
      buildingsPath: '/buildings',
      commentsPath: "/comments",
      workOrdersPath: "/work_orders",
      searchBuildingsPath: '/search/buildings/',
      employeesPath: "/employees"
   }
   return process.env.NODE_ENV === 'test' ? testPaths : paths

}