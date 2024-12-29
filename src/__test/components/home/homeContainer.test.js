import { render as rtlRender,fireEvent, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { server } from '../../../mocks/browser';
import App from '../../../App';
import store from "../../../state/store"

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const render = component => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)
const clickToHome=()=>{
    const homeLink = screen.getByText("Home")
    fireEvent.click(homeLink) 
}

const loginSubmitForm = ({password, username}) => {
    const userNameInput = screen.getByLabelText('Username')
    fireEvent.change(userNameInput, {target: {value: username}})
    const passwordInput = screen.getByLabelText('Password')
    fireEvent.change(passwordInput, {target: {value: password}})
    const loginFormSubmitButton = screen.getByText("Login")
    fireEvent.click(loginFormSubmitButton)  
}

describe("<HomeContainer/>",()=>{
    test('Should have a button to create a personal account', () => {
        render(
            <App/>
        )
       expect(screen.getByText('Create a personal account')).toBeInTheDocument()
    })

    test("should have a login form",()=>{
        render(
            <App/>
        )
        expect(screen.getByLabelText('Username')).toBeInTheDocument()
        expect(screen.getByLabelText('Password')).toBeInTheDocument()
    })

    test("should have a link forgot password",()=>{
        render(
            <App/>
        )
       const forgotPasswordLink =  screen.getByText("Forgot password?")
       expect(forgotPasswordLink).toBeInTheDocument()
       expect(forgotPasswordLink.closest('a')).toHaveAttribute('href', "/password_recovery")
    })

    test("should have a link forgot username",()=>{
        render(
            <App/>
        )
        const link =  screen.getByText("Forgot username?")
        expect(link).toBeInTheDocument()
        expect(link.closest('a')).toHaveAttribute('href', "/username_recovery")
    })

    test("sign up as business account",()=>{ 
        render(
            <App/>
        )
        const link =  screen.getByText("Sign up as business account?")
        expect(link).toBeInTheDocument()
        expect(link.closest('a')).toHaveAttribute('href', "/signup")
    })

    // test("Should login to test how app work",async ()=>{
    //     render(
    //         <App/>
    //     )
    //     const link = screen.getByText("Try it yourself")
    //     expect(link).toBeInTheDocument()
    //     await waitFor( () => fireEvent.click(link))
    //     await waitFor(() =>  {
    //         expect(screen.getByText('You have no work orders to display at this moment')).toBeInTheDocument()
    //     })   
    // })
    
    test("Should display login home page",async () => {
        render(
            <App/>
        )
        await waitFor(()=>{
            loginSubmitForm({password: "123456", username: "testingapp"})
        })
        await waitFor(()=>{
            expect(screen.getByText('You have no work orders to display at this moment')).toBeInTheDocument()
            expect(screen.getByText('Create A Work Order') ).toBeInTheDocument()
            expect(screen.getByText("Sign Out")).toBeInTheDocument()
        })
    })
})