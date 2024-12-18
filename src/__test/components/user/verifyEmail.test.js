
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider} from 'react-redux';
import { createStore } from 'redux';
import store from "../../../state/store"
import '@testing-library/jest-dom'; 
import EmailValidation from '../../../components/users/EmailValidation';
import { server } from '../../../mocks/browser';
import { MemoryRouter } from 'react-router';

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('EmailValidation Component end to end as an user', () => {
  beforeEach(()=>{
      return  render(
      <Provider store={store}>
        <MemoryRouter>
            <EmailValidation/>
        </MemoryRouter>
      </Provider>)
  })

  test('displays error messages when there is an error from verifyEmail action', async () => {
        const input = screen.getByLabelText(/enter security code:/i);
        const button = screen.getByRole('button', { name: /submit/i });
        fireEvent.change(input, { target: { value: '12345' } });
        fireEvent.click(button);
      await waitFor(() =>  {
        expect(screen.getByText("Wrong code, please try again.").innerHTML).toBeDefined() 
      })
  })

  test('should be able to request new security code', async () => {
    expect(screen.getByText("Didn't receive the code?").innerHTML).toBeDefined()
    const button = screen.getByText("Request new code");
    fireEvent.click(button);
  await waitFor(() =>  {
    // expect(screen.getByText("Wr please try again.").innerHTML).toBeDefined() 
  })
})

})


//////////////////////

const mockStore = (state) => {
  return createStore((state) => state, state);
};
const user = {
    admin: true,
    created: true,
    is_login: false,
    reload: false,
    token: "eyJhbGciOiJIUzI1NiJ9.eyJleHBpcmVzX2F0IjoiMjAyNC0wNC0yNCAwMzoxNzozMyBVVEMiLCJlbWFpbF9jb2RlIjoiZjQzYjRkIn0.cBdT56ZnYejFOtX7pLioGSUcXqElZRrq0uMQJaiszPw",
    verification_session: true, 
}

describe('EmailValidation Component', () => {
  let mockStateStore;
  beforeEach(() => {
    mockStateStore = mockStore({
      user: { user: user }, 
      errorsOrMessages: {errorsOrMessages: {from: 'verify_email' , msg: ['We send you an email with a verification code, please check your email.']}}, // Mock errorsOrMessages
    });
  });

  test('renders the component with a security code input and submit button',() => {
    render(
      <Provider store={mockStateStore}>
        <EmailValidation />
      </Provider>
    );
        screen.getByText("We send you an email with a verification code, please check your email.")
        expect(screen.getByLabelText(/enter security code/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();

  });

  test('dispatches verifyEmail action on form submission with valid security code', async () => {
    const dispatch = jest.fn();
    mockStateStore.dispatch = dispatch;

    render(
      <Provider store={mockStateStore}>
        <EmailValidation />
      </Provider>
    );

    const input = screen.getByLabelText(/enter security code:/i);
    const button = screen.getByRole('button', { name: /submit/i });
     
    fireEvent.change(input, { target: { value: '123456' } });
    fireEvent.click(button);
   
    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });

  test('prevents form submission if security code is empty', async () => {
    const dispatch = jest.fn();
    mockStateStore.dispatch = dispatch;

    render(
      <Provider store={mockStateStore}>
        <EmailValidation />
      </Provider>
    );

    const input = screen.getByLabelText(/enter security code/i);
    const button = screen.getByRole('button', { name: /submit/i });

    fireEvent.change(input, { target: { value: '' } }); 
    fireEvent.click(button);

    await waitFor(() => {
      expect(dispatch).not.toHaveBeenCalled();
    });
  });
});
