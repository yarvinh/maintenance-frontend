import { render as rtlRender,fireEvent, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import rootReducer from "../../../reducers/manageAllReducers";
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { Provider } from 'react-redux';
import { server } from '../../../mocks/browser';
import {MemoryRouter, Route, Routes } from "react-router-dom";
import HomeContainer from '../../../containers/HomeContainer';
import ForgotPassword from '../../../components/users/ForgotPassword';
import ForgotUsername from '../../../components/users/ForgotUsername';
import SignUp from '../../../components/users/SignUp';
import TryItYourself from '../../../components/tryItYourself';

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
                  <Route path="/password_recovery" element={<ForgotPassword/>}/>
                  <Route path="/username_recovery" element={<ForgotUsername/>}/>
                  <Route path="/signup" element={<SignUp/>}/>
                  <Route path="/try_it_yourself" element={<TryItYourself/>}/>
                </Routes>
             </ MemoryRouter>
        )
    })

    test('Should have a button to create a personal account',()=>{
       screen.getByText('Create a personal account')
    })

    test("should have a login form",()=>{
        screen.getByLabelText('Username')
        screen.getByLabelText('Password')
    })

    test("should have a link forgot password",()=>{
       const forgotPasswordLink =  screen.getByText("Forgot password?")
       fireEvent.click(forgotPasswordLink) 
       screen.getByText( "Enter your username:")  
    })

    test("should have a link forgot username",()=>{
        const link =  screen.getByText("Forgot username?")
        fireEvent.click(link) 
        screen.getByText( "Enter your email:")  
    })

    test("sign up as business account",()=>{ 
        const link =  screen.getByText("Sign up as business account?")
        fireEvent.click(link) 
        screen.getByText( "Email:")  
    })

    test("Should login without the login form to test how app work",async ()=>{
        screen.getByText("Sign up as business account?")
        const link = screen.getByText("Try it yourself")
        fireEvent.click(link) 
       
        await waitFor(() =>  {
            expect(screen.getByText('You have no work orders to display at this moment').innerHTML).toBe('You have no work orders to display at this moment')
        })   
    })

    test("Should diplay login home page",()=>{
        screen.getByText('You have no work orders to display at this moment')
        screen.getByText('Create A Work Order')
        screen.getByText('<< Back')  
    })

})