import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Recenter map when position changes
const RecenterMap = ({ lat, lon }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lon) map.setView([lat, lon], 13);
  }, [lat, lon, map]);
  return null;
};

const fetchPOIs = async (lat, lon) => {
  if (!lat || !lon) return [];
  const delta = 0.05;
  const south = lat - delta;
  const north = lat + delta;
  const west = lon - delta;
  const east = lon + delta;

  const query = `
    [out:json];
    (
      node["tourism"="attraction"](${south},${west},${north},${east});
      node["tourism"="museum"](${south},${west},${north},${east});
      node["tourism"="viewpoint"](${south},${west},${north},${east});
      node["historic"="monument"](${south},${west},${north},${east});
    );
    out;
  `;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.elements.map((el) => ({
      id: el.id,
      lat: el.lat,
      lon: el.lon,
      name: el.tags?.name || "Unnamed Attraction",
      type: el.tags?.tourism || el.tags?.historic || "Attraction",
    }));
  } catch (err) {
    console.error("Error fetching POIs:", err);
    return [];
  }
};

const MapView = ({ position }) => {
  const [pois, setPois] = useState([]);

  useEffect(() => {
    if (position?.lat && position?.lon) {
      fetchPOIs(position.lat, position.lon).then(setPois);
    }
  }, [position]);

  if (!position || !position.lat || !position.lon) {
    return <div style={{ width: "100%", height: "100%" }}>Select a location to view map</div>;
  }

  return (
    <div className="map-view" style={{ width: "100%", height: "100%" }}>
      <MapContainer
        center={[position.lat, position.lon]}
        zoom={13}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterMap lat={position.lat} lon={position.lon} />

        <Marker position={[position.lat, position.lon]}>
          <Popup>📍 {position.display_name}</Popup>
        </Marker>

        {pois.map((poi) => (
          <Marker key={poi.id} position={[poi.lat, poi.lon]}>
            <Popup>
              <b>{poi.name}</b>
              <br />
              Type: {poi.type}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;