import { useState, useEffect, useContext } from 'react';

import directionIcon from '../../assets/icons/wind-direction.png';
import { AppContext } from '../../contexts/DataProvider';
import styled, { keyframes } from 'styled-components';
import { rotateInDownLeft, zoomIn, merge, flip } from 'react-animations';

let AnimationDiv = styled.div`animation: .5s ${keyframes`${merge(rotateInDownLeft, zoomIn)}`} 1`;

const curHour = new Date().getHours();

const TodaysHighlights = () => {
  const con = useContext(AppContext);

  useEffect(() => {
    AnimationDiv = styled.div``;
    AnimationDiv = styled.div`animation: .5s ${keyframes`${zoomIn}`} 1`;
  }, [con.wData])

  return (
    <>
    <AnimationDiv>
      <div className="todays-highlights">
        <h5>Today's Highlights</h5>
        <div className="highlights-container">
          <WindStatus wData={con.wData} />
          <Humidity wData={con.wData} />
          <Visibility wData={con.wData} />
          <AirPressure wData={con.wData} />
        </div>
      </div>
    </AnimationDiv>
    </>
  );
};

export default TodaysHighlights;

const WindStatus = ({ wData }) => {
  const windSpeed = wData.hourly.windspeed_10m[0 + curHour];
  const dirDegree = wData.hourly.winddirection_10m[0 + curHour];
  const direction = checkDirection(dirDegree);


  return (
    <div>
      <p>Wind Status</p>
      <span>
        <h2>{windSpeed}</h2>
        <h4>km/h</h4>
      </span>
      <span className="wind-direction">
        <img
          src={directionIcon}
          alt="Wind direction"
          style={{ transform: `rotate(${-46 + dirDegree}deg)` }}
        />
        <p>{direction}</p>
      </span>
    </div>
  );
};
const Humidity = ({ wData }) => {
  const [humidity, setHumidity] = useState(0);
  const humi = wData.hourly.relativehumidity_2m[0 + curHour];

  useEffect(() => {
    setHumidity(humi);
    document.querySelector(
      'input[name="humidity"]'
    ).style.backgroundSize = `${humidity}% 100%`;
  }, [humidity]);

  return (
    <div>
      <p>Humidity</p>
      <span>
        <h2>{humidity}</h2>
        <h4>%</h4>
      </span>
      <div className="range-bar-box">
        <div className="range-values">
          <p>0</p>
          <p>50</p>
          <p>100</p>
        </div>
        <input type="range" name="humidity" min="0" max="100" />
        <p>%</p>
      </div>
    </div>
  );
};
const Visibility = ({ wData }) => {
  const vis = Math.round(wData.hourly.visibility[0 + curHour] / 100) / 10;
  return (
    <div>
      <p>Visibility</p>
      <span>
        <h2>{vis}</h2>
        <h4>km</h4>
      </span>
    </div>
  );
};
const AirPressure = ({ wData }) => {
  const pressure = wData.hourly.pressure_msl[0 + curHour];
  return (
    <div>
      <p>Air Pressure</p>
      <span>
        <h2>{pressure}</h2>
        <h4>mb</h4>
      </span>
    </div>
  );
};

const checkDirection = (deg) => {
  if (deg < 11.25 && deg >= 348.75) return 'North';
  if (deg < 33.75) return 'NNE';
  if (deg < 56.25) return 'NE';
  if (deg < 78.75) return 'ENE';
  if (deg < 101.25) return 'East';
  if (deg < 123.75) return 'ESE';
  if (deg < 146.25) return 'SE';
  if (deg < 168.75) return 'SSE';
  if (deg < 191.25) return 'South';
  if (deg < 213.75) return 'SSW';
  if (deg < 236.25) return 'SW';
  if (deg < 258.75) return 'WSW';
  if (deg < 281.25) return 'West';
  if (deg < 303.75) return 'WNW';
  if (deg < 326.25) return 'NW';
  if (deg < 348.75) return 'NNW';
  return 'No Data';
};
