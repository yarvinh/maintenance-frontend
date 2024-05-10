
import './index.css';
import './App.css';
import './styles/navbar.css';
import './styles/employee.css';
import './styles/forms.css';
import './styles/tenants.css';
import './styles/units.css';
import './styles/comments.css'
import './styles/replies.css'
import './styles/work-orders.css'
import './styles/tasks.css'
import './styles/gallery.css'
import { createRoot } from "react-dom/client";
import App from './App';  
import rootReducer from "./reducers/manageAllReducers";
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { Provider } from 'react-redux';
import HttpsRedirect from 'react-https-redirect';

const store = createStore(rootReducer, applyMiddleware(thunk))
const root = createRoot(document.getElementById("root"));

  root.render(
    <HttpsRedirect>
      <Provider store={store}>
        <App/>
      </Provider> 
    </HttpsRedirect>
  );







