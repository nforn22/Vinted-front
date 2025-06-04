import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Offer() {
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://lereacteur-vinted-api.herokuapp.com/offer/${id}`);
        setOffer(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="offer-page">
      {isLoading ? (
        <p>Chargement en cours...</p>
      ) : offer ? (
        <div className="offer-details">
          <div className="offer-image">
            <img src={offer.product_image.secure_url} alt={offer.product_name} />
          </div>
          <div className="offer-info">
            <h1>{offer.product_name}</h1>
            <p className="price">{offer.product_price} €</p>
            <div className="details">
              {offer.product_details.map((detail, i) => (
                <p key={i}>
                  {Object.keys(detail)[0]} : {Object.values(detail)[0]}
                </p>
              ))}
            </div>
            <div className="description">
              <h2>Description</h2>
              <p>{offer.product_description}</p>
            </div>
            <div className="owner">
              <p>Vendeur : {offer.owner.account.username}</p>
              {offer.owner.account.avatar && (
                <img
                  src={offer.owner.account.avatar.secure_url}
                  alt={offer.owner.account.username}
                  style={{ width: 50, borderRadius: '50%' }}
                />
              )}
            </div>
            <button>Acheter</button>
          </div>
        </div>
      ) : (
        <p>Annonce non trouvée</p>
      )}
    </div>
  );
}

export default Offer;