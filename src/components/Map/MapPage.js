import { useState, useEffect } from "react";
import Search from "../Search/Search";
import MapView from "./MapView";
import "./MapPage.css";

const MapPage = () => {
  
  const defaultLocation = {
    lat: 19.076,
    lon: 72.8777,
    display_name: "Mumbai",
  };

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const [selectedLocation, setSelectedLocation] = useState(defaultLocation);

  return (
    <div className="map-page">
      <div className="map-page-section">
        <MapView position={selectedLocation} />
        <Search onLocationSelect={setSelectedLocation} />
      </div>
    </div>
  );
};

export default MapPage;