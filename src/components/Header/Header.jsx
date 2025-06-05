import { Link } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import logo from '../../assets/logo-vinted.png';
import './Header.css';

function Header() {
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
          <button className="btn-outline">S'inscrire</button>
          <button className="btn-outline">Se connecter</button>
          <button className="btn-primary">Vends tes articles</button>
        </div>
      </div>
    </header>
  );
}

export default Header; 