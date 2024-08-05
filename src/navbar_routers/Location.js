import React, { useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Location.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CallIcon from "@mui/icons-material/Call";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const customIcon = L.icon({
  iconUrl: `${process.env.PUBLIC_URL}/takeaway.png`,
  iconSize: [80, 80],
  iconAnchor: [19, 38], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -38], // Point from which the popup should open relative to the iconAnchor
});

const focusedIcon = L.icon({
  iconUrl: `${process.env.PUBLIC_URL}/takeawayFocus.png`,
  iconSize: [80, 80],
  iconAnchor: [19, 38], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -38], // Point from which the popup should open relative to the iconAnchor
});

const MapWithMarkers = ({ locations, selectedLocation, handleMarkerClick, handleLocationClick }) => {
  const map = useMap();

  return (
    <>
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={location.position}
          icon={selectedLocation === index ? focusedIcon : customIcon}
          eventHandlers={{
            click: () => {
              handleLocationClick(index); 
              handleMarkerClick(index);
              console.log(location.position)
              map.setView(location.position, map.getZoom());
            },
          }}
        />
      ))}
    </>
  );
};

const Location = () => {
  // const initialPosition = [22.2835775316433, 113.9357519946884]; // initial Latitude and Longitude
  const initialPosition = [22.296740113426086, 114.17050539891925];

  const locations = [
    {
      position: [22.363547, 114.132597],
      address: "葵涌葵昌路56號貿易之都1樓1號舖",
      hours: "09:00 - 22:30",
      phone: "2790 8888",
      name: " 葵興貿易之都",
    },
    {
      position: [22.248991, 114.152703],
      address: "香港仔大道24號富嘉工業大廈1樓6室",
      hours: "10 AM - 6 PM",
      phone: "2790 8886",
      name: "香港仔富嘉工業大廈",
    },
    {
      position: [22.380661, 114.271550],
      address: "西貢宜春街66號地下10號舖",
      hours: "11 AM - 7 PM",
      phone: "2790 8889",
      name: "西貢宜春街",
    },
    {
      position: [22.392733, 113.976163],
      address: "屯門時代廣場北翼2樓32號舖",
      hours: "11 AM - 7 PM",
      phone: "2790 8887",
      name: "屯門時代廣場",
    },
  ];

  const [selectedLocation, setSelectedLocation] = useState(null);
  const locationRefs = useRef(locations.map(() => React.createRef()));

  const handleMarkerClick = (index) => {
    setSelectedLocation(index);
    locationRefs.current[index].current.scrollIntoView({ behavior: "smooth" });
  };

  const handleLocationClick = (index) => {
    setSelectedLocation(index);
    console.log(selectedLocation)
    locationRefs.current[index].current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <MapContainer
        center={initialPosition}
        zoom={10.5} // larger zoom in
        className={styles.mapContainer}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <MapWithMarkers
          locations={locations}
          selectedLocation={selectedLocation}
          handleMarkerClick={handleMarkerClick}
          handleLocationClick={handleLocationClick}
        />
      </MapContainer>
      <div className={styles.infoContainer}>
        <div className={styles.location}>分店位置</div>
        {locations.map((location, index) => (
          <div
            key={index}
            ref={locationRefs.current[index]}
            position = {locations.position}
            onClick={() => {
              handleLocationClick(index) 
              /* map.setView(location.position, map.getZoom()) */
              /* MapWithMarkers(position, 
                selectedLocation, handleMarkerClick) */
            }}
          >
            <div className={styles.card}>
              <div className={styles.name}>
                <strong>{location.name}</strong>{" "}
              </div>
              <div>
                <LocationOnIcon style={{ color: "#705b38" }} />{" "}
                {location.address}
              </div>
              <div>
                <AccessTimeIcon style={{ color: "#705b38" }} /> {location.hours}
              </div>
              <div>
                <CallIcon style={{ color: "#705b38" }} /> {location.phone}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;