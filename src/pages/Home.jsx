import { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://lereacteur-vinted-api.herokuapp.com/offers');
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
        <div className="hero-content">
          <h1>Prêts à faire du tri dans vos placards ?</h1>
          <button>Commencer à vendre</button>
        </div>
      </div>

      {isLoading ? (
        <p>Chargement en cours...</p>
      ) : (
        <div className="offers-container">
          {offers.map((offer) => (
            <div key={offer._id} className="offer-card">
              <div className="offer-owner">
                {offer.owner && offer.owner.account && (
                  <span>{offer.owner.account.username}</span>
                )}
              </div>
              <div className="offer-image">
                <img src={offer.product_image.secure_url} alt={offer.product_name} />
              </div>
              <div className="offer-details">
                <span className="offer-price">{offer.product_price} €</span>
                <span className="offer-size">{offer.product_details[1].TAILLE}</span>
                <span className="offer-brand">{offer.product_details[0].MARQUE}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;