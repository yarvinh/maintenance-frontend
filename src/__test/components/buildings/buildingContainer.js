// import { render as rtlRender,fireEvent, screen,waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom'
// import rootReducer from "../../../reducers/manageAllReducers";
// import { createStore, applyMiddleware } from 'redux';
// import {thunk} from 'redux-thunk';
// import { Provider } from 'react-redux';
// import { server } from '../../../mocks/browser';
// import LogIn from '../../../components/users/LogIn';
// import {BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
// import HomeContainer from '../../../containers/HomeContainer';
// import BuildingsContainer from '../../../containers/BuildingsContainer';
// import App from '../../../App';
// import { act } from 'react-dom/test-utils';
// const store = createStore(rootReducer, applyMiddleware(thunk))
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
//           <App/>
//         )
//     })

    // const loginSubmitForm = ({password, username}) => {
    //     const userNameInput = screen.getByLabelText('Username')
    //     fireEvent.change(userNameInput, {target: {value: username}})
        // const passwordInput = screen.getByLabelText('Password')
        // fireEvent.change(passwordInput, {target: {value: password}})
        // const loginFormSubmitButton = screen.getByText("Login")
        // fireEvent.click(loginFormSubmitButton)  
    // }
    

   
//    test("should login", async ()=>{
//         loginSubmitForm({password: "12345@", username: "testapp"})
        // await waitFor(()=>{
        //   screen.getByText("Sign Out")
        // })
//    })

//    test("Should take me to buildings when click link Building in menu bar",async()=>{
    //   const buildingLink = screen.getByText("Buildings")

    //   act(()=>{
    //     fireEvent.click(buildingLink)
    //   })
//    })
   
   


// })