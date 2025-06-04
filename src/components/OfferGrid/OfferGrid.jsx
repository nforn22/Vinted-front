import './OfferGrid.css';

const offers = [
  {
    id: 1,
    username: 'Ruth_Homenick6',
    image: 'https://via.placeholder.com/250x320',
    price: '10 €',
    size: 'M / 38 / 10',
    brand: 'JENNYFER',
  },
  {
    id: 2,
    username: 'Lawson73',
    image: 'https://via.placeholder.com/250x320',
    price: '10 €',
    size: 'TAILLE UNIQUE',
    brand: 'VINTAGE',
  },
  {
    id: 3,
    username: 'Ethelyn_Pacocha96',
    image: 'https://via.placeholder.com/250x320',
    price: '10 €',
    size: 'S',
    brand: 'THE NORTH FACE',
  },
  {
    id: 4,
    username: 'rajae1',
    image: 'https://via.placeholder.com/250x320',
    price: '10 €',
    size: 'L',
    brand: 'stradivarius',
  },
  {
    id: 5,
    username: 'rajae1',
    image: 'https://via.placeholder.com/250x320',
    price: '10 €',
    size: 'L',
    brand: 'stradivarius',
  },
];

function OfferGrid() {
  return (
    <div className="offer-grid">
      {offers.map((offer) => (
        <div className="offer-card" key={offer.id}>
          <div className="offer-owner">
            <span>{offer.username}</span>
          </div>
          <div className="offer-image">
            <img src={offer.image} alt="Produit" />
          </div>
          <div className="offer-details">
            <span className="offer-price">{offer.price}</span>
            <span className="offer-size">{offer.size}</span>
            <span className="offer-brand">{offer.brand}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OfferGrid; 