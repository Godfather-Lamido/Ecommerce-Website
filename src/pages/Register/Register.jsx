import { Link } from 'react-router-dom';

export default function RegisterPage() {
  return (
    <div className="page-shell narrow-shell">
      <div className="card auth-card">
        <h1>Create account</h1>
        <form className="checkout-form">
          <label>
            Full name
            <input type="text" defaultValue="Jane Doe" />
          </label>
          <label>
            Email
            <input type="email" defaultValue="hello@example.com" />
          </label>
          <label>
            Password
            <input type="password" defaultValue="password123" />
          </label>
          <button type="submit" className="primary-btn large-btn full-width">Create account</button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
