import React, { useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';

/**
 * RegistrationForm component allows users to register by providing their email and password.
 * 
 * @returns {JSX.Element} JSX representation of the RegistrationForm component.
 */
const RegistrationForm = () => {
  // State variable to store confirmation message after registration
  const [confirmationMessage, setConfirmationMessage] = useState('');

  /**
   * Event handler function to handle registration form submission.
   * Sends a POST request to the server to register a new user.
   * 
   * @param {Event} event - The event object representing the form submission event.
   */
  const handleRegistration = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newAppUser = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const response = await axios.post('https://ztiback.test.azuremicroservices.io/spring-app-20240503182447/default/register', newAppUser);
      setConfirmationMessage(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div id='form'>
      <h1 className='formTitle'>Rejestracja</h1>
      <form className="loginRegisterForm" onSubmit={handleRegistration}>
        <table>
          <tbody>
            <tr>
              <td>E-mail:</td><td><input type="email" name="email" required/></td>
            </tr>
            <tr>
              <td>Hasło:</td><td><input type="password" name="password" required/></td>
            </tr>
            <tr>
              <td></td><td><input type="submit" value="Zarejestruj się"/></td>
            </tr>
          </tbody>
        </table>
      </form>
      {/* Display confirmation message */}
      <p id='confirmationText'>{confirmationMessage}</p>
    </div>
  );
};

export default RegistrationForm;
