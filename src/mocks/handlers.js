
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

  http.post('http://localhost:3000/test/users', async ({request}) => {
    const payload = await request.json()
    const {name,email,username,password,password_confirmation} = payload.user
    const format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    const errors = []
    name.trim()?.length === 0 && errors.push("Name can't be blank")
    email.trim()?.length  === 0 && errors.push("Email can't be blank")
    username.trim()?.length === 0 && errors.push("Username can't be blank")
    password.trim()?.length === 0 && errors.push("Password can't be blank")
    password.length < 6 && errors.push("Password is too short (minimum is 6 characters)")
    !format.test(password) && errors.push("Password is invalid")
    password !== password_confirmation && errors.push("Password confirmation doesn't match Password")

    const user = {
      admin: true,
      created: true,
      errors_or_messages: {from: 'verify_email' , msg: ['We send you an email with a verification code, please check your email.']},
      is_login: false,
      reload: false,
      token: "eyJhbGciOiJIUzI1NiJ9.eyJleHBpcmVzX2F0IjoiMjAyNC0wNC0yNCAwMzoxNzozMyBVVEMiLCJlbWFpbF9jb2RlIjoiZjQzYjRkIn0.cBdT56ZnYejFOtX7pLioGSUcXqElZRrq0uMQJaiszPw",
      verification_session: true, 
    }

    const userWithError = {
      admin: true,
      created: false,
      errors_or_messages: {from: "create_user" , errors: errors},
      is_login: false,
      reload: false,
      token: "eyJhbGciOiJIUzI1NiJ9.eyJleHBpcmVzX2F0IjoiMjAyNC0wNC0yNCAwMzoxNzozMyBVVEMiLCJlbWFpbF9jb2RlIjoiZjQzYjRkIn0.cBdT56ZnYejFOtX7pLioGSUcXqElZRrq0uMQJaiszPw",
      verification_session: true, 
    }

    if(errors.length > 0)
      return HttpResponse.json(userWithError, {status: 422, statusText: 'Invalid inf' })
    else
      return HttpResponse.json(user)

  }),

  http.patch('http://localhost:3000/test/verify_email', async ({request}) => {
    const payload = await request.json()
    const user = {
      admin: true,
      errors_or_messages: {from: "verify_email", msg: ["congratulation, your email was validated"]},
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
        valid_email: true
       },
       verification_session: false
    }

    const userWithError = {
      is_login: false, 
      updated: false, 
      reload: false, 
      verification_session: true, 
      errors_or_messages: {from: "verify_email",  errors: ["Wrong code, please try again."]}
    }

  
      if(payload.user.security_code === "123456"){
        return HttpResponse.json(user)
       }else{
        return HttpResponse.json(userWithError, {status: 422, statusText: 'Invalid inf' })
      }
    }),

    http.patch('http://localhost:3000/test/request_security_code', async ({request}) => { 
    
      const payload = await request.json()
      console.log(payload)

      const response = {
        is_login: false,  
        valid_email: false, 
        reload: false, 
        verification_session: true, 
        errors_or_messages: {
          from: "verify_email", 
          msg: ['We sent a new code to your email.']
        } 
      }

      return HttpResponse.json(response)

   

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
        address: requestInf.building.address,
        id: requestInf.building.address === "111 west 119 st" ? 1 : 2,
        phone_number: requestInf.building.phone_number,
        super_name: requestInf.building.super_name,
        user_id: 1
      }

      const errors = []
      if (requestInf.building.super_name?.trim() === "" )
        errors.push("Super name can't be blank")
       
      if (requestInf.building.address?.trim() === "")
        errors.push("Address can't be blank")

      if (requestInf.building.phone_number?.trim() === "")
        errors.push("Phone number can't be blank")
      
      if(errors.length > 0) 
        return HttpResponse.json({is_login: true ,errors_or_messages: {from: "create_building", errors: errors} })
      else
        return HttpResponse.json(building)
    })
]