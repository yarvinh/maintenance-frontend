
import { render as rtlRender,fireEvent, screen,waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';
import { server } from '../mocks/browser';
import store from "../state/store"
import { Provider } from 'react-redux';

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
  expect(screen.getByText(/home/i)).toBeInTheDocument(); 
  const submit = await waitFor(() =>  appComponent.getByText('Home'))

}); 




