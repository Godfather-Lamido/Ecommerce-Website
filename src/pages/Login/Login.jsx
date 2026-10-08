import { Link } from 'react-router-dom';

export default function LoginPage() {
  return (
    <div className="page-shell narrow-shell">
      <div className="card auth-card">
        <h1>Login</h1>
        <form className="checkout-form">
          <label>
            Email
            <input type="email" defaultValue="hello@example.com" />
          </label>
          <label>
            Password
            <input type="password" defaultValue="password123" />
          </label>
          <button type="submit" className="primary-btn large-btn full-width">Sign in</button>
        </form>
        <p className="auth-link">
          Don’t have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}
