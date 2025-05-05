import './Login.css';

const Login = () => {

    return (
        <div className="login">
            <h2>Admin login</h2>
            <form className="login-form">
                <label
                className='login-label' 
                htmlFor="username">Användarnamn</label>

                <input 
                className='login-input'
                type="text" 
                name="username" 
                required />

                <label 
                className='login-label'
                htmlFor="password">Lösenord</label>

                <input 
                className='login-input'
                type="password"
                name="password" 
                required />

                <button 
                className='login-button'
                type="submit">Logga in
                </button>
        
            </form>
            </div>
)}
export default Login
