import React, { useState, useEffect, createContext } from 'react';

const AppContext = createContext();

const DataProvider = (props) => {
  const [loc, setLoc] = useState('');
  const [place, setPlace] = useState('');
  const [wData, setWData] = useState({});
  const [curLoc, setCurLoc] = useState(false);
  const [tempUnit, setTempUnit] = useState('celsius');
  const [isFetching, setisFetching] = useState(false);
  const [errNum, setErrNum] = useState(0);
  const [mapCoords, setMapCoords] = useState(0);
  const [isHighlights, setIsHighlights] = useState(false);
  const [dayData, setDayData] = useState([2, 'ok']);

  const showHighlights = (itemNum, date) => {
    setDayData([itemNum, date]);
    setIsHighlights(true);
  };
  const hideHighlights = () => {
    setIsHighlights(false);
  };
  const changeLoc = (newLoc) => {
    setLoc(newLoc);
  };
  const changeTempUnit = (unit) => {
    setisFetching(false);
    setTempUnit(unit === 'C' ? 'celsius' : 'fahrenheit');
  };
  const handleError = (err, num) => {
    console.error(err);
    setisFetching(false);
    setErrNum(num);
  };

  const getMapPos = async (lat, lon) => {
    const res = await fetch(
      `https://us1.locationiq.com/v1/reverse?key=pk.f8c7ac4314ec5b028ae961f89d5db397&lat=${lat}&lon=${lon}&format=json`
    );
    const data = await res.json();
    const newLoc = `${
      data.address.city
        ? data.address.city
        : data.address.county
        ? data.address.county
        : data.address.town
        ? data.address.town
        : data.address.village
    } ${data.address.country}`;
    getCoords(newLoc);
  };

  const getCoords = async (loc) => {
    try {
      setisFetching(true);
      const res = await fetch(
        `https://us1.locationiq.com/v1/search?key=pk.f8c7ac4314ec5b028ae961f89d5db397&q=${loc}&format=json`
      );
      const data = await res.json();
      setMapCoords([data[0].lat, data[0].lon]);
      await getWeatherData(data[0].lat, data[0].lon);
      await getPlace(data[0].lat, data[0].lon);
    } catch (err) {
      handleError(err, 2);
    }
  };

  const getPlace = async (lat, lon) => {
    try {
      const res = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=pk.f8c7ac4314ec5b028ae961f89d5db397&lat=${lat}&lon=${lon}&format=json`
      );
      const data = await res.json();
      setPlace(
        `${
          data.address.city
            ? data.address.city
            : data.address.county
            ? data.address.county
            : data.address.town
            ? data.address.town
            : data.address.village
        }, ${data.address.country}`
      );
    } catch (err) {
      handleError(err, 4);
    }
  };

  const getWeatherData = async (lat, lon) => {
    setisFetching(true);
    const hourlyVar =
      'temperature_2m,visibility,relativehumidity_2m,pressure_msl,windspeed_10m,winddirection_10m,weathercode';
    const dailyVar = 'weathercode,temperature_2m_max,temperature_2m_min';

    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&timezone=GMT&hourly=${hourlyVar}&daily=${dailyVar}&temperature_unit=${tempUnit}`
      );
      const data = await res.json();
      setWData(data);
      setisFetching(false);
      setErrNum(0);
    } catch (err) {
      handleError(err, 3);
    }
  };

  const curLocWeather = () => {
    navigator.geolocation.getCurrentPosition(successCall, errorCall);
  };

  const successCall = (pos) => {
    setMapCoords([pos.coords.latitude, pos.coords.longitude]);
    setLoc('');
    setCurLoc(true);
  };
  const errorCall = (error) => {
    console.error(error);
    setErrNum(1);
  };

  useEffect(() => {
    if (!loc) curLocWeather();
  }, [tempUnit]);
  useEffect(() => {
    if (loc) getCoords(loc);
  }, [loc, tempUnit]);
  useEffect(() => {
    if(curLoc) {
      getWeatherData(mapCoords[0], mapCoords[1]);
    }
  }, [curLoc])
  useEffect(() => {
    if(curLoc) {
      setCurLoc(false);
      getPlace(wData.latitude, wData.longitude);
    }
  }, [wData])

  const value = {
    changeLoc,
    wData,
    place,
    tempUnit,
    curLocWeather,
    errNum,
    changeTempUnit,
    getMapPos,
    mapCoords,
    showHighlights,
    hideHighlights,
    dayData,
    isFetching,
    isHighlights
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export { AppContext, DataProvider };
