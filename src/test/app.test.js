// import React from 'react'
import { render,fireEvent, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';
import rootReducer from "../reducers/manageAllReducers";
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
// import {http, HttpResponse} from 'msw'
// import {setupServer} from 'msw/node'
import { Provider } from 'react-redux';
import { server } from '../mocks/browser';
import HomeContainer from '../containers/HomeContainer';
const store = createStore(rootReducer, applyMiddleware(thunk))
beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('renders App', async () => {
  const appComponent = render(
    <Provider store={store}>
      <App  />
    </Provider>   
  );

  const HomeComponent = render(
    <Provider store={store}>
      <HomeContainer />
    </Provider>   
  );

  // await waitFor(() =>  component.getByText('GGC'))
  // await waitFor(() =>  component.getByText('Home'))
  // await waitFor(() =>  component.getByText('Employees'))
  // await waitFor(() =>  component.getByText('Settings'))
  // await waitFor(() =>  component.getByText('Buildings'))
  // await waitFor(() =>  component.getByText('Work Orders'))
}); 



