
import React from 'react'
import { render,fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';
import { pathsHelper } from './helpers/pathsHelpers';
import rootReducer from "../reducers/manageAllReducers";
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import {http, HttpResponse} from 'msw'
import {setupServer} from 'msw/node'
import { Provider } from 'react-redux';
const decoder = new TextDecoder()
import { server } from '../mocks/browser';
// const {server} = await import('../mocks/browser.js')
const store = createStore(rootReducer, applyMiddleware(thunk))

// beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())


test('renders App',() => {
  const component = render(
    <Provider store={store}>
      <App paths={pathsHelper()} />
    </Provider>   
  );
  component.getByText('Sign in as a business')
});