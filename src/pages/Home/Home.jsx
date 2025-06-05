import { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css';
import homeImg from '../../assets/home-img.jpg';
import OfferGrid from '../../components/OfferGrid/OfferGrid';

export const API_URL = "https://site--backend-vinted--t29qzrn4njwx.code.run";

function Home() {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/offers`);
        setOffers(response.data.offers);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="home-container">
      <div className="hero">
        <div className="hero-image">
          <img src={homeImg} alt="Vinted Hero" />
        </div>
        <div className="hero-content">
          <div className="hero-text-box">
            <h1>Prêts à faire du tri dans vos placards ?</h1>
            <button className="hero-button">Commencer à vendre</button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading">
          <p>Chargement en cours...</p>
        </div>
      ) : (
        <OfferGrid offers={offers} />
      )}
    </div>
  );
}

export default Home; 