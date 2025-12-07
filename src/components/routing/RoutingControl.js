import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

export default function RoutingControl({ from, to, onRouteFound }) {
  const map = useMap();
  const controlRef = useRef(null);

  useEffect(() => {
    if (!map || controlRef.current) return;

    const routingControl = L.Routing.control({
      waypoints: [],
      router: L.Routing.osrmv1({ serviceUrl: "https://router.project-osrm.org/route/v1/" }),
      routeWhileDragging: false,
      addWaypoints: false,
      show: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      lineOptions: {
        styles: [
          { color: "#2563eb", weight: 6, opacity: 0.8, dashArray: "10,8" },
          { color: "#60a5fa", weight: 4, opacity: 0.6 },
        ],
        extendToWaypoints: false,
        missingRouteTolerance: 0,
      },
      createMarker: () => null,
    }).addTo(map);

    routingControl.on("routesfound", (e) => {
      const route = e.routes[0];
      const summary = route.summary;
      onRouteFound?.({
        distance: (summary.totalDistance / 1000).toFixed(2),
        duration: (summary.totalTime / 60).toFixed(1),
      });
    });

    controlRef.current = routingControl;

    return () => {
      if (controlRef.current) {
        map.removeControl(controlRef.current);
        controlRef.current = null;
      }
    };
  }, [map, onRouteFound]);

  useEffect(() => {
    if (!controlRef.current) return;
    if (from && to) {
      controlRef.current.setWaypoints([
        L.latLng(from.lat, from.lng),
        L.latLng(to.lat, to.lng),
      ]);
    }
  }, [from, to]);

  return null;
}