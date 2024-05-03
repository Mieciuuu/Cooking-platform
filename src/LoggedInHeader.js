import React from 'react';
import './Header.css';

/**
 * Header component for the logged-in state.
 * Displays the site name and navigation buttons for managing recipes and logging out.
 * 
 * @param {Object} props - Props object containing event handlers and state setter.
 * @param {Function} props.onHomePageToggle - Event handler for navigating to the home page.
 * @param {Function} props.onManagePageToggle - Event handler for navigating to the manage page.
 * @param {Function} props.setLoggedIn - State setter function to update the logged-in status.
 * @returns {JSX.Element} Header component for the logged-in state.
 */
function LoggedInHeader({ onHomePageToggle, onManagePageToggle, setLoggedIn }) {
  /**
   * Logs out the user by setting the loggedIn state to false.
   */
  const logOut = () => {
    setLoggedIn(false);
  };
  
  /**
   * Redirects the user to the home page by toggling page states.
   */
  const redirectHomePage = () => {
    onHomePageToggle(true);
    onManagePageToggle(false);
  };
  
  /**
   * Redirects the user to the manage page by toggling page states.
   */
  const redirectManagePage = () => {
    onHomePageToggle(false);
    onManagePageToggle(true);
  };

  return (
    <div id="Header">
      <p id='serviceName'>Let him cook - portal o gotowaniu</p>
      <button className='headerButton' id='logOutButton' onClick={logOut}>Wyloguj się</button>
      <button className='headerButton' id='recipePageManaging' onClick={redirectManagePage}>Zarządzaj moimi przepisami</button>
      <button className='headerButton' id='recipePage' onClick={redirectHomePage}>Szukaj przepisów</button>
    </div>
  );
}

export default LoggedInHeader;
