import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Offer from './pages/Offer/Offer';
import SignupModal from './components/SignupModal/SignupModal';
import Publish from './pages/Publish/Publish';
import './App.css';

function App() {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) setUserToken(token);
  }, []);

  return (
    <Router>
      <Header userToken={userToken} setUserToken={setUserToken} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route path="/publish" element={userToken ? <Publish /> : <Navigate to="/" />} />
        <Route path="/signup" element={<SignupModal />} />
      </Routes>
    </Router>
  );
}

export default App;
