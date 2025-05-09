import './Home.css'
import { NavLink } from 'react-router'
import imgHomepage from '../../assets/imgHomepage.jpeg'
import beachtoys from '../../assets/beachtoys.jpg'

 const Home = () => {
     return (
         <div className="home-page">

               <div className="image-section">
               <div className="img-info-container">
                 {/* <img src={hinkset} alt="Strandleksaker" className="beach-img" /> */}
                 <img src={imgHomepage} alt="Garden Toys" className="garden-img" />
                 <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis . </p>
                
                 <NavLink to="/toys">
                 <button className="shop-button">Se våra leksaker</button>
                 </NavLink>
                 </div>
                
                 <div className="img-info-container">
                     <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. </p> 
                 {/* <img src={pool} alt="Pool Toys" className="pool-img" /> */}
             </div>
         </div>
         </div>
           
)}
export default Home

