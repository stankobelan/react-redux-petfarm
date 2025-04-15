import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import * as serviceWorker from './serviceWorker';
import store from './redux/data/store';
import './index.scss';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import AppDefault from './App';

// Enhanced type declaration for webpack HMR
declare const module: {
  hot?: {
    accept(path: string, callback: () => void): void;
  };
};

/**
 * Root element where the React application will be mounted
 */
const container = document.getElementById('root');

// Safety check for the root element
if (!container) {
  throw new Error('Root element not found! Add a div with id="root" to your HTML file');
}

// Create a React root
const root = createRoot(container);

/**
 * Render function for the application
 * Used for both initial render and hot module replacement
 */
let App = AppDefault;

function render() {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

// Initial rendering
render();

// Enable Hot Module Replacement in development mode
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', () => {
    // When App.tsx changes, dynamically import the new version
    import('./App').then(module => {
      App = module.default;
      render();
    });
  });
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
