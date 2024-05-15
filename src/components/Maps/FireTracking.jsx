import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import fire from "../../media/icons/fire.png";

const FireTracking = ({ eventData, center, zoom }) => {
  const ICON = icon({
    iconUrl: fire,
    iconSize: [18, 18],
  });

  const markers = eventData.map((ev) => {
    if (ev.categories[0].id === 8) {
      const position = [
        ev.geometries[0].coordinates[1],
        ev.geometries[0].coordinates[0],
      ];
      return (
        <Marker position={position} icon={ICON} key="">
          <Popup>
            <p>id: {ev.id}</p>
            <p>title: {ev.title}</p>
          </Popup>
        </Marker>
      );
    }
    return null;
  });
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      style={{ minHeight: "100vh", minWidth: "80vw" }}
    >
      <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
      {markers}
    </MapContainer>
  );
};

FireTracking.defaultProps = {
  center: {
    lat: 42.3265,
    lng: -122.8756,
  },
  zoom: 6,
};

export default FireTracking;
