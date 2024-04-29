import './LoginRegister.css';
import axios from 'axios';

async function handleRegistration(d) {
  d.preventDefault()
  const formData = new FormData(d.target);
  const newAppUser = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    const response = await axios.post('http://localhost:8080/register', newAppUser);
    document.getElementById('confirmationText').innerHTML = response.data;
  } catch (error) {
    console.log(error);
  }
}

function RegistrationForm() {
  return (
    <div>
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
      <p id='confirmationText'></p>
    </div>
  );
}

export default RegistrationForm;
