// import React from 'react'
import { render as rtlRender,fireEvent, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';
import rootReducer from "../reducers/manageAllReducers";
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { Provider } from 'react-redux';
import { server } from '../mocks/browser';
const store = createStore(rootReducer, applyMiddleware(thunk))

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const render = component => rtlRender(
  <Provider store={store}>
    {component}
  </Provider>
)

test('Render App component', async () => {
  const appComponent = render(
      <App/>
  )

  // const input1 = screen.getByText('GGC')
  // const input2 = screen.getByLabelText('Email:')
  // const input3 = screen.getByLabelText('Username:')
  // const input4 = screen.getByLabelText('Password:')
  // const input5 = screen.getByLabelText('Confirm password:')
  const submit = await waitFor(() =>  appComponent.getByText('GGC'))

}); 



