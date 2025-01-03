import {fireEvent, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { server } from '../../../mocks/browser';
import App from '../../../App';
import { render } from '../../helpers/reduxStore';
import store from '../../../state/store';
import { userReceived } from '../../../state/reducers/userReducers';

beforeAll(() => {
    server.listen({ onUnhandledRequest: "bypass" })
    store.dispatch(
        userReceived({
            is_login: true, 
            admin: true, 
            user: {
            name: 'GGC',
            username: 'ggc' ,
            email: 'ggc@gmail.com', 
            id: 1 
            }
        })
    )
})
afterEach(() => {
    server.resetHandlers()
})

afterAll(() => server.close())

describe("<BuildingsContainer/>",()=>{
    beforeEach(()=>{
        return  render(
          <App/>
        )
    })

    const FillOutForm = ( {address, phone, superintendent } )=>{
        const addressIn = screen.getByLabelText("Address")
        const superintendentIn = screen.getByLabelText("Superintendent")
        const phoneIn = screen.getByLabelText("Phone")
        fireEvent.change(addressIn, {target: {value: address}})
        fireEvent.change(superintendentIn , {target: {value: superintendent}})
        fireEvent.change(phoneIn, {target: {value: phone}})
        const submitButton = screen.getByText("Submit")
        fireEvent.click(submitButton)  
    }

   test("Should take me to buildings when click link Buildings in menu bar", async ()=>{
      const buildingLink = screen.getByText("Buildings")
      expect(buildingLink).toBeDefined()
      fireEvent.click(buildingLink)
   })

   test("Should display an error message when submit button is press, if inputs address, super_name and phone_number is empty",async()=>{
        FillOutForm({address:  "", superintendent: " ", phone: "  "})
        await waitFor(()=>{
          expect(screen.getByText("Super name can't be blank")).toBeInTheDocument()
          expect(screen.getByText("Phone number can't be blank")).toBeInTheDocument()
          expect(screen.getByText("Address can't be blank")).toBeInTheDocument()
        })
   })

   test("Should be able to create a building",async()=>{
      FillOutForm({address:  "111 west 119 st", superintendent: "Jose luis Martines", phone: "646-305-2787"})
      await waitFor(()=>{
        const building = store.getState()
        console.log(building)
      })
    
      //   const submit1 = screen.getByText("Submit")
    //   fireEvent.click(submit1)

    //   await waitFor(()=>{
    //     expect(screen.getByText("Jose luis Martines").innerHTML).toBeDefined()
    //     expect(screen.getByText("111 west 119 st").innerHTML).toBeDefined()
    //     expect(screen.getByText("646-305-2787").innerHTML).toBeDefined()
    //   })

    //   await waitFor(()=>{
    //     FillOutForm({address:  "112 west 119 st", superintendent: "Erick Arnold", phone: "646-307-2787"})
    //     const submit2 = screen.getByText("Submit")
    //     fireEvent.click(submit2)
    //   })
   })
   
//    test("Should be able to delete building",()=>{
//       confirmSpy = jest.spyOn(window, 'confirm');
//       confirmSpy.mockImplementation(jest.fn(() => true));
//       const deleteBuildings = screen.getAllByRole("delete-building")
//       expect(deleteBuildings[0]).toBeDefined()
//       fireEvent.click(deleteBuildings[0])
//    })
})