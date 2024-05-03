import React, { useState } from 'react';
import Footer from './Footer';
import RecipeSearchPage from './RecipeSearchPage';
import LoggedInHeader from './LoggedInHeader';
import RecipeManagePage from './RecipeManagePage';
import './LoggedInPage.css';

function LoggedInPage({ setLoggedIn, userId }) {
  const [showManagingPage, setManagingPage] = useState(false);
  const [showHomePage, setHomePage] = useState(true);

  console.log(userId);
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
