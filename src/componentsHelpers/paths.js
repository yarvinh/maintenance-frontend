export const paths = () => {
    const testPaths  = {
       checkLoginPath: '/test/checklogin',
       usersPath: '/test/users',
       buildingsPath: '/test/buildings',
       commentsPath: "/test/comments",
       workOrdersPath: "/test/work_orders",
       searchBuildingsPath: '/test/search/buildings/',
       employeesPath: "/test/employees",
       verifyEmail: "/test/verify_email",
       login: '/test/login',
       requestSecurityCode: '/test/request_security_code'
    }  
    
   const paths =  {
       checkLoginPath: '/checklogin' ,
       usersPath: '/users',
       buildingsPath: '/buildings',
       commentsPath: "/comments",
       workOrdersPath: "/work_orders",
       searchBuildingsPath: '/search/buildings/',
       employeesPath: "/employees",
       verifyEmail: "/verify_email",
       login: "/login",
       requestSecurityCode: '/request_security_code'
    }
    return process.env.NODE_ENV === 'test' ? testPaths : paths
 
 }
