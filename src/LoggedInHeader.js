import React from 'react';
import './Header.css';

function LoggedInHeader({ onHomePageToggle, onManagePageToggle, setLoggedIn }) {
  const logOut = () => {
    setLoggedIn(false);
  };
  
  const redirectHomePage = () => {
    onHomePageToggle(true);
    onManagePageToggle(false);
  };
  
  const redirectManagePage = () => {
    onHomePageToggle(false);
    onManagePageToggle(true);
  };

  return (
    <div className="Header">
      <p id='serviceName'>Let him cook - portal o gotowaniu</p>
      <button className='headerButton' id='logOutButton' onClick={logOut}>Wyloguj się</button>
      <button className='headerButton' id='recipePageManaging' onClick={redirectManagePage}>Zarządzaj moimi przepisami</button>
      <button className='headerButton' id='recipePage' onClick={redirectHomePage}>Szukaj przepisów</button>
    </div>
  );
}

export default LoggedInHeader;
