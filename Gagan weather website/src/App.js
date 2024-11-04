import { useContext } from 'react'

import Sidebar from './components/Sidebar/Sidebar'
import WeatherDisplay from './components/WeatherDetails/WeatherDisplay'
import ErrorDisplay from './components/utilities/ErrorDisplay'
import Loading from './components/utilities/Loading'
import ThemeIcon from './components/utilities/ThemeIcon'
import DayHighlights from './components/WeatherDetails/DayHighlights'
import { AppContext } from './contexts/DataProvider'

const App = () => {
  const con = useContext(AppContext);
  
  return <div className="container">
      <Sidebar />
      {con.wData.latitude && con.errNum === 0 ? <WeatherDisplay /> : <ErrorDisplay />}

      <ThemeIcon />

      {con.isHighlights ? <DayHighlights /> : <></>}

      {con.isFetching === true ? <Loading /> : <></>}
    </div>  
}

export default App