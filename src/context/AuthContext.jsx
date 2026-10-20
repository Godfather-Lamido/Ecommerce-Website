
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const USERS_KEY = 'esharp-users';
const CURRENT_USER_KEY = 'esharp-current-user';
const LEGACY_USER_KEY = 'esharp-user';

// Read registered accounts and migrate the old single-account format.
function getRegisteredUsers() {
  try {
    const savedUsers = localStorage.getItem(USERS_KEY);

    if (savedUsers) {
      const users = JSON.parse(savedUsers);
      return Array.isArray(users) ? users : [];
    }

    const legacyUser = localStorage.getItem(LEGACY_USER_KEY);

    if (legacyUser) {
      const user = JSON.parse(legacyUser);

      if (user && typeof user.email === 'string') {
        const users = [user];

        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return users;
      }
    }
  } catch {
    return [];
  }

  return [];
}

// Only expose non-password account details as the current user.
function createCurrentUser(user) {
  return {
    fullName: user.fullName,
    email: user.email,
  };
}

function getSavedCurrentUser() {
  try {
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);

    if (!savedUser) {
      return null;
    }

    const user = JSON.parse(savedUser);

    if (
      user &&
      typeof user.fullName === 'string' &&
      typeof user.email === 'string'
    ) {
      return createCurrentUser(user);
    }
  } catch {
    // Ignore invalid saved session data.
  }

  localStorage.removeItem(CURRENT_USER_KEY);
  return null;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSavedCurrentUser);

  function register(userInfo) {
    const users = getRegisteredUsers();
    const normalizedEmail = userInfo.email.trim().toLowerCase();

    const existingUser = users.find(
      (savedUser) =>
        savedUser.email.trim().toLowerCase() === normalizedEmail
    );

    if (existingUser) {
      return {
        success: false,
        message: 'An account with this email already exists. Please log in.',
      };
    }

    const newUser = {
      ...userInfo,
      email: normalizedEmail,
    };

    const updatedUsers = [...users, newUser];

    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    localStorage.removeItem(LEGACY_USER_KEY);

    // Automatically log in the newly registered customer.
    const currentUser = createCurrentUser(newUser);

    setUser(currentUser);
    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(currentUser)
    );

    return {
      success: true,
      message: 'Account created successfully.',
    };
  }

  function login(email, password) {
    const users = getRegisteredUsers();
    const normalizedEmail = email.trim().toLowerCase();

    const registeredUser = users.find(
      (savedUser) =>
        savedUser.email.trim().toLowerCase() === normalizedEmail
    );

    if (!registeredUser || registeredUser.password !== password) {
      return {
        success: false,
        message: 'Incorrect email or password.',
      };
    }

    const currentUser = createCurrentUser(registeredUser);

    setUser(currentUser);
    localStorage.setItem(
      CURRENT_USER_KEY,
      JSON.stringify(currentUser)
    );

    return {
      success: true,
      message: 'Login successful.',
    };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
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
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
