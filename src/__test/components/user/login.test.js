import {fireEvent, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import { server } from '../../../mocks/browser';
import store from "../../../state/store"
import App from '../../../App';
import { render } from '../../helpers/reduxStore';
import { userReceived } from '../../../state/reducers/userReducers';
import { removeLoginToken } from '../../../componentsHelpers/token';

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
beforeEach( () => {
    removeLoginToken()
    store.dispatch(userReceived({
        is_login: false,
        admin: false, 
        user: {id: 0}
      })
    )
})

describe("<Login/>",() => {
    const loginSubmitForm = ({password, username}) => {
        const userNameInput = screen.getByLabelText('Username')
        fireEvent.change(userNameInput, {target: {value: username}})
        const passwordInput = screen.getByLabelText('Password')
        fireEvent.change(passwordInput, {target: {value: password}})
        const loginFormSubmitButton = screen.getByText("Login")
        fireEvent.click(loginFormSubmitButton)  
    }

    beforeEach( () => {
        return  render(
            <App/>
        )
    })

    test ("Redux user login Should initially be false",()=>{
        const {user} = store.getState().user
        expect(user.is_login).toBe(false)
    })

    test('Input field Username Should exist and accept a value',() => {
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


    // test("Should login and redirect to homepage", async ()=>{
    //     cleanup()
    //     const {user} = store.getState().user
    //     console.log(user)
    //     loginSubmitForm({password: "123456", username: "testingapp"})
    //     await waitFor(() =>  {
    //         expect(screen.getByText("You have no work orders to display at this moment")).toBeInTheDocument()
    //         // const {user} = store.getState().user
    //         // expect(user.is_login).toBe(true)
    //     })     
    // })  
    
    test("Should have a navigation bar that only appears for registered and logged-in users", async () => {
        loginSubmitForm({password: "123456", username: "testingapp"})
        await waitFor(() =>  {
            const settings = screen.getByText("Settings")
            const buildings = screen.getByText("Buildings")
            const workOrders = screen.getByText("Work Orders")
            const employees = screen.getByText("Sign Out")
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

    test("if email is not validated should redirect to verify_email", async ()=>{
        loginSubmitForm({password: "123456", username: "testingemail"})
        await waitFor(() =>  {
            expect(screen.getByText("We must verify your email first to use your account")).toBeInTheDocument()
            const {user} = store.getState().user
            expect(user.valid_email).toBe(false)
            
        })    
    })  

})

