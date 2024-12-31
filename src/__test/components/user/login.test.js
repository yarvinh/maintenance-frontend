import { render as rtlRender,fireEvent, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import { server } from '../../../mocks/browser';
import store from "../../../state/store"
import LogIn from '../../../components/users/LogIn';
import { MemoryRouter } from 'react-router';
import App from '../../../App';

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const render = component => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)

describe("<Login/>",() => {
    beforeEach( () => {
        return  render(
            <MemoryRouter>
              <LogIn/>
            </MemoryRouter>
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
    test ("Redux user login Should initially be false",()=>{
        const {user} = store.getState().user
        expect(user.is_login).toBe(false)
    })

    test('Input Username Should exist and accept a value',() => {
        const userNameInput = screen.getByLabelText('Username')
        fireEvent.change(userNameInput, {target: {value: "testingapp"}})
        expect(userNameInput.value).toBe('testingapp')
    })

    test('Input Password Should exist and accept a value',()=>{
        const userNameInput = screen.getByLabelText('Username')
        fireEvent.change(userNameInput, {target: {value: "testingapp"}})
        const passwordInput = screen.getByLabelText('Password')
        fireEvent.change(passwordInput, {target: {value: '123456'}})
        expect(passwordInput.value).toBe('123456')
    })

    test('If Password or username are wrong should display an error',async ()=>{
        loginSubmitForm({password: "123457", username: "testingapp"})
        await waitFor(()=>{
            const  errorMsg = screen.getByText('Incorrect username or password')
            expect(errorMsg).toBeInTheDocument()
        })
    })

    test("Should login and redirect to homepage",async ()=>{
       loginSubmitForm({password: "123456", username: "testingapp"})
        await waitFor(() =>  {
            const {user} = store.getState().user
            expect(user.is_login).toBe(true)
        }) 
    })

    test("if email is not validated should redirect to ", async ()=>{
        const appComponent = render(
            <App/>
        )
        await waitFor (() => loginSubmitForm({password: "123456", username: "testingemail"}))
        await waitFor(() =>  {
            expect(appComponent.getByText("We must verify your email first to use your account")).toBeInTheDocument()
            const {user} = store.getState().user
            expect(user.valid_email).toBe(false)
        })     
    })  


    test("Should login and redirect to homepage", async ()=>{
        const appComponent = render(
            <App/>
        )
        await waitFor( () => loginSubmitForm({password: "123456", username: "testingapp"}))
        await waitFor(() =>  {
            expect(appComponent.getByText("You have no work orders to display at this moment")).toBeInTheDocument()
            const {user} = store.getState().user
            expect(user.is_login).toBe(true)
        })     
    })  

    test("Navigation bar should have login users options", async ()=>{
        const appComponent = render(
            <App/>
        )
        await waitFor( () => loginSubmitForm({password: "123456", username: "testingapp"}))
        await waitFor(() =>  {
            const settings = appComponent.getByText("Settings")
            const buildings = appComponent.getByText("Buildings")
            const workOrders = appComponent.getByText("Work Orders")
            const employees = appComponent.getByText("Sign Out")
            expect(settings).toBeInTheDocument()
            expect(buildings).toBeInTheDocument()
            expect(workOrders).toBeInTheDocument()
            expect(employees).toBeInTheDocument()
            expect(settings.closest('a')).toHaveAttribute('href', "/settings/1")
            expect(buildings.closest('a')).toHaveAttribute('href', "/buildings")
            expect(workOrders.closest('a')).toHaveAttribute('href', "/work_orders")
            expect(employees.closest('a')).toHaveAttribute('href', "/signout")
        })     
    })  
})







