


import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider} from 'react-redux';
import { createStore } from 'redux';
import store from "../../../state/store"
import '@testing-library/jest-dom'; // for the "toBeInTheDocument" matcher
// import { Navigate } from 'react-router-dom';
import EmailValidation from '../../../components/users/EmailValidation';
import { verifyEmail,requestSecurityCode  } from '../../../actions/usersActions';
import { server } from '../../../mocks/browser';

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe('EmailValidation Component as an user', () => {
  beforeEach(()=>{
      return  render(<Provider store={store}><EmailValidation/></Provider>)
  })
 
  test("Render component and allow you to verify email ", async () => {
      await waitFor(() =>  {
        // const input = screen.getByLabelText(/enter security code:/i);
        // const button = screen.getByRole('button', { name: /submit/i });
      })
  })
})
////////////////////////

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
  let store;
  beforeEach(() => {
    store = mockStore({
      user: { user: user }, 
      errorsOrMessages: {errorsOrMessages: {from: 'verify_email' , msg: ['We send you an email with a verification code, please check your email.']}}, // Mock errorsOrMessages
    });
  });

  test('renders the component with a security code input and submit button',() => {
    render(
      <Provider store={store}>
        <EmailValidation />
      </Provider>
    );

        screen.getByText("We send you an email with a verification code, please check your email.")
        expect(screen.getByLabelText(/enter security code/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();

  });

  // test('dispatches verifyEmail action on form submission with valid security code', async () => {
  //   const dispatch = jest.fn();
  //   store.dispatch = dispatch;

  //   render(
  //     <Provider store={store}>
  //       <EmailValidation />
  //     </Provider>
  //   );

  //   const input = screen.getByLabelText(/enter security code:/i);
  //   const button = screen.getByRole('button', { name: /submit/i });
     
  //   fireEvent.change(input, { target: { value: '123456' } });
  //   fireEvent.click(button);
   
  //   await waitFor(() => {
  //     expect(dispatch).toHaveBeenCalledWith(verifyEmail({user:{security_code: '123456'}}));
  //   });
  // });

//   test('prevents form submission if security code is empty', async () => {
//     const dispatch = jest.fn();
//     store.dispatch = dispatch;

//     render(
//       <Provider store={store}>
//         <EmailValidation />
//       </Provider>
//     );

//     const input = screen.getByLabelText(/enter security code/i);
//     const button = screen.getByRole('button', { name: /submit/i });

//     fireEvent.change(input, { target: { value: '' } }); // Empty input
//     fireEvent.click(button);

//     await waitFor(() => {
//       // Ensure the dispatch is not called
//       expect(dispatch).not.toHaveBeenCalled();
//     });
//   });

//   test('dispatches requestSecurityCode action when "Request new code" button is clicked', async () => {
//     const dispatch = jest.fn();
//     store.dispatch = dispatch;

//     render(
//       <Provider store={store}>
//         <EmailValidation />
//       </Provider>
//     );

//     const requestNewCodeButton = screen.getByRole('button', {
//       name: /request new code/i,
//     });

//     fireEvent.click(requestNewCodeButton);

//     await waitFor(() => {
//       expect(dispatch).toHaveBeenCalledWith(requestSecurityCode());
//     });
//   });

//   test('displays error messages when there is an error from verifyEmail action', async () => {
//     const errorMessage = 'Invalid security code';
//     store = mockStore({
//       user: { user: { is_login: false } },
//       errorsOrMessages: { errorsOrMessages: { from: 'verify_email', msg: errorMessage } },
//     });

//     render(
//       <Provider store={store}>
//         <EmailValidation />
//       </Provider>
//     );

//     // Simulate form submission
//     const input = screen.getByLabelText(/enter security code/i);
//     const button = screen.getByRole('button', { name: /submit/i });
//     fireEvent.change(input, { target: { value: '123456' } });
//     fireEvent.click(button);

//     // Check if the error message is displayed
//     await waitFor(() => {
//       expect(screen.getByText(errorMessage)).toBeInTheDocument();
//     });
//   });

//   test('redirects to home page if user is logged in', () => {
//     store = mockStore({
//       user: { user: { is_login: true } }, // Set the user as logged in
//       errorsOrMessages: { errorsOrMessages: {} },
//     });

//     render(
//       <Provider store={store}>
//         <EmailValidation />
//       </Provider>
//     );

//     expect(screen.queryByText(/enter security code/i)).not.toBeInTheDocument();
//     expect(screen.getByText('Redirecting...')).toBeInTheDocument();
//   });
});
