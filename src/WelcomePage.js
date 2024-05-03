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

  const redirectLoginPage = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
    setShowRecipePage(false);
  };

  const redirectRegisterPage = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
    setShowRecipePage(false);
  };

  const redirectRecipePage = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
    setShowRecipePage(true);
  };

  const redirectHomePage = () => {
    setShowLoginForm(false);
    setShowRegisterForm(false);
    setShowRecipePage(false);
  };

  if (loggedIn) {
    return <LoggedInPage setLoggedIn={setLoggedIn} userId={userId} />;
  } else {
    return (
      <div>
        <Header onRecipePageToggle={redirectRecipePage} onLoginFormToggle={redirectLoginPage} onRegisterFormToggle={redirectRegisterPage} onBackTogle={redirectHomePage} setLoggedIn={setLoggedIn} />
        <div className="WelcomePage">
          {!showLoginForm && !showRegisterForm && !showRecipePage && <WelcomePageTrue />}
          {showRecipePage && <RecipeSearchPage />}
          {showLoginForm && <LoginForm setLoggedIn={setLoggedIn} setUserId={setUserId} />}
          {showRegisterForm && <RegistrationForm />}
        </div>
        <Footer />
      </div>
    );
  }
}

function WelcomePageTrue() {
  return (
    <div id='frontPagePicture'>
      <td className='frontTD'>
        <img id='frontImage' src={image} alt="let him cook" />
      </td>
      <td className='frontTD'>
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
