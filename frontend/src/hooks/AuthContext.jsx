import { createContext, useReducer, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// Define the authReducer
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  // Check localStorage for user info when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    // Check if storedUser exists and is valid JSON
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        dispatch({ type: 'LOGIN', payload: parsedUser });
      } catch (e) {
        console.error('Failed to parse user from localStorage:', e);
        dispatch({ type: 'LOGOUT' }); // Reset state on parsing error
      }
    } else {
      localStorage.removeItem('user'); // Clean up invalid user data
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};