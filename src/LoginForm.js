import React from 'react';
import axios from 'axios';
import './LoginRegister.css';

/**
 * Handles the login process.
 * 
 * @param {Event} event - The form submission event.
 * @param {Function} setLoggedIn - State setter function to update the logged-in status.
 * @param {Function} setUserId - State setter function to update the user ID.
 */
const handleLogin = async (event, setLoggedIn, setUserId) => {
  event.preventDefault();
  const formData = new FormData(event.target);

  try {
    const response = await axios.get('https://ztiback.test.azuremicroservices.io/spring-app-20240503182447/default/login', {
      params: { email: formData.get('email'), password: formData.get('password') }
    });

    document.getElementById('confirmationText').innerHTML = response.data.b;
    if (response.data.a > 0) {
      setUserId(response.data.a)
      setLoggedIn(true);
    }
  } catch (error) {
    console.error(error);
  }
};

/**
 * Component for the login form.
 * 
 * @param {Object} props - Props object containing state setters.
 * @param {Function} props.setLoggedIn - State setter function to update the logged-in status.
 * @param {Function} props.setUserId - State setter function to update the user ID.
 * @returns {JSX.Element} Login form component.
 */
const LoginForm = ({ setLoggedIn, setUserId }) => {
  return (
    <div>
      <h1 className='formTitle'>Logowanie</h1>
      <form className="loginRegisterForm" onSubmit={(e) => handleLogin(e, setLoggedIn, setUserId)}>
        <table>
          <tbody>
            <tr>
              <td>E-mail:</td><td><input type="email" name="email" required/></td>
            </tr>
            <tr>
              <td>Hasło:</td><td><input type="password" name="password" required/></td>
            </tr>
            <tr>
              <td></td><td><input type="submit" value="Zaloguj się"/></td>
            </tr>
          </tbody>
        </table>
      </form>
      <p id='confirmationText'></p>
    </div>
  );
};

export default LoginForm;
