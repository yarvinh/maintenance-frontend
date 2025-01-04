import {fireEvent, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { server } from '../../../mocks/browser';
import App from '../../../App';
import { render } from '../../helpers/reduxStore';
import store from '../../../state/store';
import { userReceived } from '../../../state/reducers/userReducers';
import { setLoginToken } from '../../../componentsHelpers/token';
import { wait } from '@testing-library/user-event/dist/utils';

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
    setLoginToken({token: "eyJhbGciOiJIUzI1NiJ9.eyJleHBpcmVzX2F0IjoiMjAyNC0wNC0yNCAwMzoxNzozMyBVVEMiLCJlbWFpbF9jb2RlIjoiZjQzYjRkIn0.cBdT56ZnYejFOtX7pLioGSUcXqElZRrq0uMQJaiszPw", secret_key: "bvguvuv"})
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
      await waitFor(() => {
        expect( screen.getByText("Create A Building")).toBeInTheDocument()
      })
   })

   test("Should display an error message when submit button is press, if inputs address, super_name and phone_number is empty",async()=>{
        FillOutForm({address:  "", superintendent: " ", phone: "  "})
        await waitFor(() => {
          expect(screen.getByText("Super name can't be blank")).toBeInTheDocument()
          expect(screen.getByText("Phone number can't be blank")).toBeInTheDocument()
          expect(screen.getByText("Address can't be blank")).toBeInTheDocument()
        })
   })

   test("Should be able to create buildings",async () => {
      FillOutForm({address:  "111 west 119 st", superintendent: "Jose luis Martines", phone: "646-305-2787"})  

      await waitFor(()=>{
        expect(screen.getByText("Jose luis Martines").innerHTML).toBeDefined()
        expect(screen.getByText("111 west 119 st").innerHTML).toBeDefined()
        expect(screen.getByText("646-305-2787").innerHTML).toBeDefined()
      })
      FillOutForm({address:  "112 west 119 st", superintendent: "Erick Arnold", phone: "646-307-2787"})
      await waitFor(()=>{
          expect(store.getState().buildings.buildings?.length).toBe(2)
      })
   })

   test("Should be able to delete building",async ()=>{
      confirmSpy = jest.spyOn(window, 'confirm');
      confirmSpy.mockImplementation(jest.fn(() => true));
      const deleteBuildings = screen.getByRole("delete-building-1")
      expect(deleteBuildings).toBeDefined()
      fireEvent.click(deleteBuildings)

      await waitFor(()=>{
        expect(screen.queryByText("Jose luis Martines")).not.toBeInTheDocument()
        const {buildings} = store.getState().buildings
        expect(buildings.length === 1).toBe(true)
      })
   })

    test("Should display the address with a link to building details, superintendent name and superintendent phone number", () => {
       const address = screen.getByText("112 west 119 st")
       expect(address).toBeInTheDocument()
       expect(address.closest('a')).toHaveAttribute('href', "/buildings/2")
       expect(screen.getByText("Erick Arnold")).toBeInTheDocument()
       expect(screen.getByText("646-307-2787")).toBeInTheDocument()
    })

    test("Should be able to click on address and navigate to building details",async ()=>{
        const address = screen.getByText("112 west 119 st")
        fireEvent.click(address)
        await waitFor(()=>{
            expect(location.pathname).toBe("/buildings/2")
            // screen.getByText("Edit Building")
        })

    })

})