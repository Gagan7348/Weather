import clouds from '../../assets/images/Cloud-background.png';

const Loading = () => {
  return <div className="loading">
    <img src={clouds} alt="Loading" />
    <img src={clouds} alt="Loading" />
    <img src={clouds} alt="Loading" />
    <img src={clouds} alt="Loading" />
    <h5>Loading...</h5>
    <div className="bg-fade"></div>
  </div>
}

export default Loading