
// src/mocks/handlers.js
import { http, HttpResponse } from 'msw'
 
export const handlers = [
  http.get('http://localhost:3000/test/checklogin', () => {
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
]