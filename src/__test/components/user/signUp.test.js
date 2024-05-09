
import { render as rtlRender,fireEvent, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import rootReducer from "../../../reducers/manageAllReducers";
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { Provider } from 'react-redux';
import { server } from '../../../mocks/browser';
// import SignUp from '../../../components/users/SignUp';
// import { BrowserRouter} from 'react-router-dom';
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

describe("<SignUp/>",()=>{
    beforeEach(()=>{
        return  render(
            <App/>
            // <BrowserRouter><SignUp/></BrowserRouter>
        )
    })

    test("Should be able to click on Signup",async()=>{
        const signUpLink = screen.getByText("Sign up")
        fireEvent.click(signUpLink)
    })

    const signUp = ()=>{
        const input1 = screen.getByLabelText('Name:')
        fireEvent.change(input1, {target: {value: 'Valente Hernandez'}})
        const input2 = screen.getByLabelText('Email:')
        fireEvent.change(input2, {target: {value: 'valente@gmail.com'}})
        const input3 = screen.getByLabelText('Username:')
        fireEvent.change(input3, {target: {value: 'valente'}})
        const input4 = screen.getByLabelText('Password:')
        fireEvent.change(input4, {target: {value: '123456'}})
        const input5 = screen.getByLabelText('Confirm password:')
        fireEvent.change(input5, {target: {value: '123456'}})
        const button = screen.getByText('Submit')
        fireEvent.click(button)
    }

    test('Input Name Should exist and accept a value',()=>{
        const input1 = screen.getByLabelText('Name:')
        fireEvent.change(input1, {target: {value: "TESTING APP"}})
        expect(input1.value).toBe("TESTING APP")
    })

    test('Input Email Should exist and accept a value',()=>{
        const input2 = screen.getByLabelText('Email:')
        fireEvent.change(input2, {target: {value: 'testingapp@gmail.com'}})
        expect(input2.value).toBe('testingapp@gmail.com')
    })

    test('Input Username Should exist and accept a value',()=>{
        const input3 = screen.getByLabelText('Username:')
        fireEvent.change(input3, {target: {value: "testingapp"}})
        expect(input3.value).toBe('testingapp')
    })

    test('Input Password Should exist and accept a value',()=>{
        const input4 = screen.getByLabelText('Password:')
        fireEvent.change(input4, {target: {value: '123456'}})
        expect(input4.value).toBe('123456')
    })

    test('Input Confirm password Should exist and accept a value',()=>{
        const input5 = screen.getByLabelText('Confirm password:')
        fireEvent.change(input5, {target: {value: '123456'}})
        expect(input5.value).toBe('123456')
    })

    test('Should render SignUp in email verification mode, create a new user and confirm email.',async ()=>{
        signUp()
        await waitFor(() =>  {
            const securityCodeInput = screen.getByLabelText('Enter security code:')
            const securityCodeFormButton = screen.getByText('Submit')
            screen.getByText('We send you an email with a verification code, please check your email.')
            screen.getByText("Didn't receive the code?")
            fireEvent.change(securityCodeInput, {target: {value: 'abdef'}})
            expect(securityCodeInput.value).toBe('abdef')
            fireEvent.click(securityCodeFormButton)    

        })


        await waitFor(() =>  {
            const welcome = screen.getByText("Welcome TESTING APP")
            expect(welcome.innerHTML).toBe("Welcome TESTING APP")
        })

    })
})
