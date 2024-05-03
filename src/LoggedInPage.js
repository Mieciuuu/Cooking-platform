import React, { useState } from 'react';
import Footer from './Footer';
import RecipeSearchPage from './RecipeSearchPage';
import LoggedInHeader from './LoggedInHeader';
import RecipeManagePage from './RecipeManagePage';
import './LoggedInPage.css';

/**
 * Component for the logged-in state page.
 * Renders the header, recipe search or management page based on user selection, and footer.
 * 
 * @param {Object} props - Props object containing state setters and user ID.
 * @param {Function} props.setLoggedIn - State setter function to update the logged-in status.
 * @param {number} props.userId - ID of the logged-in user.
 * @returns {JSX.Element} Logged-in page component.
 */
function LoggedInPage({ setLoggedIn, userId }) {
  const [showManagingPage, setManagingPage] = useState(false);
  const [showHomePage, setHomePage] = useState(true);

  return (
    <div>
      <LoggedInHeader onHomePageToggle={setHomePage} onManagePageToggle={setManagingPage} setLoggedIn={setLoggedIn}/>
      <div className="LoggedInPage" id='loggedInPage'>
        {showManagingPage && <RecipeManagePage userId={userId} />}
        {showHomePage && <RecipeSearchPage loggedIn={true} userId={userId}/>}
      </div>
      <Footer/>
    </div>
  );
}

export default LoggedInPage;
