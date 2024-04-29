import React, { useState } from 'react';
import Footer from './Footer';
import RecipeSearchPage from './RecipeSearchPage';
import LoggedInHeader from './LoggedInHeader';
import WelcomePage from './WelcomePage';

function LoggedInPage({ setLoggedIn }) {
  const [showManagingPage, setManagingPage] = useState(false);
  const [showHomePage, setHomePage] = useState(true);

  return (
    <div>
      <LoggedInHeader onHomePageToggle={setHomePage} onManagePageToggle={setManagingPage} setLoggedIn={setLoggedIn}/>
      <div className="LoggedInPage">
        {showManagingPage && <WelcomePage loggedIn={true} setLoggedIn={setLoggedIn} />}
        {showHomePage && <RecipeSearchPage />}
      </div>
      <Footer/>
    </div>
  );
}

export default LoggedInPage;
