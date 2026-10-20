import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

import AuthLayout from '../../components/auth/AuthLayout';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail } from '../../utils/validation';

import './Register.css';

export default function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();

  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');

  const fullName = userInfo.fullName.trim();
  const email = userInfo.email.trim();

  const isNameEmpty = fullName === '';
  const isEmailEmpty = email === '';
  const isEmailValid = isValidEmail(email);

  const isPasswordEmpty = userInfo.password === '';
  const isPasswordValid = userInfo.password.length >= 8;

  const isConfirmPasswordEmpty =
    userInfo.confirmPassword === '';

  const passwordsMatch =
    userInfo.password === userInfo.confirmPassword;

  const showNameError = submitted || touched.fullName;
  const showEmailError = submitted || touched.email;
  const showPasswordError = submitted || touched.password;
  const showConfirmPasswordError =
    submitted || touched.confirmPassword;

  const isFormValid =
    !isNameEmpty &&
    !isEmailEmpty &&
    isEmailValid &&
    !isPasswordEmpty &&
    isPasswordValid &&
    !isConfirmPasswordEmpty &&
    passwordsMatch;

  function handleChange(event) {
    const { name, value } = event.target;

    setUserInfo((previous) => ({
      ...previous,
      [name]: value,
    }));

    setMessage('');
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
      fullName,
      email,
      password: userInfo.password,
    });

    if (!result.success) {
      setMessage(
        result.message ||
          'Unable to create your account. Please try again.'
      );
      return;
    }

    const destination = location.state?.from;

    navigate(
      destination?.pathname ? destination : '/account',
      { replace: true }
    );
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
          noValidate
        >
          <label className="auth-field">
            <span>Full name</span>

            <input
              type="text"
              name="fullName"
              value={userInfo.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your full name"
              autoComplete="name"
              aria-invalid={showNameError && isNameEmpty}
              aria-describedby={
                showNameError && isNameEmpty
                  ? 'register-name-error'
                  : undefined
              }
              className={
                showNameError && isNameEmpty
                  ? 'input-error'
                  : ''
              }
            />

            {showNameError && isNameEmpty && (
              <span
                id="register-name-error"
                className="field-error"
              >
                Full name is required.
              </span>
            )}
          </label>

          <label className="auth-field">
            <span>Email</span>

            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={
                showEmailError &&
                (isEmailEmpty || !isEmailValid)
              }
              aria-describedby={
                showEmailError &&
                (isEmailEmpty || !isEmailValid)
                  ? 'register-email-error'
                  : undefined
              }
              className={
                showEmailError &&
                (isEmailEmpty || !isEmailValid)
                  ? 'input-error'
                  : ''
              }
            />

            {showEmailError && isEmailEmpty && (
              <span
                id="register-email-error"
                className="field-error"
              >
                Email is required.
              </span>
            )}

            {showEmailError &&
              !isEmailEmpty &&
              !isEmailValid && (
                <span
                  id="register-email-error"
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
                placeholder="At least 8 characters"
                autoComplete="new-password"
                aria-invalid={
                  showPasswordError &&
                  (isPasswordEmpty || !isPasswordValid)
                }
                aria-describedby={
                  showPasswordError &&
                  (isPasswordEmpty || !isPasswordValid)
                    ? 'register-password-error'
                    : undefined
                }
                className={
                  showPasswordError &&
                  (isPasswordEmpty || !isPasswordValid)
                    ? 'input-error'
                    : ''
                }
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    (previous) => !previous
                  )
                }
                aria-label={
                  showPassword
                    ? 'Hide password'
                    : 'Show password'
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
                id="register-password-error"
                className="field-error"
              >
                Password is required.
              </span>
            )}

            {showPasswordError &&
              !isPasswordEmpty &&
              !isPasswordValid && (
                <span
                  id="register-password-error"
                  className="field-error"
                >
                  Password must be at least 8 characters.
                </span>
              )}
          </label>

          <label className="auth-field">
            <span>Confirm password</span>

            <div className="password-input-wrapper">
              <input
                type={
                  showConfirmPassword
                    ? 'text'
                    : 'password'
                }
                name="confirmPassword"
                value={userInfo.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Confirm your password"
                autoComplete="new-password"
                aria-invalid={
                  showConfirmPasswordError &&
                  (isConfirmPasswordEmpty || !passwordsMatch)
                }
                aria-describedby={
                  showConfirmPasswordError &&
                  (isConfirmPasswordEmpty || !passwordsMatch)
                    ? 'register-confirm-password-error'
                    : undefined
                }
                className={
                  showConfirmPasswordError &&
                  (isConfirmPasswordEmpty || !passwordsMatch)
                    ? 'input-error'
                    : ''
                }
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    (previous) => !previous
                  )
                }
                aria-label={
                  showConfirmPassword
                    ? 'Hide password'
                    : 'Show password'
                }
                aria-pressed={showConfirmPassword}
              >
                {showConfirmPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {showConfirmPasswordError &&
              isConfirmPasswordEmpty && (
                <span
                  id="register-confirm-password-error"
                  className="field-error"
                >
                  Please confirm your password.
                </span>
              )}

            {showConfirmPasswordError &&
              !isConfirmPasswordEmpty &&
              !passwordsMatch && (
                <span
                  id="register-confirm-password-error"
                  className="field-error"
                >
                  Passwords do not match.
                </span>
              )}
          </label>

          {message && (
            <p className="auth-message" role="alert">
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
          <Link
            to="/login"
            state={
              location.state?.from
                ? { from: location.state.from }
                : undefined
            }
          >
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
