import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Offer.css';

const API_URL = import.meta.env.VITE_API_URL || "https://site--backend-vinted--t29qzrn4njwx.code.run";

function Offer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`${API_URL}/offers/${id}`);
        setOffer(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'offre:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOffer();
  }, [id]);

  const handleBuy = () => {
    if (!offer) return;
    
    navigate("/payment", {
      state: {
        title: offer.product_name,
        price: offer.product_price,
        id: offer._id,
        image: offer.product_image?.secure_url,
        brand: offer.product_details.find(detail => detail.MARQUE)?.MARQUE,
        size: offer.product_details.find(detail => detail.TAILLE)?.TAILLE,
        condition: offer.product_details.find(detail => detail.ETAT)?.ETAT,
        color: offer.product_details.find(detail => detail.COULEUR)?.COULEUR,
        city: offer.product_details.find(detail => detail.EMPLACEMENT)?.EMPLACEMENT,
      }
    });
  };

  if (isLoading) {
    return <div className="loading"><p>Chargement en cours...</p></div>;
  }

  if (!offer) {
    return <div className="error"><p>Annonce non trouvée</p></div>;
  }

  const brand = offer.product_details.find((detail) => detail.MARQUE)?.MARQUE || '';
  const size = offer.product_details.find((detail) => detail.TAILLE)?.TAILLE || '';
  const color = offer.product_details.find((detail) => detail.COULEUR)?.COULEUR || '';
  const location = offer.product_details.find((detail) => detail.EMPLACEMENT)?.EMPLACEMENT || '';

  return (
    <div className="offer-page">
      <div className="offer-container">
        <div className="offer-image-section">
          <img src={offer.product_image.secure_url} alt={offer.product_name} />
        </div>
        <div className="offer-info-section">
          <div className="offer-price">{offer.product_price} €</div>
          <div className="offer-details">
            {brand && (
              <div className="detail-row"><span className="detail-label">Marque</span><span className="detail-value">{brand}</span></div>
            )}
            {size && (
              <div className="detail-row"><span className="detail-label">Taille</span><span className="detail-value">{size}</span></div>
            )}
            {color && (
              <div className="detail-row"><span className="detail-label">Couleur</span><span className="detail-value">{color}</span></div>
            )}
            {location && (
              <div className="detail-row"><span className="detail-label">Emplacement</span><span className="detail-value">{location}</span></div>
            )}
          </div>
          <div className="product-info">
            <div className="product-name">{offer.product_name}</div>
            <div className="product-description">{offer.product_description}</div>
          </div>
          <div className="owner-info">
            {offer.owner.account.avatar ? (
              <div className="owner-avatar">
                <img src={offer.owner.account.avatar.secure_url} alt={offer.owner.account.username} />
              </div>
            ) : (
              <div className="avatar-placeholder">{offer.owner.account.username[0].toUpperCase()}</div>
            )}
            <span className="owner-name">{offer.owner.account.username}</span>
          </div>
          <button className="buy-button" onClick={handleBuy}>Acheter</button>
        </div>
      </div>
    </div>
  );
}

export default Offer; 