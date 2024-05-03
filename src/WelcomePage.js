import React, { useState } from 'react';
import './WelcomePage.css';
import Header from './Header';
import Footer from './Footer';
import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import RecipeSearchPage from './RecipeSearchPage';
import image from './letHimCook.jpg';
import LoggedInPage from './LoggedInPage';

function WelcomePage({ loggedIn, setLoggedIn }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showRecipePage, setShowRecipePage] = useState(false);
  const [userId, setUserId] = useState();

  const redirect = (showLoginForm, showRegisterForm, showRecipePage) => {
    setShowLoginForm(showLoginForm);
    setShowRegisterForm(showRegisterForm);
    setShowRecipePage(showRecipePage);
  };

  if (loggedIn) {
    return <LoggedInPage setLoggedIn={setLoggedIn} userId={userId} />;
  } else {
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
