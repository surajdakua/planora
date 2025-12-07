import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import About from './components/About/About';
import NavBar from './components/navigation/NavBar';
import Footer from './components/Footer/Footer';
import MapPage from './components/Map/MapPage';
import AboutWrapper from "./components/About/AboutWrapper";
import MapWithRouting from './components/routing/MapWithRouting';
import Contact from './components/Contact/Contact';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <NavBar />
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Navigate to="/about" replace />} />
            <Route path="/about" element={<AboutWrapper><About /></AboutWrapper>} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/planner" element={<MapWithRouting />} />
            <Route path="/support" element={<Contact />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;