import React from 'react';
import ReactDOM from 'react-dom';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import ChatProvider from './Context/ChatProvider';


ReactDOM.render(
  <BrowserRouter>
  <ChatProvider>
      <App />
     </ChatProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

