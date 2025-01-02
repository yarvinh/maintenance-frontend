import { fireEvent, screen,waitFor} from '@testing-library/react';
import '@testing-library/jest-dom'
import { server } from '../../../mocks/browser';
import App from '../../../App';
import { render } from '../../helpers/reduxStore';

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const loginSubmitForm = ({password, username}) => {
    const userNameInput = screen.getByLabelText('Username')
    fireEvent.change(userNameInput, {target: {value: username}})
    const passwordInput = screen.getByLabelText('Password')
    fireEvent.change(passwordInput, {target: {value: password}})
    const loginFormSubmitButton = screen.getByText("Login")
    fireEvent.click(loginFormSubmitButton)  
}

describe("<HomeContainer/>",()=>{
    beforeEach(() => {
       render(<App/>)
    });

    test('Should have a button to create a personal account', () => {
       expect(screen.getByText('Create a personal account')).toBeInTheDocument()
    })

    test("should render username and password input fields",()=>{
        expect(screen.getByLabelText('Username')).toBeInTheDocument()
        expect(screen.getByLabelText('Password')).toBeInTheDocument()
    })

    test("should have a link forgot password",()=>{
       const forgotPasswordLink =  screen.getByText("Forgot password?")
       expect(forgotPasswordLink).toBeInTheDocument()
       expect(forgotPasswordLink.closest('a')).toHaveAttribute('href', "/password_recovery")
    })

    test("should have a link forgot username",()=>{
        const link =  screen.getByText("Forgot username?")
        expect(link).toBeInTheDocument()
        expect(link.closest('a')).toHaveAttribute('href', "/username_recovery")
    })

    test("sign up as business account",()=>{ 
        const link =  screen.getByText("Sign up as business account?")
        expect(link).toBeInTheDocument()
        expect(link.closest('a')).toHaveAttribute('href', "/signup")
    })
    
    test("Should display login home page",async () => {
        loginSubmitForm({password: "123456", username: "testingapp"})
        await waitFor(()=>{
            expect(screen.queryByLabelText('Username')).not.toBeInTheDocument();
            expect(screen.queryByLabelText('Password')).not.toBeInTheDocument();
            expect(screen.getByText('You have no work orders to display at this moment')).toBeInTheDocument()
            expect(screen.getByText('Create A Work Order') ).toBeInTheDocument()
            expect(screen.getByText("Sign Out")).toBeInTheDocument()
        })
    })
})