
// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'
import { isNullishCoalesce } from 'typescript'
 
export const handlers = [
  
  http.get('http://localhost:3000/test/checklogin', (response) => {
    return HttpResponse.json(
      {
        is_login: true, 
        admin: true, 
        user: {
          name: 'GGC',
          username: 'ggc' ,
          email: 'ggc@gmail.com', 
          id: 1 
        }
      
      }
    )
  }),

  http.post('http://localhost:3000/test/users', async (response) => {
  const user = {
    admin: true,
    created: true,
    errors_or_messages: {errors: ['We send you an email with a verification code, please check your email.']},
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
]