import './Login.css';
import { useState } from 'react';
import { useToyStore } from '../../data/toyStore.js';
import { useNavigate } from 'react-router';
import { inputValidation } from '../../data/validate.js'; 

const Login = () => {
  const [errorMessage, setErrorMessage] = useState({ username: '', password: '' });
  
  const [formData, setFormData] = useState({ username: '', password: '' });
  
  const navigate = useNavigate(); 

  const { isLoggedIn, setIsLoggedIn } = useToyStore(); 

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
      console.log('Admin is logged in'); 

      setIsLoggedIn(true);

    } else {
      console.log('Login failed'); 
     setErrorMessage(validationResult.message);
    }

    setTimeout(() => {
    navigate("/toys");
    }, 1500);

  };
  

  return (
    <div className="login-container">
      <h2>Admin login</h2>
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit}>
          <p className='username'>Användarnamn</p>
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

        <p className='password'>Lösenord</p> 
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
    </div>
  );
};

export default Login;