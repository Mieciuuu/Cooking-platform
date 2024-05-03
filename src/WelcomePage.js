import React, { useState } from 'react';
import './WelcomePage.css';
import Header from './Header';
import Footer from './Footer';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import RecipeSearchPage from './RecipeSearchPage';
import image from './letHimCook.jpg';
import LoggedInPage from './LoggedInPage';

/**
 * WelcomePage component renders the welcome page of the application.
 * It includes header, footer, login and registration forms, recipe search page, and first entry page.
 * 
 * @param {Object} props - Component props.
 * @param {boolean} props.loggedIn - Indicates if the user is logged in.
 * @param {Function} props.setLoggedIn - Function to set the logged-in state.
 * @returns {JSX.Element} JSX representation of the WelcomePage component.
 */
function WelcomePage({ loggedIn, setLoggedIn }) {
  // State variables to manage the visibility of different sections
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showRecipePage, setShowRecipePage] = useState(false);
  const [userId, setUserId] = useState();

  /**
   * Function to toggle the visibility of different sections based on user actions.
   * 
   * @param {boolean} showLoginForm - Indicates whether to show the login form.
   * @param {boolean} showRegisterForm - Indicates whether to show the registration form.
   * @param {boolean} showRecipePage - Indicates whether to show the recipe search page.
   */
  const redirect = (showLoginForm, showRegisterForm, showRecipePage) => {
    setShowLoginForm(showLoginForm);
    setShowRegisterForm(showRegisterForm);
    setShowRecipePage(showRecipePage);
  };

  // Render LoggedInPage if the user is logged in
  if (loggedIn) {
    return <LoggedInPage setLoggedIn={setLoggedIn} userId={userId} />;
  } else {
    // Render welcome page components
    return (
      <div>
        <Header
          onRecipePageToggle={() => redirect(false, false, true)}
          onLoginFormToggle={() => redirect(true, false, false)}
          onRegisterFormToggle={() => redirect(false, true, false)}
          onBackTogle={() => redirect(false, false, false)}
          setLoggedIn={setLoggedIn}
        />
        <div id="WelcomePage">
          {/* Conditional rendering based on state */}
          {!showLoginForm && !showRegisterForm && !showRecipePage && <FirstEntryPage />}
          {showRecipePage && <RecipeSearchPage loggedIn={false} userId={-1}/>}
          {showLoginForm && <LoginForm setLoggedIn={setLoggedIn} setUserId={setUserId} />}
          {showRegisterForm && <RegistrationForm />}
        </div>
        <Footer />
      </div>
    );
  }
}

/**
 * FirstEntryPage component renders the first entry page content.
 * 
 * @returns {JSX.Element} JSX representation of the FirstEntryPage component.
 */
function FirstEntryPage() {
  return (
    <div id='FirstEntryPage'>
      <td>
        <img id='frontImage' src={image} alt="let him cook" />
      </td>
      <td>
        <p id='welcomeText'>
          Serwis "Let Him Cook" to wspaniałe miejsce do dzielenia się przepisami kuchennymi z wieloma innymi użytkownikami tego portalu.
          <br/><br/>
          Korzystaj z udostępnionych przepisów za darmo oraz przesyłaj własne.
          <br/><br/>
          Nie zapomnij ocenić przepisu po jego spróbowaniu!!!
        </p>
      </td>
    </div>
  );
}

export default WelcomePage;
