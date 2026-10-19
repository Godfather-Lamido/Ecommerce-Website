
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

import AuthLayout from '../../components/auth/AuthLayout';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail } from '../../utils/validation';

import './Login.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [authFailed, setAuthFailed] = useState(false);

  const email = userInfo.email.trim();

  const isEmailEmpty = email === '';
  const isEmailValid = isValidEmail(email);
  const isPasswordEmpty = userInfo.password === '';

  const showEmailError = submitted || touched.email;
  const showPasswordError = submitted || touched.password;

  const emailHasError =
    showEmailError && (isEmailEmpty || !isEmailValid);

  const passwordHasError =
    showPasswordError && isPasswordEmpty;

  function handleChange(event) {
    const { name, value } = event.target;

    setUserInfo((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage('');
    setAuthFailed(false);
  }

  function handleBlur(event) {
    const { name } = event.target;

    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(true);
    setMessage('');
    setAuthFailed(false);

    if (isEmailEmpty || !isEmailValid || isPasswordEmpty) {
      return;
    }

    const result = login(email, userInfo.password);

    if (!result.success) {
      setAuthFailed(true);
      setMessage(
        result.message || 'Email or password is incorrect.'
      );
      return;
    }

    navigate('/account');
  }

  return (
    <AuthLayout>
      <div className="auth-content">
        <div className="auth-heading">
          <h1>Welcome back</h1>
          <p>
            Sign in to continue shopping with E-Sharp.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <label className="auth-field">
            <span>Email</span>

            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="user@example.com"
              autoComplete="email"
              aria-invalid={emailHasError || authFailed}
              aria-describedby={
                emailHasError
                  ? 'login-email-error'
                  : authFailed
                    ? 'login-auth-error'
                    : undefined
              }
              className={
                emailHasError || authFailed
                  ? 'input-error'
                  : ''
              }
            />

            {showEmailError && isEmailEmpty && (
              <span
                id="login-email-error"
                className="field-error"
              >
                Email is required.
              </span>
            )}

            {showEmailError &&
              !isEmailEmpty &&
              !isEmailValid && (
                <span
                  id="login-email-error"
                  className="field-error"
                >
                  Enter a valid email address.
                </span>
              )}
          </label>

          <label className="auth-field">
            <span>Password</span>

            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={userInfo.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-invalid={
                  passwordHasError || authFailed
                }
                aria-describedby={
                  passwordHasError
                    ? 'login-password-error'
                    : authFailed
                      ? 'login-auth-error'
                      : undefined
                }
                className={
                  passwordHasError || authFailed
                    ? 'input-error'
                    : ''
                }
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword((previous) => !previous)
                }
                aria-label={
                  showPassword ? 'Hide password' : 'Show password'
                }
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {showPasswordError && isPasswordEmpty && (
              <span
                id="login-password-error"
                className="field-error"
              >
                Password is required.
              </span>
            )}
          </label>

          <div className="forgot-password">
            <Link to="/forgot-password">
              Forgot password?
            </Link>
          </div>

          {message && (
            <p
              id="login-auth-error"
              className="auth-message"
              role="alert"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className="primary-btn large-btn full-width"
          >
            Sign in
          </button>
        </form>

        <p className="auth-link">
          Don't have an account?{' '}
          <Link to="/register">Create one</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
