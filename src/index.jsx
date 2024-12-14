
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
import './styles/styles.css'
import './styles/nav-bar.css'
import HttpsRedirect from 'react-https-redirect';
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store  from './state/store';

const root = createRoot(document.getElementById("root"));
root.render(
   <HttpsRedirect>
    <Provider store={store}>
      <App />
    </Provider>
  </HttpsRedirect>
);








