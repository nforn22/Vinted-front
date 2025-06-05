import './OfferGrid.css';
import { Link } from 'react-router-dom';

function OfferGrid({ offers }) {
  return (
    <div className="offer-grid">
      {offers.map((offer) => {
        const brand = offer.product_details.find((detail) => detail.MARQUE)?.MARQUE || '';
        const size = offer.product_details.find((detail) => detail.TAILLE)?.TAILLE || '';
        return (
          <Link to={`/offer/${offer._id}`} className="offer-card offer-link-reset" key={offer._id}>
            <div className="offer-owner">
              {offer.owner && offer.owner.account && (
                <>
                  {offer.owner.account.avatar ? (
                    <img
                      src={offer.owner.account.avatar.secure_url}
                      alt={offer.owner.account.username}
                      className="owner-avatar"
                    />
                  ) : (
                    <span className="avatar-placeholder">
                      {offer.owner.account.username[0].toUpperCase()}
                    </span>
                  )}
                  <span>{offer.owner.account.username}</span>
                </>
              )}
            </div>
            <div className="offer-image">
              <img src={offer.product_image.secure_url} alt={offer.product_name} />
            </div>
            <div className="offer-details">
              <span className="offer-price">{offer.product_price} €</span>
              <span className="offer-size">{size}</span>
              <span className="offer-brand">{brand}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default OfferGrid; 