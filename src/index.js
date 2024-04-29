import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import WelcomePage from './WelcomePage';

const root = document.getElementById('root');

function Root() {
  const [loggedIn, setLoggedIn] = useState();
  return <WelcomePage loggedIn={loggedIn} setLoggedIn={setLoggedIn} />;
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  root
);
