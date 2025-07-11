import { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FaApple, FaFacebookF } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import axios from 'axios';
import './SignupModal.css';
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL || "https://site--backend-vinted--t29qzrn4njwx.code.run";

function SignupModal({ onClose, setUserToken }) {
  // step: 'start' (inscription choix), 'email' (formulaire), 'login' (connexion choix), 'loginForm' (formulaire de connexion)
  const [step, setStep] = useState('start');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // login form
  const [loginEmailOrUsername, setLoginEmailOrUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // fermer avec Escape (échap)
  useEffect(() => {
    function handleEsc(event) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // fermer si clic sur overlay
  function handleOverlayClick(event) {
    if (event.target.classList.contains('modal-overlay')) {
      onClose();
    }
  }

  // gestion du submit inscription
  async function handleSubmit(event) {
    event.preventDefault();
    let newErrors = {};
    if (!username) newErrors.username = "Nom d'utilisateur requis";
    if (!email) newErrors.email = "Email requis";
    if (!password) newErrors.password = "Mot de passe requis";
    if (password !== confirmPassword) newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    setLoading(true);
    setErrors({});
    try {
      const response = await axios.post(`${API_URL}/user/signup`, {
        username,
        email,
        password,
        newsletter,
      });
      setLoading(false);
      setSuccess(true);
      // stocke le token si présent dans la rep
      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 7 });
        setUserToken(response.data.token);
      }
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setNewsletter(false);
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.message) {
        setErrors({ api: error.response.data.message });
      } else {
        setErrors({ api: "Erreur lors de l'inscription" });
      }
    }
  }

  // gestion du submit login
  async function handleLogin(event) {
    event.preventDefault();
    setLoginError('');
    if (!loginEmailOrUsername || !loginPassword) {
      setLoginError('Veuillez remplir tous les champs');
      return;
    }
    setLoading(true);
    try {
      let response;
      try {
        response = await axios.post(`${API_URL}/user/login`, {
          email: loginEmailOrUsername,
          password: loginPassword,
        });
      } catch {
        response = await axios.post(`${API_URL}/user/login`, {
          email: '',
          username: loginEmailOrUsername,
          password: loginPassword,
        });
      }
      setLoading(false);
      if (response.data.token) {
        Cookies.set("token", response.data.token, { expires: 7 });
        setUserToken(response.data.token);
      }
      onClose();
    } catch (error) {
      setLoading(false);
      setLoginError(error.response?.data?.message || "Erreur lors de la connexion");
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} tabIndex={-1}>
      <div className="modal signup-modal" role="dialog" aria-modal="true">
        <button className="modal-close" aria-label="Fermer" onClick={onClose}>
          &times;
        </button>
        {step === 'start' && (
          <>
            <h2 className="modal-title">Rejoins le mouvement de la seconde main et vends sans frais !</h2>
            <div className="social-buttons">
              <button className="social-btn apple" type="button">
                <FaApple className="social-icon" /> Continuer avec Apple
              </button>
              <button className="social-btn google" type="button">
                <FcGoogle className="social-icon" /> Continuer avec Google
              </button>
              <button className="social-btn facebook" type="button">
                <FaFacebookF className="social-icon facebook-icon" /> Continuer avec Facebook
              </button>
            </div>
            <div className="signup-or-email">
              Ou inscris-toi avec <span className="signup-email-link" onClick={() => setStep('email')}>ton adresse e-mail</span>
            </div>
            <div className="signup-switch">
              Tu as déjà un compte ? <span className="signup-switch-link" onClick={() => setStep('login')}>Se connecter</span>
            </div>
          </>
        )}
        {step === 'login' && (
          <>
            <h2 className="modal-title">Bienvenue !</h2>
            <div className="social-buttons">
              <button className="social-btn apple" type="button">
                <FaApple className="social-icon" /> Continuer avec Apple
              </button>
              <button className="social-btn google" type="button">
                <FcGoogle className="social-icon" /> Continuer avec Google
              </button>
              <button className="social-btn facebook" type="button">
                <FaFacebookF className="social-icon facebook-icon" /> Continuer avec Facebook
              </button>
            </div>
            <div className="signup-or-email">
              Ou connecte-toi avec ton <span className="signup-email-link" onClick={() => setStep('loginForm')}>e-mail</span>
            </div>
            <div className="signup-switch">
              Tu n'as pas de compte Vinted ? <span className="signup-switch-link" onClick={() => setStep('start')}>S'inscrire</span>
            </div>
          </>
        )}
        {step === 'loginForm' && (
          <>
            <h2 className="modal-title">Se connecter</h2>
            <form className="signup-form" onSubmit={handleLogin} autoComplete="off">
              <input
                type="text"
                placeholder="E-mail ou nom d'utilisateur"
                value={loginEmailOrUsername}
                onChange={event => setLoginEmailOrUsername(event.target.value)}
                aria-label="E-mail ou nom d'utilisateur"
              />
              <div className="password-container">
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  value={loginPassword}
                  onChange={event => setLoginPassword(event.target.value)}
                  aria-label="Mot de passe"
                />
                <span className="toggle-eye" onClick={() => setShowLoginPassword((prev) => !prev)} tabIndex={0} role="button" aria-label="Afficher ou masquer le mot de passe">
                  {showLoginPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              {loginError && <div className="error-message api-error">{loginError}</div>}
              <button type="submit" className="signup-btn" disabled={loading}>
                {loading ? 'Connexion...' : 'Continuer'}
              </button>
            </form>
            <div className="login-bottom-bar">
              <span className="signup-switch-link" tabIndex={0} role="button">Mot de passe oublié ?</span>
            </div>
          </>
        )}
        {step === 'email' && (
          <>
            <h2 className="modal-title">Créer un compte</h2>
            <form className="signup-form" onSubmit={handleSubmit} autoComplete="off">
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={event => setUsername(event.target.value)}
                className={errors.username ? 'input-error' : ''}
                aria-label="Nom d'utilisateur"
              />
              {errors.username && <div className="error-message">{errors.username}</div>}

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                className={errors.email ? 'input-error' : ''}
                aria-label="Email"
              />
              {errors.email && <div className="error-message">{errors.email}</div>}

              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Mot de passe"
                  value={password}
                  onChange={event => setPassword(event.target.value)}
                  className={errors.password ? 'input-error' : ''}
                  aria-label="Mot de passe"
                />
                <span className="toggle-eye" onClick={() => setShowPassword((prev) => !prev)} tabIndex={0} role="button" aria-label="Afficher ou masquer le mot de passe">
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              {errors.password && <div className="error-message">{errors.password}</div>}

              <div className="password-container">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Vérifier mot de passe"
                  value={confirmPassword}
                  onChange={event => setConfirmPassword(event.target.value)}
                  className={errors.confirmPassword ? 'input-error' : ''}
                  aria-label="Vérifier mot de passe"
                />
                <span className="toggle-eye" onClick={() => setShowConfirmPassword((prev) => !prev)} tabIndex={0} role="button" aria-label="Afficher ou masquer le mot de passe">
                  {showConfirmPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>
              {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}

              <label className="newsletter-label">
                <input
                  type="checkbox"
                  checked={newsletter}
                  onChange={event => setNewsletter(event.target.checked)}
                />
                S'inscrire à notre newsletter
              </label>
              <div className="signup-info-text">
                En m'inscrivant je confirme avoir lu et accepté les Termes & Conditions et Politique de Confidentialité de Vinted. Je confirme avoir au moins 18 ans.
              </div>
              {errors.api && <div className="error-message api-error">{errors.api}</div>}
              <button type="submit" className="signup-btn" disabled={loading}>
                {loading ? 'Inscription...' : "S'inscrire"}
              </button>
              {success && <div className="success-message">Inscription réussie !</div>}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default SignupModal;
