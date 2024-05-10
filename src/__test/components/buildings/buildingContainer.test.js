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

describe("<Login/>",()=>{
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

   test("Should take me to buildings when click link Building in menu bar",async()=>{
      const buildingLink = screen.getByText("Buildings")
      fireEvent.click(buildingLink)

   })

   test("should be able to create a building",()=>{
    screen.getByText("Create A Building")
      FillOutForm({address:  "111 west 119 st", superintendent: "Jose luis Martines", phone: "646-305-2787"})
      const submit = screen.getByText("Submit")
      fireEvent.click(submit)
   })
   
})