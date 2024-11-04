import { useState, useEffect, useContext } from 'react';
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { AppContext } from '../../contexts/DataProvider';
import styled, { keyframes } from 'styled-components';
import { slideInDown } from 'react-animations';

let AnimationDiv = styled.div`
  animation: 0.5s ${keyframes`${slideInDown}`} 1;
`;
const WeatherMap = () => {
  const con = useContext(AppContext);
  const lat = con.mapCoords[0];
  const lng = con.mapCoords[1];
  const [centerCoords, setCenterCoords] = useState([28.4089, 77.3178]);

  useEffect(() => {
    if (lat !== 0 && lng !== 0) {
      setCenterCoords([lat, lng]);
    }
  }, [lat, lng]);

  const newLoc = (newLat, newLng) => {
    con.getMapPos(newLat, newLng);
    setCenterCoords([newLat, newLng]);
  };

  return (
    <AnimationDiv>
      <div className="weather-map">
        <MapContainer
          center={centerCoords}
          zoom={13}
          className="map-container"
          style={{ height: '100%' }}
        >
          <Map newLoc={newLoc} centerCoords={centerCoords} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={centerCoords}></Marker>
        </MapContainer>
      </div>
    </AnimationDiv>
  );
};

export default WeatherMap;

const Map = ({ newLoc, centerCoords }) => {
  const map = useMap();
  map.setView(centerCoords);
  const mapEvents = useMapEvents({
    click(e) {
      newLoc(e.latlng.lat, e.latlng.lng);
      mapEvents.setView(e.latlng, mapEvents.getZoom());
    },
  });
};
