
import { render ,fireEvent, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { server } from '../../../mocks/browser';
import store from "../../../state/store"
import SignUp from '../../../components/users/SignUp';

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("<SignUp/>",()=>{
    beforeEach(()=>{
      return render ( <Provider store={store}><SignUp/> </Provider>)
    })
    const signUpWithErrors = ()=>{
        const input1 = screen.getByLabelText('Name:')
        fireEvent.change(input1, {target: {value: ""}})
        const input2 = screen.getByLabelText('Email:')
        fireEvent.change(input2, {target: {value: ''}})
        const input3 = screen.getByLabelText('Username:')
        fireEvent.change(input3, {target: {value: ''}})
        const input4 = screen.getByLabelText('Password:')
        fireEvent.change(input4, {target: {value: ''}})
        const input5 = screen.getByLabelText('Confirm password:')
        fireEvent.change(input5, {target: {value: ''}})
        const button = screen.getByText('Submit')
        fireEvent.click(button)
    }
    const signUp = ()=>{
        const input1 = screen.getByLabelText('Name:')
        fireEvent.change(input1, {target: {value: "TESTING APP"}})
        const input2 = screen.getByLabelText('Email:')
        fireEvent.change(input2, {target: {value: 'testing@gmail.com'}})
        const input3 = screen.getByLabelText('Username:')
        fireEvent.change(input3, {target: {value: 'testingapp'}})
        const input4 = screen.getByLabelText('Password:')
        fireEvent.change(input4, {target: {value: '123456@'}})
        const input5 = screen.getByLabelText('Confirm password:')
        fireEvent.change(input5, {target: {value: '123456@'}})
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

    // test('Should render SignUp in email verification mode, create a new user and confirm email.',async ()=>{
    //     signUp()
    //     await waitFor(() =>  {
    //         const securityCodeInput = screen.getByLabelText('Enter security code:')
    //         const securityCodeFormButton = screen.getByText('Submit')
    //         screen.getByText('We send you an email with a verification code, please check your email.')
    //         screen.getByText("Didn't receive the code?")
    //         fireEvent.change(securityCodeInput, {target: {value: 'abdef'}})
    //         expect(securityCodeInput.value).toBe('abdef')
    //         fireEvent.click(securityCodeFormButton)    
    //     })


    //     await waitFor(() =>  {
    //         const welcome = screen.getByText("Welcome TESTING APP")
    //         expect(welcome.innerHTML).toBe("Welcome TESTING APP")
    //     })

    // })

    test('Should validate name, email, password and confirm password.', async ()=>{
        signUpWithErrors()
        await waitFor(() =>  {
            expect(screen.getByText("Name can't be blank").innerHTML).toBeDefined()   
            expect(screen.getByText("Email can't be blank").innerHTML).toBeDefined() 
            expect(screen.getByText("Password can't be blank").innerHTML).toBeDefined() 
            expect(screen.getByText("Password is too short (minimum is 6 characters)").innerHTML).toBeDefined()
            expect(screen.getByText("Password is invalid").innerHTML).toBeDefined() 
           
        })

    })

    test('Should create an new user.', async ()=>{
        signUp()
        await waitFor(() =>  {
            
            expect(screen.getByText('Enter security code:').innerHTML).toBeDefined() 
            expect(screen.getByText('We send you an email with a verification code, please check your email.').innerHTML).toBeDefined() 
            expect(screen.getByText("Didn't receive the code?").innerHTML).toBeDefined() 
            expect(screen.getByText('Request new code').innerHTML).toBeDefined() 
            // const securityCodeInput = screen.getByLabelText('Enter security code:')
            // const securityCodeFormButton = screen.getByText('Submit')
            // screen.getByText('We send you an email with a verification code, please check your email.')
            // screen.getByText("Didn't receive the code?")
            // fireEvent.change(securityCodeInput, {target: {value: 'abdef'}})
            // expect(securityCodeInput.value).toBe('abdef')
            // fireEvent.click(securityCodeFormButton)  
        })

    })
})
