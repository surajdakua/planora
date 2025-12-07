import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Polyline, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import axios from "axios";
import "./MapWithRouting.css";

function LocationSelector({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

export default function MapWithRouting() {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const handleMapClick = (coords) => {
    if (!from) setFrom(coords);
    else if (!to) setTo(coords);
    else {
      setFrom(coords);
      setTo(null);
      setRouteCoords([]);
      setRouteInfo(null);
    }
  };

  useEffect(() => {
    const fetchRoute = async () => {
      if (!from || !to) return;
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;
        const res = await axios.get(url);
        const route = res.data.routes[0];
        const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);
        setRouteCoords(coords);
        setRouteInfo({
          distance: (route.distance / 1000).toFixed(2),
          duration: (route.duration / 60).toFixed(1),
        });
      } catch (err) {
        console.error("Error fetching route:", err);
      }
    };
    fetchRoute();
  }, [from, to]);

  const handleSearch = async () => {
    try {
      if (fromQuery) {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${fromQuery}&format=json&limit=1`
        );
        if (res.data.length > 0) {
          setFrom({ lat: parseFloat(res.data[0].lat), lng: parseFloat(res.data[0].lon) });
        }
      }
      if (toQuery) {
        const res = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${toQuery}&format=json&limit=1`
        );
        if (res.data.length > 0) {
          setTo({ lat: parseFloat(res.data[0].lat), lng: parseFloat(res.data[0].lon) });
        }
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  return (
    <div className="map-routing-container">
      <div className="map-page-section-routing">
        
        <MapContainer 
          center={[19.076, 72.8777]} 
          zoom={12} 
          scrollWheelZoom={true} 
          className="mwr-leaflet-map"
        >
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors' 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationSelector onSelect={handleMapClick} />
          {routeCoords.length > 0 && (
            <Polyline 
              positions={routeCoords} 
              pathOptions={{ color: "#0078ff", weight: 6, opacity: 0.8 }} 
            />
          )}

          {/* Search Form on top of map */}
          <div className="search-routing-inner map-search-overlay">
            <div className="search-routing-form">
              <input
                type="text"
                placeholder="From"
                value={fromQuery}
                onChange={(e) => setFromQuery(e.target.value)}
              />
              <input
                type="text"
                placeholder="To"
                value={toQuery}
                onChange={(e) => setToQuery(e.target.value)}
              />
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>
        </MapContainer>

        <div className="route-info">
          {!from && !to && <p>🟢 Click on map or use search to choose start point</p>}
          {from && !to && <p>🔵 Choose destination by clicking on map or using search</p>}
          {from && to && routeInfo && (
            <p>🚗 Distance: <b>{routeInfo.distance} km</b> | ⏱ Duration: <b>{routeInfo.duration} min</b></p>
          )}
        </div>
        
      </div>
    </div>
  );
}