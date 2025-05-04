import './Home.css'
import strandleksaker from '../../assets/strandleksaker.jpg'
import gardentoys from '../../assets/gardentoys.jpg'
import pool from '../../assets/pool.jpg'

const Home = () => {
    return (
        <div className="home-page">

              <div className="image-section">
              <div className="img-info-container">
                <img src={strandleksaker} alt="Strandleksaker" className="home-img" />
                <img src={gardentoys} alt="Garden Toys" className="home-img" />
                <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis . </p>
                </div>
                
                <div className="img-info-container">
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p> 
                <img src={pool} alt="Pool Toys" className="home-img" />
            </div>
        </div>
        </div>
           
)}
export default Home