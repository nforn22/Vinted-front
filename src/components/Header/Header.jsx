import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import logo from '../../assets/logo-vinted.png';
import './Header.css';
import SignupModal from '../SignupModal/SignupModal';
import Cookies from "js-cookie";

function Header({ userToken, setUserToken }) {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  function handleLogout() {
    Cookies.remove("token");
    setUserToken(null);
  }

  return (
    <header>
      <div className="header-container">
        <Link to="/" className="logo">
          <img src={logo} alt="Vinted" />
        </Link>
        
        <div className="search-container">
          <div className="search-bar">
            <IoSearchOutline className="search-icon" />
            <input 
              type="text" 
              placeholder="Recherche des articles"
              className="search-input"
            />
          </div>
        </div>

        <div className="buttons-container">
          {!userToken ? (
            <button className="signup-combined-btn" onClick={() => setIsSignupOpen(true)}>
              <span className="signup-part">S'inscrire</span>
              <span className="login-part">Se connecter</span>
            </button>
          ) : (
            <button className="btn-outline" onClick={handleLogout}>
              Se déconnecter
            </button>
          )}
          <button className="btn-primary">Vends tes articles</button>
        </div>
      </div>
      {isSignupOpen && (
        <SignupModal onClose={() => setIsSignupOpen(false)} setUserToken={setUserToken} />
      )}
    </header>
  );
}

export default Header; 