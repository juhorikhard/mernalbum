import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export const useLogout = () => {
  const { dispatch } = useContext(AuthContext); // Get dispatch from AuthContext

  const logout = () => {
    // Remove the user from localStorage
    localStorage.removeItem('user');

    // Dispatch the LOGOUT action
    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};