import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import OfferGrid from './components/OfferGrid/OfferGrid';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={
          <>
            <div className="hero" style={{ backgroundColor: '#f5f5f5', height: '400px' }}></div>
            <OfferGrid />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
