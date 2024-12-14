import { render as rtlRender,fireEvent, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { server } from '../../../mocks/browser';
import store from "../../../state/store"
import App from '../../../App';
import SignUp from '../../../components/users/SignUp';
import EmailValidation from '../../../components/users/EmailValidation';

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const render = component => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)

describe("<EmailValidation/>",()=>{
    beforeEach(()=>{
        return  render(
            <EmailValidation/>
        )
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



    test('Should create an new user.', async ()=>{
        // signUp()
        // await waitFor(() =>  {
            
            // expect(screen.getByText('Enter security code:').innerHTML).toBeDefined() 
            // expect(screen.getByText('We send you an email with a verification code, please check your email.').innerHTML).toBeDefined() 
            // expect(screen.getByText("Didn't receive the code?").innerHTML).toBeDefined() 
            // expect(screen.getByText('Request new code').innerHTML).toBeDefined() 
            // const securityCodeInput = screen.getByLabelText('Enter security code:')
            // const securityCodeFormButton = screen.getByText('Submit')
            // screen.getByText('We send you an email with a verification code, please check your email.')
            // screen.getByText("Didn't receive the code?")
            // fireEvent.change(securityCodeInput, {target: {value: 'abdef'}})
            // expect(securityCodeInput.value).toBe('abdef')
            // fireEvent.click(securityCodeFormButton)  
        // })

    })
})
