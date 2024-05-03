import './Header.css';

function Header({ onRecipePageToggle, onLoginFormToggle, onRegisterFormToggle, onBackTogle }) {
  return (
    <div id="Header">
      <p id='serviceName' onClick={onBackTogle}>Let him cook - portal o gotowaniu</p>
      <button className='headerButton' id='loginButton' onClick={onLoginFormToggle}>Logowanie</button>
      <button className='headerButton' id='registerButton' onClick={onRegisterFormToggle}>Rejestracja</button>
      <button className='headerButton' id='recipePageButton' onClick={onRecipePageToggle}>Szukaj przepisów</button>
    </div>
  );
}

export default Header;
