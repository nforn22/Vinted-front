import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import logo from '../../assets/logo-vinted.png';
import './Header.css';
import SignupModal from '../SignupModal/SignupModal';

function Header() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);

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
          <button className="btn-outline" onClick={() => setIsSignupOpen(true)}>S'inscrire</button>
          <button className="btn-outline">Se connecter</button>
          <button className="btn-primary">Vends tes articles</button>
        </div>
      </div>
      {isSignupOpen && <SignupModal onClose={() => setIsSignupOpen(false)} />}
    </header>
  );
}

export default Header; 