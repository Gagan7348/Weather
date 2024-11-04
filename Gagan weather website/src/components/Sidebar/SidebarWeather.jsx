import { useContext } from 'react';

import data from '../../data';

import { setWeatherIcon, setWeatherType } from '../WeatherDetails/DayWeather';
import { AppContext } from '../../contexts/DataProvider';

const { days } = data;
const { months } = data;
const today = new Date();
const date = today.getDate();
const day = days[parseInt(today.getDay())];
const month = months[parseInt(today.getMonth())];

const SidebarWeather = () => {
  const con = useContext(AppContext);

  if (!con.wData.latitude || con.errNum !== 0) return <></>;
  const hour = today.getHours();
  const res = con.wData;
  const weatherCode = res.hourly.weathercode[0];
  const weatherIcon = setWeatherIcon(weatherCode);
  const weatherType = setWeatherType(weatherCode);
  return (
    <>
      <div className="sidebar-weather">
        <div className="sidebar-weather-icon" align="center">
          <img src={weatherIcon} alt="Weather on your location" />
        </div>
        <div className="sb-weather-info">
          <div className="sb-temp">
            <h1>{res.hourly.temperature_2m[hour]}</h1>
            <h3>
              <span className="temp-type">
                &deg;{con.tempUnit === 'celsius' ? 'C' : 'F'}
              </span>
            </h3>
          </div>
          <h4 className="bg-weather-type">{weatherType}</h4>
          <p className="today">
            Today -{' '}
            <span className="today-date">
              {day}, {date} {month}
            </span>
          </p>
          <p className="location">{con.place}</p>
        </div>
      </div>
    </>
  );
};

export default SidebarWeather;
