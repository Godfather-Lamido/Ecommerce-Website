import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import { isValidEmail } from '../../utils/validation'
import './ForgotPassword.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isEmailEmpty = email.trim() === '';

const isEmailValid = isValidEmail(email);

  const isFormValid =
    !isEmailEmpty && isEmailValid;

  function handleSubmit(event) {
    event.preventDefault();

    setTouched(true);

    if (!isFormValid) {
      return;
    }

    setSubmitted(true);
  }

  return (
    <AuthLayout>
      <div className="auth-content">

        {!submitted ? (
          <>
            <div className="auth-heading">
              <h1>Forgot your password?</h1>

              <p>
                Enter the email associated with your
                E-Sharp account and we'll help you reset
                your password.
              </p>
            </div>

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setTouched(true);
                  }}
                  placeholder="you@example.com"
                  className={
                    touched &&
                    (isEmailEmpty || !isEmailValid)
                      ? 'input-error'
                      : ''
                  }
                />

                {touched && isEmailEmpty && (
                  <span className="field-error">
                    Email is required.
                  </span>
                )}

                {touched &&
                  !isEmailEmpty &&
                  !isEmailValid && (
                    <span className="field-error">
                      Enter a valid email address.
                    </span>
                  )}
              </label>

              <button
                type="submit"
                className="primary-btn large-btn full-width"
              >
                Send reset link
              </button>

            </form>

            <p className="auth-link">
              Remember your password?{' '}
              <Link to="/login">
                Log in
              </Link>
            </p>
          </>
        ) : (
          <div className="reset-success">
            <h1>Check your email</h1>

            <p>
              If an account exists for{' '}
              <strong>{email}</strong>, a password
              reset link would be sent to that address.
            </p>

            <Link
              to="/login"
              className="primary-btn large-btn full-width"
            >
              Back to login
            </Link>
          </div>
        )}

      </div>
    </AuthLayout>
  );
}