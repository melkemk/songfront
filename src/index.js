import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import { Provider } from 'react-redux';
// import Q from './temp';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* <Q /> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
