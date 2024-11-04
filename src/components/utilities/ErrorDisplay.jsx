import { useContext } from 'react'
import { AppContext } from '../../contexts/DataProvider'

const ErrorDisplay = () => {
  const con = useContext(AppContext);

  return <div className='weather-display'>
  <div className="error-display">
    {(() => {
      if(con.errNum === 1) return <LocNotGranted />
      if(con.errNum !== 0) return <DisplayError errNum={con.errNum} />
      return <LoadingData />
    })()}
  </div>
  </div>
}

export default ErrorDisplay

const LocNotGranted = () => {
  return <>
  <div className="loc-not-granted msg">
    <h4>Allow location access to check the weather in your area</h4>
    <h5>Or search for any place in the search bar</h5>
  </div>
  </>
}

const LoadingData = () => {
  return <div className="loading-data">
    <div className="loading-sun">
      <div className="sun"></div>
    </div>
  </div>
}

const DisplayError = ({errNum, showError}) => {
  return <div className="float-error" onLoad={e => showError(e.target)}>
    {errNum === 2 ? <h5>Place not Found</h5> : errNum === 3 ? <h5>Could not get the data of place given (API issue)</h5> : <h5>Reverse Geocoding Failed</h5>}
    <p>Try Again</p>
  </div>
}