import React from 'react';
import './LoginRegister.css';
import axios from 'axios';

async function handleLogin(event, setLoggedIn) {
  event.preventDefault();
  const formData = new FormData(event.target);

  try {
    const response = await axios.get('http://localhost:8080/login', {
      params: { email: formData.get('email'), password: formData.get('password') }
    });

    document.getElementById('confirmationText').innerHTML = response.data.b;

    if (response.data.a) {
      setLoggedIn(true);
    }
  } catch (error) {
    console.log(error);
  }
}


function LoginForm({ setLoggedIn }) {
  return (
    <div>
      <h1 className='formTitle'>Logowanie</h1>
      <form className="loginRegisterForm" onSubmit={(e) => handleLogin(e, setLoggedIn)}>
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
}

export default LoginForm;
