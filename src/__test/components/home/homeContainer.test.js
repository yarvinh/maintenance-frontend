import { render as rtlRender,fireEvent, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import rootReducer from "../../../reducers/manageAllReducers";
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { Provider } from 'react-redux';
import { server } from '../../../mocks/browser';

import {BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import HomeContainer from '../../../containers/HomeContainer';
const store = createStore(rootReducer, applyMiddleware(thunk))
beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const render = component => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)

describe("<HomeContainer/>",()=>{
    beforeEach(()=>{
        return  render(
            < MemoryRouter >
                <Routes>
                  <Route path="/" element={<HomeContainer/>}/>
                </Routes>
             </ MemoryRouter>
        )
    })

    const loginSubmitForm = ({password, username}) => {
        const userNameInput = screen.getByLabelText('Username')
        fireEvent.change(userNameInput, {target: {value: username}})
        const passwordInput = screen.getByLabelText('Password')
        fireEvent.change(passwordInput, {target: {value: password}})
        const loginFormSubmitButton = screen.getByText("Login")
        fireEvent.click(loginFormSubmitButton)  
    }
    



    test('Should have a button when click change the type of login, personal or business',()=>{
        screen.getByText('Create a personal account')
        const loginTypeButton = screen.getByText("Login to business account")
        fireEvent.click(loginTypeButton) 
        expect(loginTypeButton.innerHTML).toBe('Login to business account')
        // expect(loginTypeButton.innerHTML).toBe("Login iuhuto personal account")
        // fireEvent.click(loginTypeButton) 
        // expect(loginTypeButton.innerHTML).toBe('Login to business account')
    })




})