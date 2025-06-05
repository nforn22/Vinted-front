import './OfferGrid.css';

function OfferGrid({ offers }) {
  return (
    <div className="offer-grid">
      {offers.map((offer) => {
        const brand = offer.product_details.find((d) => d.MARQUE)?.MARQUE || '';
        const size = offer.product_details.find((d) => d.TAILLE)?.TAILLE || '';
        return (
          <div className="offer-card" key={offer._id}>
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
              <span className="offer-size">{size}</span>
              <span className="offer-brand">{brand}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default OfferGrid; 