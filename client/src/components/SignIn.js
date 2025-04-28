import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthUser } from '../security/AuthContext';
function SignIn() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuthUser(); // use AuthContext

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!formData.username || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    try {
      // Send credentials to your authentication API
      await login(formData.username, formData.password); // Replace it with a call to the login method in the AuthContext

      // Successful authentication
      console.log('Login successful');

      // Store the authentication token (adjust based on your API response)
      //localStorage.setItem('authToken', data.token);
      //localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect to home/dashboard
      navigate('/itemlist');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container" role="region" aria-label="Sign in form">
      <div className="auth-card">
        <h1 id="signin-heading">Sign In to Weiter</h1>

        {error && <div className="auth-error" role="alert">{error}</div>}

        <form onSubmit={handleSubmit} aria-labelledby="signin-heading">
          <div className="form-group">
            <label id="username-label">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
              disabled={isLoading}
              aria-labelledby="username-label"
              aria-required="true"
              aria-describedby="username-hint"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" id="password-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={isLoading}
              aria-labelledby="password-label"
              aria-required="true"
              aria-describedby="password-hint"
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <p>New to Weiter? <Link to="/signup" aria-label="Create a new Weiter account">Create an account</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
