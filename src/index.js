import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App/App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './index.css'
import AuthNoteContextProvider from './Components/Context/AuthNoteContext/AuthNoteContext';
import {Provider} from 'react-redux';
import Store from './Components/Redux/Store/Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <AuthNoteContextProvider>
      
      <Provider store={Store}>
            <App />

      </Provider>
   
      

    </AuthNoteContextProvider>

);

