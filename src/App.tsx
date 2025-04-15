import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';
import axios from './axios-inst';
import NavbarPage from './components/ui/header/header';
import Footer from './components/ui/footer/footer';
import Notifications from './components/ui/notifications/Notifications';

/**
 * Main App component that serves as the entry point of the application
 * Provides routing and global layout components (header, footer)
 * Wrapped with error handler HOC for global error handling
 */
function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BrowserRouter>
        {/* Global notifications component */}
        <Notifications />

        <NavbarPage />
        <div className="flex-grow-1">
          {/* Main content is rendered in NavbarPage component using Routes */}
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default withErrorHandler(App, axios);
