import './Header.css';

/**
 * Component representing the header of the page.
 * Allows navigation between different sections of the cooking portal.
 * @param {Object} props - The props passed to the component.
 * @param {Function} props.onRecipePageToggle - Function to toggle the recipe search page.
 * @param {Function} props.onLoginFormToggle - Function to toggle the login form.
 * @param {Function} props.onRegisterFormToggle - Function to toggle the registration form.
 * @param {Function} props.onBackTogle - Function to handle navigation back to the main page.
 */
function Header({ onRecipePageToggle, onLoginFormToggle, onRegisterFormToggle, onBackTogle }) {
  return (
    <div id="Header">
      {/* Title of the cooking portal */}
      <p id='serviceName' onClick={onBackTogle}>Let him cook - portal o gotowaniu</p>
      {/* Button to toggle the login form */}
      <button className='headerButton' id='loginButton' onClick={onLoginFormToggle}>Logowanie</button>
      {/* Button to toggle the registration form */}
      <button className='headerButton' id='registerButton' onClick={onRegisterFormToggle}>Rejestracja</button>
      {/* Button to toggle the recipe search page */}
      <button className='headerButton' id='recipePageButton' onClick={onRecipePageToggle}>Szukaj przepisów</button>
    </div>
  );
}

export default Header;
