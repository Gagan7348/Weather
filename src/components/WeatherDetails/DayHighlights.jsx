import { useState, useEffect, useContext } from 'react';

import { setWeatherIcon } from './DayWeather';
import directionIcon from '../../assets/icons/wind-direction.png';
import { AppContext } from '../../contexts/DataProvider';
import styled, { keyframes } from 'styled-components';

const slideInAni = keyframes`
0% { transform: translate(-50%, -200%); }
100% { transform: translate(-50%, -50%); }
`;
const slideOutAni = keyframes`
0% { transform: translate(-50%, -50%); }
100% { transform: translate(-50%, 100%); }
`;

let AnimationDiv = styled.div`
  animation: 0.7s ${slideInAni} 1;
`;

const style = {
  width: '80%',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  transformOrigin: 'center',
  maxWidth: '700px',
  height: 'fit-content',
  zIndex: '82',
};

const curHour = new Date().getHours();

const DayHighlights = () => {
  const con = useContext(AppContext);

  const [isMounted, setIsMounted] = useState(true);
  const dayNum = con.dayData[0];
  const date = con.dayData[1];

  const weatherType = con.wData.daily.weathercode[dayNum];
  const maxTemp = con.wData.daily.temperature_2m_max[dayNum];
  const minTemp = con.wData.daily.temperature_2m_min[dayNum];
  const icon = setWeatherIcon(weatherType);
  const tUnit = con.wData.daily_units.temperature_2m_max === '°C' ? '°C' : '°F';

  const closeHighlights = () => {
    setIsMounted(false);
    setTimeout(() => {
      con.hideHighlights();
    }, 500);
  };

  useEffect(() => {
    const ani = isMounted ? slideOutAni : slideInAni;
    AnimationDiv = styled.div`
      animation: 0.7s ${ani} 1;
    `;
  }, [isMounted]);

  return (
    <>
      <div className="day-highlights">
        <AnimationDiv style={style} className={isMounted ? 'in' : 'out'}>
          <div className="hl-container">
            <button className="close-btn" onClick={closeHighlights}>
              X
            </button>
            <h4 className="date">{date}</h4>
            <div className="weather-details">
              <img src={icon} alt="#" />
              <div className="max-temp">
                <h5>Max temp</h5>
                <h3>
                  {maxTemp}
                  <span>{tUnit}</span>
                </h3>
              </div>
              <div className="min-temp">
                <h5>Min temp</h5>
                <h3>
                  {minTemp}
                  <span>{tUnit}</span>
                </h3>
              </div>
            </div>
            <div className="highlights highlights-container">
              <WindStatus wData={con.wData} dayNum={dayNum} />
              <Humidity wData={con.wData} dayNum={dayNum} />
              <Visibility wData={con.wData} dayNum={dayNum} />
              <AirPressure wData={con.wData} dayNum={dayNum} />
            </div>
          </div>
        </AnimationDiv>
        <div className="bg-overlay" onClick={closeHighlights}></div>
      </div>
    </>
  );
};

export default DayHighlights;

const WindStatus = ({ wData, dayNum }) => {
  const windSpeed = wData.hourly.windspeed_10m[0 + curHour + dayNum * 24];
  const dirDegree = wData.hourly.winddirection_10m[0 + curHour + dayNum * 24];
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
const Humidity = ({ wData, dayNum }) => {
  const [humidity, setHumidity] = useState(0);
  const humi = wData.hourly.relativehumidity_2m[0 + curHour + dayNum * 24];

  useEffect(() => {
    setHumidity(humi);
    document.querySelector(
      '#hl-humidity'
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
        <input
          type="range"
          name="humidity"
          min="0"
          max="100"
          id="hl-humidity"
        />
        <p>%</p>
      </div>
    </div>
  );
};
const Visibility = ({ wData, dayNum }) => {
  const vis =
    Math.round(wData.hourly.visibility[0 + curHour + dayNum * 24] / 100) / 10;
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
const AirPressure = ({ wData, dayNum }) => {
  const pressure = wData.hourly.pressure_msl[0 + curHour + dayNum * 24];
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
