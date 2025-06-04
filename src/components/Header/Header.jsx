import { Link } from 'react-router-dom';
// import './Header.css';

function Header() {
  return (
    <header>
      <div className="header-container">
        <Link to="/">
          <div className="logo">Vinted</div>
        </Link>
        <div className="buttons-container">
          <button>S'inscrire</button>
          <button>Se connecter</button>
          <button>Vends tes articles</button>
        </div>
      </div>
    </header>
  );
}

export default Header; 