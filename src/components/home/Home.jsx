import './Home.css'
import { NavLink } from 'react-router'
import imgHomepage from '../../assets/imgHomepage.jpeg'
import beachtoys from '../../assets/beachtoys.jpg'

 const Home = () => {
     return (
         <div className="home-page">

               <div className="image-section">
               <div className="img-info-container">
                
                 <img src={imgHomepage} alt="Garden Toys" className="garden-img" />
                 <p>Följ med på äventyr med våra färgglada leksaker! Passar perfekt för små upptäckare som älskar att skapa, bygga och utforska sin fantasi!</p>
                
                 <NavLink to="/toys">
                 <button className="shop-button">Se våra leksaker</button>
                 </NavLink>
                 </div>
                
                 <div className="img-info-container">
                  <img src={beachtoys} alt="beach toys" className="pool-img" />
                 <p>Plaska med våra färgglada strandleksaker perfekt för soliga dagar.</p>
             </div>
         </div>
         </div>
           
)}
export default Home

