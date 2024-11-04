import { useContext, useEffect } from 'react'

import gps from '../../assets/icons/gps.png'
import search from '../../assets/icons/search.png'
import { AppContext } from '../../contexts/DataProvider'


const SearchBar = () => {
  const con = useContext(AppContext);

  let searchInput;
  const pressEnter = (e) => {
    if(e.key === 'Enter') {
      con.changeLoc(searchInput.value);
      e.target.blur();
    }
  }

  const handleSearch = () => {
    if(!searchInput.value) searchInput.focus();
    con.changeLoc(searchInput.value);
  }

  const addSearch = (e) => {
    window.addEventListener('keydown', pressEnter)
  }
  const removeSearch = (e) => {
    window.removeEventListener('keydown', pressEnter);
  }
  useEffect(() => {
    searchInput = document.querySelector('.search-bar');
  })

  return <>
  <div className='search-box'>
    <input type="search" name="search" id="search" className='search-bar' placeholder='Search for Places' onFocus={(e) => addSearch(e)} onBlur={(e) => removeSearch(e)} />
    <button><img src={search} alt="search" onClick={handleSearch} /></button>
    <img src={gps} alt="your location" onClick={con.curLocWeather}/>
  </div>
  </>
}

export default SearchBar