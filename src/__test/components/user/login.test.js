// import { render as rtlRender,fireEvent, screen,waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom'
// import { Provider } from 'react-redux';
// import { server } from '../../../mocks/browser';
// import App from '../../../App';
// import store from "../../../state/store"

// beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

// const render = component => rtlRender(
//     <Provider store={store}>
//         {component}
//     </Provider>
// )

// describe("<Login/>",()=>{
//     beforeEach(()=>{
//         return  render(
//             <App/>
//         )
//     })


//     const loginSubmitForm = ({password, username}) => {
//         const userNameInput = screen.getByLabelText('Username')
//         fireEvent.change(userNameInput, {target: {value: username}})
//         const passwordInput = screen.getByLabelText('Password')
//         fireEvent.change(passwordInput, {target: {value: password}})
//         const loginFormSubmitButton = screen.getByText("Login")
//         fireEvent.click(loginFormSubmitButton)  
//     }
    

//     test('Should have a button when click change the type of login, personal or business',()=>{
//         const loginTypeButton = screen.getByText('Login to business account')
//         fireEvent.click(loginTypeButton) 
//         expect(loginTypeButton.innerHTML).toBe("Login to personal account")
//         fireEvent.click(loginTypeButton) 
//         expect(loginTypeButton.innerHTML).toBe('Login to business account')
//     })

//     test('Input Username Should exist and accept a value',()=>{
//         const userNameInput = screen.getByLabelText('Username')
//         fireEvent.change(userNameInput, {target: {value: "testingapp"}})
//         expect(userNameInput.value).toBe('testingapp')
//     })

//     test('Input Password Should exist and accept a value',()=>{
//         const userNameInput = screen.getByLabelText('Username')
//         fireEvent.change(userNameInput, {target: {value: "testingapp"}})
//         const passwordInput = screen.getByLabelText('Password')
//         fireEvent.change(passwordInput, {target: {value: '123456'}})
//         expect(passwordInput.value).toBe('123456')
//     })

//     test('If wrong Password or wrong username should display an error',async ()=>{
//         loginSubmitForm({password: "123457", username: "testingapp"})
//         const loginTypeButton = screen.getByText('Login to business account')
//         fireEvent.click(loginTypeButton) 
//         loginSubmitForm({password: "12345", username: "testingapps"})

//         await waitFor(()=>{
//            const  errorMsg =  screen.getByText('Incorrect username or password')
//             expect(errorMsg.innerHTML).toBe('Incorrect username or password')
//         })
    
//     })

//     test("Should submit username, password and redirect to Home",async ()=>{
//         loginSubmitForm({password: "12345@", username: "testapp"})
 
//         await waitFor(() =>  {
//             screen.getByText("Sign Out")
//         })     
//     })  

// })