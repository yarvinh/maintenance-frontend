import { render as rtlRender,fireEvent, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import rootReducer from "../../../reducers/manageAllReducers";
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { Provider } from 'react-redux';
// import { server } from '../../../mocks/browser';
import { BrowserRouter} from 'react-router-dom';
import LogIn from '../../../components/users/LogIn';


const store = createStore(rootReducer, applyMiddleware(thunk))
// beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

const render = component => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)

describe("<Login/>",()=>{
    beforeEach(()=>{
        return  render(
            <BrowserRouter> <LogIn admin={true} /> </BrowserRouter>
        )
    })

    test('Should have a button when click change the type of login, personal or business',()=>{
        const loginTypeButton = screen.getByText('Login to business account')
        fireEvent.click(loginTypeButton) 
        expect(loginTypeButton.innerHTML).toBe("Login to your account")
        fireEvent.click(loginTypeButton) 
        expect(loginTypeButton.innerHTML).toBe('Login to business account')
    })

    test('Input Username Should exist and accept a value',()=>{
        const userNameInput = screen.getByLabelText('Username')
        fireEvent.change(userNameInput, {target: {value: "testingapp"}})
        expect(userNameInput.value).toBe('testingapp')
    })

    test('Input Password Should exist and accept a value',()=>{
        const passwordInput = screen.getByLabelText('Password')
        fireEvent.change(passwordInput, {target: {value: '123456'}})
        expect(passwordInput.value).toBe('123456')
    })

    test("Should submit username and password",async ()=>{
        const userNameInput = screen.getByLabelText('Username')
        fireEvent.change(userNameInput, {target: {value: "testingapp"}})
        const passwordInput = screen.getByLabelText('Password')
        fireEvent.change(passwordInput, {target: {value: '123456'}})
        const loginFormSubmitButton = screen.getByText("Login")
        fireEvent.click(loginFormSubmitButton)  

        await waitFor(() =>  {
            const welcome = screen.getByText("Welcome TESTING APP")
            // expect(welcome.innerHTML).toBe("Welcome TESTING APP")
        })
    })

    

})