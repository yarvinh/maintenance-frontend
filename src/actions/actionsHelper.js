
export const baseUrl = () => { 
   return  process.env.NODE_ENV === "development" ? 'http://localhost:3000'
   : process.env.NODE_ENV === 'test' ? 'http://localhost:3000'
   : 'https://workorders.herokuapp.com'  
    
}

export  const wsurl = ()=>{
   return  process.env.NODE_ENV === "development" ? "ws://localhost:3000/cable" : "wss://workorders.herokuapp.com/cable"
}

export const paths = (business = false) => {
   const testPaths  = {
      checkLoginPath: '/test/checklogin',
      usersPath: '/test/users',
      buildingsPath: '/test/buildings',
      commentsPath: "/test/comments",
      workOrdersPath: "/test/work_orders",
      searchBuildingsPath: '/test/search/buildings/',
      employeesPath: "/test/employees",
      verifyEmail: "/test/verify_email",
      login: '/test/business_login'
   }  

  const paths =  {
      checkLoginPath: '/checklogin',
      usersPath: '/users',
      buildingsPath: '/buildings',
      commentsPath: "/comments",
      workOrdersPath: "/work_orders",
      searchBuildingsPath: '/search/buildings/',
      employeesPath: "/employees",
      verifyEmail: "/verify_email",
      login: business ? '/business_login' : "/login"
   }
   return process.env.NODE_ENV === 'test' ? testPaths : paths

}