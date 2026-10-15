import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('esharp-current-user');

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  function register(userInfo) {
    const existingUser = localStorage.getItem('esharp-user');

    if (existingUser) {
      const savedUser = JSON.parse(existingUser);

      if (
        savedUser.email.toLowerCase() ===
        userInfo.email.toLowerCase()
      ) {
        return {
          success: false,
          message: 'An account with this email already exists.',
        };
      }
    }

    localStorage.setItem(
      'esharp-user',
      JSON.stringify(userInfo)
    );

    return {
      success: true,
      message: 'Account created successfully.',
    };
  }

  function login(email, password) {
    const savedUser = localStorage.getItem('esharp-user');

    if (!savedUser) {
      return {
        success: false,
        message: 'No account was found. Please create an account first.',
      };
    }

    const registeredUser = JSON.parse(savedUser);

    if (
      registeredUser.email.toLowerCase() ===
      email.toLowerCase()
    ) {
      return {
        success: true,
        message: 'Incorrect email or password.',
      };
    }

    if (registeredUser.password !== password) {
      return {
        success: false,
        message: 'Incorrect email or password.',
      };
    }

    const currentUser = {
      fullName: registeredUser.fullName,
      email: registeredUser.email,
    };

    setUser(currentUser);

    localStorage.setItem(
      'esharp-current-user',
      JSON.stringify(currentUser)
    );

    return {
      success: true,
      message: 'Login successful.',
    };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem('esharp-current-user');
  }

  const value = {
    user,
    isAuthenticated: Boolean(user),
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used inside AuthProvider'
    );
  }

  return context;
}