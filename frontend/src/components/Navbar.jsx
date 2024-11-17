import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../hooks/AuthContext';
import { useLogout } from '../hooks/useLogout';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { logout } = useLogout();
  
  const handleLogout = () => {
    logout();
  };

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <h2>Melody Rater</h2>
        </Link>
      </div>
      <nav className="navbar-links">
        {user ? (
          <div>
            <span>{user.email}</span>
            <button onClick={handleLogout} className="nav-link">Logout</button>
          </div>
        ) : (
          <div>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link">Sign up</Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;