import React, { useState } from 'react';
import axios from 'axios';
import './LoginRegister.css';

const RegistrationForm = () => {
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleRegistration = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newAppUser = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const response = await axios.post('http://localhost:8080/register', newAppUser);
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
      <p id='confirmationText'>{confirmationMessage}</p>
    </div>
  );
};

export default RegistrationForm;
