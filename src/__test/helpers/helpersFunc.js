
export const loginSubmitForm = ({password, username}) => {
    const userNameInput = screen.getByLabelText('Username')
    fireEvent.change(userNameInput, {target: {value: username}})
    const passwordInput = screen.getByLabelText('Password')
    fireEvent.change(passwordInput, {target: {value: password}})
    const loginFormSubmitButton = screen.getByText("Login")
    fireEvent.click(loginFormSubmitButton)  
}
