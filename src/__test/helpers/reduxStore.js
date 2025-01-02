import { render as rtlRender} from '@testing-library/react';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import store from "../../state/store"

export const render = component => rtlRender(
    <Provider store={store}>
        {component}
    </Provider>
)
