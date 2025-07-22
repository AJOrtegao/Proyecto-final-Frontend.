import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ErrorBoundary from './ErrorBoundary';

// Bootstrap y estilos globales
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'; // único archivo de estilos

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary> 
        <App />
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
