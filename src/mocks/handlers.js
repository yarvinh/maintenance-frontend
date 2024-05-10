
// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'
// import { isNullishCoalesce } from 'typescript'
 
export const handlers = [
  
  // http.get('http://localhost:3000/test/checklogin', (response) => {
  //   return HttpResponse.json(
  //     {
  //       is_login: true, 
  //       admin: true, 
  //       user: {
  //         name: 'GGC',
  //         username: 'ggc' ,
  //         email: 'ggc@gmail.com', 
  //         id: 1 
  //       }
      
  //     }
  //   )
  // }),

  http.post('http://localhost:3000/test/users', async (response) => {
  const user = {
    admin: true,
    created: true,
    errors_or_messages: {from: "verify_email" , errors: ['We send you an email with a verification code, please check your email.']},
    is_login: false,
    reload: false,
    token: "eyJhbGciOiJIUzI1NiJ9.eyJleHBpcmVzX2F0IjoiMjAyNC0wNC0yNCAwMzoxNzozMyBVVEMiLCJlbWFpbF9jb2RlIjoiZjQzYjRkIn0.cBdT56ZnYejFOtX7pLioGSUcXqElZRrq0uMQJaiszPw",
    verification_session: true, 
  }
    return HttpResponse.json(user)
  }),

  http.patch('http://localhost:3000/test/verify_email', async ({request}) => {
    const user = {
      admin: true,
      is_login: true,
      token: {
        secret_key: "8bcc2dcc",
        token: "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoidXNlcl8zMSJ9.uA2aigVvEvmHDyMByXyeQPfAOI1olnCVG1HVmp_773c"
      },
       updated: true,
       user: {
        admin: true,
        email: "testingapp@gmail.com",
        id: 1,
        name: "TESTING APP",
        username: "testingapp",
        valid_email: true
       },
       verification_session: false
    }
      return HttpResponse.json(user)
    }),

    http.post('http://localhost:3000/test/business_login', async ({request}) => {
      const loginInf = await request.json()
      const user  =  {
        is_login: true, 
        admin: true, 
        user: {
          name: "TESTING APP",
          username: 'testingapp',
          email: 'ggc@gmail.com', 
          id: 1 
        }
    }
    
      const error =  {is_login: false,errors_or_messages: {from: "login", errors: ["Incorrect username or password"]} }
  
      return HttpResponse.json(
       loginInf.user.password === "12345@" && loginInf.user.username === "testapp" ? user : error
      )

    }),

    http.post('http://localhost:3000/test/buildings', async ({request}) => {
      const requestInf = await request.json()
      const building = {
        address: "114 Park ave",
        id: 1,
        phone_number: "646-567-5678",
        super_name: "Humberto Martinez",
        user_id: 1
      }
      if (requestInf.building.super_name?.trim() === ""){
        return HttpResponse.json({is_login: true ,errors_or_messages: {from: "login", errors: ["Super name can't be blank"]} })
      } else if (requestInf.building.address?.trim() === ""){
        return HttpResponse.json({is_login: true ,errors_or_messages: {from: "login", errors: ["Address can't be blank"]} })
      }else if (requestInf.building.phone_number?.trim() === ""){
        return HttpResponse.json({is_login: true ,errors_or_messages: {from: "login", errors: ["Phone number can't be blank"]} })
      } else {
        return HttpResponse.json(building)
      }
  
    })
]