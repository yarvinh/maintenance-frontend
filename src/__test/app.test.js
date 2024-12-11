
// import { render as rtlRender,fireEvent, screen,waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom'
// import App from '../App';
// import rootReducer from "../reducers/manageAllReducers";
// import { createStore, applyMiddleware } from 'redux';
// import {thunk} from 'redux-thunk';
// import { Provider } from 'react-redux';
// import { server } from '../mocks/browser';
// const store = createStore(rootReducer, applyMiddleware(thunk))

// beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
// afterEach(() => server.resetHandlers())
// afterAll(() => server.close())

// const render = component => rtlRender(
//   <Provider store={store}>
//     {component}
//   </Provider>
// )

// test('Render App component', async () => {
//   const appComponent = render(
//       <App/>
//   )
//      const submit = await waitFor(() =>  appComponent.getByText('Home'))


// }); 


// App.test.js
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../state/store'; // assuming your Redux store is in this file
import App from '../App';
import { getFetchAction } from '../actions/fetchActions';
import { CURRENT_USER_SETTER } from '../componentsHelpers/fetchingConstants';

// Mock the dispatch function from react-redux
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mock getFetchAction
jest.mock('../actions/fetchActions', () => ({
  getFetchAction: jest.fn(),
}));

describe('App Component', () => {
  let dispatchMock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    require('react-redux').useDispatch.mockReturnValue(dispatchMock);
    require('react-redux').useSelector.mockImplementation((selector) => {
      if (selector(state => state.user.user)) {
        return { is_login: true, name: 'Test User' };
      }
      if (selector(state => state.workOrders.workOrders)) {
        return [];
      }
      return null;
    });
    getFetchAction.mockReturnValue({ type: 'MOCK_ACTION' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the app with routing and dispatching fetch actions', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument(); 
    expect(dispatchMock).toHaveBeenCalledWith(getFetchAction(CURRENT_USER_SETTER));
    await waitFor(() => expect(dispatchMock).toHaveBeenCalledWith(getFetchAction('WORKORDERS_SETTER')));
  });

  test('renders fallback for unauthenticated user', async () => {
    require('react-redux').useSelector.mockImplementation((selector) => {
      if (selector(state => state.user.user)) {
        return { is_login: false };
      }
      return null;
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });
});


