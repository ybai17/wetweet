import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

    // Client-side validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      // On successful registration (HTTP 201)
      window.alert('Registration successful! You will be redirected to login.');
      navigate('/signin', {
        state: {
          registrationSuccess: true,
          username: formData.username
        }
      });

    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container" role="region" aria-label="Create user">
      <div className="auth-card">
        <h1 id="signup-heading">Create Your Account</h1>

        {error && <div className="auth-error" role="alert">{error}</div>}

        <form onSubmit={handleSubmit} aria-labelledby="signup-form">
          <div className="form-group">
            <label id="username-label">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
              disabled={isLoading}
              aria-labelledby="username-label"
              aria-required="true"
              aria-describedby="username-hint"
            />
          </div>

          <div className="form-group">
            <label id="email-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              required
              disabled={isLoading}
              aria-labelledby="email-label"
              aria-required="true"
              aria-describedby="email-hint"
            />
          </div>

          <div className="form-group">
            <label id="password-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
              disabled={isLoading}
              aria-labelledby="password-label"
              aria-required="true"
              aria-describedby="password-hint"
            />
          </div>

          <div className="form-group">
            <label id="confirmPassword-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Enter your password again"
              required
              disabled={isLoading}
              aria-labelledby="confirmPassword-label"
              aria-required="true"
              aria-describedby="confirmPassword-hint"
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/signin" aria-label="Link to sign in page">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
