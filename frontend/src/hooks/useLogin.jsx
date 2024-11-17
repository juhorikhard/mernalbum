import { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useContext(AuthContext);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      return;
    }

    // Save the user to local storage
    localStorage.setItem('user', JSON.stringify(json));

    // Dispatch the LOGIN action
    dispatch({ type: 'LOGIN', payload: json });

    setIsLoading(false);
  };

  return { login, isLoading, error };
};
