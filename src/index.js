import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WelcomePage from './WelcomePage';

const root = document.getElementById('root');

/**
 * Root component of the application.
 * Initializes the state for user login status and renders the WelcomePage component.
 */
function Root() {
  // State variable to track user login status
  const [loggedIn, setLoggedIn] = useState();

  // Render the WelcomePage component with loggedIn state and setLoggedIn function as props
  return <WelcomePage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />;
}

// Render the Root component inside React.StrictMode to enable additional checks and warnings
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  root
);
