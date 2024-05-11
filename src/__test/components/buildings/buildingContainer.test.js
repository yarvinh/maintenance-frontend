import { render as rtlRender,fireEvent, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import rootReducer from "../../../reducers/manageAllReducers";
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { Provider } from 'react-redux';
import { server } from '../../../mocks/browser';
import App from '../../../App';

const store = createStore(rootReducer, applyMiddleware(thunk))
beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const render = component => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)

describe("<BuildingsContainer/>",()=>{
    beforeEach(()=>{
        return  render(
          <App/>
        )
    })

    // let confirmSpy;
    // beforeAll(() => {
    //     confirmSpy = jest.spyOn(window, 'confirm');
    //     confirmSpy.mockImplementation(jest.fn(() => true));
    // });
    // afterAll(() => confirmSpy.mockRestore());

    const FillOutForm = ( {address, phone, superintendent } )=>{
        const addressIn = screen.getByLabelText("Address")
        const superintendentIn = screen.getByLabelText("Superintendent")
        const phoneIn = screen.getByLabelText("Phone")

        fireEvent.change(addressIn, {target: {value: address}})
        fireEvent.change(superintendentIn , {target: {value: superintendent}})
        fireEvent.change(phoneIn, {target: {value: phone}})
    }

    const loginSubmitForm = ({password, username}) => {
        const userNameInput = screen.getByLabelText('Username')
        fireEvent.change(userNameInput, {target: {value: username}})
        const passwordInput = screen.getByLabelText('Password')
        fireEvent.change(passwordInput, {target: {value: password}})
        const loginFormSubmitButton = screen.getByText("Login")
        fireEvent.click(loginFormSubmitButton)    
    }
 
   test("should login", async ()=>{
        loginSubmitForm({password: "12345@", username: "testapp"})
        await waitFor(()=>{
          screen.getByText("Sign Out")
        })
   })

   test("Should take me to buildings when click link Buildings in menu bar",async()=>{
      const buildingLink = screen.getByText("Buildings")
      expect(buildingLink).toBeDefined()
      fireEvent.click(buildingLink)

   })

   test("Should display an error message when submit button is press, if inputs address, super_name and phone_number is empty",async()=>{
        FillOutForm({address:  "", superintendent: " ", phone: "  "})
        const submit = screen.getByText("Submit")
        fireEvent.click(submit)
        await waitFor(()=>{
          screen.getByText("Super name can't be blank")
          screen.getByText("Phone number can't be blank")
          screen.getByText("Address can't be blank")
        })
   })

   test("Should be able to create a building",async()=>{
      screen.getByText("Create A Building")
      FillOutForm({address:  "111 west 119 st", superintendent: "Jose luis Martines", phone: "646-305-2787"})
      const submit1 = screen.getByText("Submit")
      fireEvent.click(submit1)

      await waitFor(()=>{
        expect(screen.getByText("Jose luis Martines").innerHTML).toBeDefined()
        expect(screen.getByText("111 west 119 st").innerHTML).toBeDefined()
        expect(screen.getByText("646-305-2787").innerHTML).toBeDefined()
      })

      await waitFor(()=>{
        FillOutForm({address:  "112 west 119 st", superintendent: "Erick Arnold", phone: "646-307-2787"})
        const submit2 = screen.getByText("Submit")
        fireEvent.click(submit2)
      })

   })
   
   test("Should be able to delete building",()=>{
      confirmSpy = jest.spyOn(window, 'confirm');
      confirmSpy.mockImplementation(jest.fn(() => true));
      const deleteBuildings = screen.getAllByRole("delete-building")
      expect(deleteBuildings[0]).toBeDefined()
      fireEvent.click(deleteBuildings[0])
   })
})