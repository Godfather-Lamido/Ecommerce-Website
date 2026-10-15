import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail } from '../../utils/validation'
import './Register.css';


export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [touched, setTouched] = useState({});

  const [message, setMessage] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;

    setUserInfo((previous) => ({
      ...previous,
      [name]: value,
    }));

    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));

    setMessage('');
  }

  const isNameEmpty = userInfo.fullName.trim() === '';
  const isEmailEmpty = userInfo.email.trim() === '';
  const isEmailValid = isValidEmail(userInfo.email);
  const isPasswordEmpty = userInfo.password === '';
  const isPasswordValid = userInfo.password.length >= 8;

  const isConfirmPasswordEmpty =
    userInfo.confirmPassword === '';

  const passwordsMatch =
    userInfo.password === userInfo.confirmPassword;

  const isFormValid =
    !isNameEmpty &&
    !isEmailEmpty &&
    isEmailValid &&
    !isPasswordEmpty &&
    isPasswordValid &&
    !isConfirmPasswordEmpty &&
    passwordsMatch;

  function handleSubmit(event) {
    event.preventDefault();

    setTouched({
      fullName: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (!isFormValid) {
      return;
    }

    const result = register({
      fullName: userInfo.fullName.trim(),
      email: userInfo.email.trim(),
      password: userInfo.password,
    });

    if (!result.success) {
      setMessage(result.message);
      return;
    }

    navigate('/login');
  }

  return (
    <AuthLayout>
      <div className="auth-content">

        <div className="auth-heading">
          <h1>Create your account</h1>
          <p>
            Join E-Sharp and start shopping with ease.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <label>
            Full name
            <input
              type="text"
              name="fullName"
              value={userInfo.fullName}
              onChange={handleChange}
              placeholder="Your full name"
              className={
                touched.fullName && isNameEmpty
                  ? 'input-error'
                  : ''
              }
            />

            {touched.fullName && isNameEmpty && (
              <span className="field-error">
                Full name is required.
              </span>
            )}
          </label>

          <label>
            Email
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={
                touched.email &&
                (isEmailEmpty || !isEmailValid)
                  ? 'input-error'
                  : ''
              }
            />

            {touched.email && isEmailEmpty && (
              <span className="field-error">
                Email is required.
              </span>
            )}

            {touched.email &&
              !isEmailEmpty &&
              !isEmailValid && (
                <span className="field-error">
                  Enter a valid email address.
                </span>
              )}
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              className={
                touched.password &&
                (isPasswordEmpty || !isPasswordValid)
                  ? 'input-error'
                  : ''
              }
            />

            {touched.password && isPasswordEmpty && (
              <span className="field-error">
                Password is required.
              </span>
            )}

            {touched.password &&
              !isPasswordEmpty &&
              !isPasswordValid && (
                <span className="field-error">
                  Password must be at least 8 characters.
                </span>
              )}
          </label>

          <label>
            Confirm password
            <input
              type="password"
              name="confirmPassword"
              value={userInfo.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className={
                touched.confirmPassword &&
                (isConfirmPasswordEmpty || !passwordsMatch)
                  ? 'input-error'
                  : ''
              }
            />

            {touched.confirmPassword &&
              isConfirmPasswordEmpty && (
                <span className="field-error">
                  Please confirm your password.
                </span>
              )}

            {touched.confirmPassword &&
              !isConfirmPasswordEmpty &&
              !passwordsMatch && (
                <span className="field-error">
                  Passwords do not match.
                </span>
              )}
          </label>

          {message && (
            <p className="auth-message">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="primary-btn large-btn full-width"
          >
            Create account
          </button>

        </form>

        <p className="auth-link">
          Already have an account?{' '}
          <Link to="/login">
            Log in
          </Link>
        </p>

      </div>
    </AuthLayout>
  );
}

