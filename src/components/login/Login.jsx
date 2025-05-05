import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { inputValidation } from '../../data/validate.js'; 

const Login = () => {
  const [errorMessage, setErrorMessage] = useState({ username: '', password: '' });
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate(); 

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    const validationResult = inputValidation({ [name]: value });

    // Update error messages
    setErrorMessage((prev) => ({
      ...prev,
      [name]: validationResult.message[name]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const validationResult = inputValidation(formData);
    if (validationResult.formIsValid) {
      console.log('Form is valid, proceed with login');

    
      setTimeout(() => {
        navigate("/toys");
      }, 1500);
    } else {
      setErrorMessage(validationResult.message);
    }
  };

  return (
    <div className="login">
      <h2>Admin login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label" htmlFor="username">
          Användarnamn
        </label>
        <input
          className="login-input"
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        {errorMessage.username && (
          <p className="error-message">{errorMessage.username}</p>
        )}

        <label className="login-label" htmlFor="password">
          Lösenord
        </label>
        <input
          className="login-input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        {errorMessage.password && (
          <p className="error-message">{errorMessage.password}</p>
        )}

        <button 
         className="login-button" type="submit">
          Logga in
        </button>
      </form>
    </div>
  );
};

export default Login;