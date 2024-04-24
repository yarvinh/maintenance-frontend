// import React from 'react'
import { render as rtlRender,fireEvent, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import rootReducer from "../../../reducers/manageAllReducers";
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { Provider } from 'react-redux';
import { server } from '../../../mocks/browser';
import SignUp from '../../../components/users/SignUp';

const store = createStore(rootReducer, applyMiddleware(thunk))
beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const render = component => rtlRender(
  <Provider store={store}>
    {component}
  </Provider>
)

// test('Render SignUp', async () => {
//     render(
//       <SignUp/>
//     )
// //   })
//   const input1 = screen.getByLabelText('Name:')
//   const input2 = screen.getByLabelText('Email:')
//   const input3 = screen.getByLabelText('Username:')
//   const input4 = screen.getByLabelText('Password:')
//   const input5 = screen.getByLabelText('Confirm password:')
//   const submit = await waitFor(() =>  appComponent.getByText('Submit'))


//   fireEvent.change(input1, {target: {value: 'Valente Hernandez'}})
//   expect(input1.value).toBe('Valente Hernandez')
//   fireEvent.change(input2, {target: {value: 'valente@gmail.com'}})
//   expect(input2.value).toBe('valente@gmail.com')

// }); 

test('Input Name Should exist and accept a value',()=>{
    render(
        <SignUp/>
    )
    const input1 = screen.getByLabelText('Name:')
    fireEvent.change(input1, {target: {value: 'Valente Hernandez'}})
    expect(input1.value).toBe('Valente Hernandez')
})

test('Input Email Should exist and accept a value',()=>{
    render(
        <SignUp/>
    )
    const input2 = screen.getByLabelText('Email:')
    fireEvent.change(input2, {target: {value: 'valente@gmail.com'}})
    expect(input2.value).toBe('valente@gmail.com')
})

test('Input Username Should exist and accept a value',()=>{
    render(
        <SignUp/>
    )
    const input3 = screen.getByLabelText('Username:')
    fireEvent.change(input3, {target: {value: 'valente'}})
    expect(input3.value).toBe('valente')
})

test('Input Password Should exist and accept a value',()=>{
    render(
        <SignUp/>
    )
    const input4 = screen.getByLabelText('Password:')
    fireEvent.change(input4, {target: {value: '123456'}})
    expect(input4.value).toBe('123456')
})

test('Input Confirm password Should exist and accept a value',()=>{
    render(
        <SignUp/>
    )
    const input5 = screen.getByLabelText('Confirm password:')
    fireEvent.change(input5, {target: {value: '123456'}})
    expect(input5.value).toBe('123456')
})

test('Input Confirm password Should exist and accept a value',()=>{
    render(
        <SignUp/>
    )
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
    const button = screen.getByRole('button')
    fireEvent.click(button)
})

