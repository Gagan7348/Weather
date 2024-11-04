import { useContext, useEffect, useState } from 'react'

import data from '../../data'
import {Clear, LightCloud, HeavyCloud, LightRain, HeavyRain, Snow, Shower, Sleet, Thunderstorm, Hail} from '../../assets/icons';
import Tooltip from '../utilities/Tooltip';
import { AppContext } from '../../contexts/DataProvider';
import styled, { keyframes } from 'styled-components';
import { rollIn, zoomIn } from 'react-animations';

let AnimationDiv = styled.div`animation: .5s ${keyframes`${rollIn}`} 1`;

const DayWeather = (props) => {
  const con = useContext(AppContext);

  const today = new Date();
  const thisDay = new Date(today.getFullYear(), props.month, props.date);
  const day = props.day > 6 ? props.day-6-1 : props.day;
  const month = thisDay.getMonth();
  const date = thisDay.getDate();

  const res = con.wData;
  const weatherType = res.daily.weathercode[props.itemNum];
  const maxTemp = res.daily.temperature_2m_max[props.itemNum];
  const minTemp = res.daily.temperature_2m_min[props.itemNum];
  const icon = setWeatherIcon(weatherType);
  const tempCF = con.tempUnit === 'celsius' ? 'C' : 'F';


  const [isTooltip, setIsTooltip] = useState(false);

  useEffect(() => {
    AnimationDiv = styled.div``;
    AnimationDiv = styled.div`animation: .5s ${keyframes`${zoomIn}`} 1`;
  }, [con.wData])

  useEffect(() => {
    if(window.screen.width < 600) showTooltip();
  }, [window.screen.width])


  const styling = {
    div : {
      position: 'absolute',
      bottom: '15%',
      fontSize: '.6rem',
      fontWeight: '600',
      border: '1px solid #000',
      borderRadius: '5px',
      color: '#000',
      padding: '2px',
      zIndex: '20',
      background: '#fff',
      opacity: '.5'
    }
  }

  const itemDate = props.itemNum == '1' ? 'Tomorrow' : `${data.days[day]}, ${date} ${data.months[month]}`;

  const showTooltip = () => {
    setIsTooltip(true);
  }
  const hideTooltip = () => {
    if(window.screen.width > 600) setIsTooltip(false);
  }


  return <>
  <AnimationDiv>

  <div className='day-weather' onMouseEnter={showTooltip} onMouseLeave={hideTooltip} onClick={() => con.showHighlights(props.itemNum, itemDate)}>
    <p className='future-dates'>{itemDate}</p>
    <div className="weather-icon">
      <img src={icon} alt="weather symbol" />
    </div>
    <div className="temp">
      <p className="max-temp">{maxTemp}&deg;{tempCF}</p>
      <p className="min-temp">{minTemp}&deg;{tempCF}</p>
    </div>
    {isTooltip ? <Tooltip tooltipText={'Click for more details'} cName={'tt-dayweather'} styling={styling} /> : <></>}
  </div>
  </AnimationDiv>
  </>
}

export default DayWeather
export {setWeatherIcon, setWeatherType}

const setWeatherIcon = (num) => {
  if(num === 0 || num === 1) return Clear;
  if(num === 2) return LightCloud;
  if(num === 3 || num === 45 || num === 48) return HeavyCloud;
  if(num === 51 || num === 53 ||num === 55) return Shower;
  if(num === 56 || num === 57) return Hail;
  if(num === 61  || num === 63 || num === 66) return LightRain;
  if(num === 65 || num === 67) return HeavyRain;
  if(num === 71 || num === 73 || num === 75 || num === 77) return Snow;
  if(num === 80 || num === 81 || num === 82) return Shower;
  if(num === 85 || num === 86) return Sleet;
  if(num === 95) return Thunderstorm;
  if(num === 96 || num === 99) return Hail;
  return 'none';
}
const setWeatherType = (num) => {
  if(num === 0 || num === 1) return 'Clear';
  if(num === 2) return 'Light Cloud';
  if(num === 3 || num === 45 || num === 48) return 'Heavy Cloud';
  if(num === 51 || num === 53 ||num === 55) return 'Drizzle';
  if(num === 56 || num === 57) return 'Freezing Drizzle';
  if(num === 61  || num === 63 || num === 66) return 'Light Rain';
  if(num === 65 || num === 67) return 'Heavy Rain';
  if(num === 71 || num === 73 || num === 75 || num === 77) return 'Snow';
  if(num === 80 || num === 81 || num === 82) return 'Shower';
  if(num === 85 || num === 86) return 'Sleet';
  if(num === 95) return 'Thunderstorm';
  if(num === 96 || num === 99) return 'Hail';
  return 'none';
}