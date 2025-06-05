import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Offer from './pages/Offer/Offer';
import SignupModal from './components/SignupModal/SignupModal';
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/signup" element={<SignupModal />} />
      </Routes>
    </Router>
  );
}

export default App;
