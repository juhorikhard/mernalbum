import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import './css/styles.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { AuthContext, AuthContextProvider } from './hooks/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';

const AppRoutes = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

function App() {
  return (
    <div
  className="min-h-screen bg-center bg-fixed"
  style={{
    backgroundImage: "url('/images/image.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
  }}
>


      <div className="min-h-screen bg-black bg-opacity-50">
        <AuthContextProvider>
          <BrowserRouter>
            <Navbar />
            <div className="pages">
              <AppRoutes />
            </div>
          </BrowserRouter>
        </AuthContextProvider>
      </div>
    </div>
  );
}

export default App;