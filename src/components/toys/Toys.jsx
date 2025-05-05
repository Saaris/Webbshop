import { useToyStore } from "../../data/toyStore.js"
import { useEffect } from "react"
import { getToys } from "../../data/getToys.js"

import "./Toys.css"


const Toys = () => {
    // const setToyList = useToyStore(state => state.setToyList)

    const { toyList, setToys, toyCount, addToCart, increaseToy } = useToyStore();
    console.log('In Toys.jsx, setToys from store is:', typeof setToys, setToys);


    useEffect(() => {

        if( toyList.length === 0 ) {
                getToys(setToys)
            }
	}, [toyList.length, setToys])



    return (
     <div className="toys-container">
            <h2>Våra Leksaker!</h2>
            <section className="search-section">
                <input type="text" placeholder="Sök leksak..." className="search-bar" />
                <button className="search-button">Sök</button>
            </section>

                <div className='sort-section'>
                    <label htmlFor="sort">Sortera efter:</label>
                    <select id="sort" className="sort-dropdown">
                        <option value="name">Namn</option>
                        <option value="price">Pris</option>
                        <option value="category">Stigande pris</option>
                        <option value="category">Fallande pris</option>
                    </select> 
                    </div>      

        <div className="toy-section">
            {toyList.length === 0 ? (
                <p>Laddar alla våra leksaker...</p>
            ) : (
                toyList.map(t => (                 
                    <div key={t.id} className="toy-card">
                        <p className='heading'> {t.name} </p>
                        <p> {t.description} </p>
                        <p>Pris: {t.price} </p>
                        {t.image && <img src={t.image} alt={t.name} className="img-container" />}
                        <button 
                        onClick={() => {
                            addToCart(t);
                            increaseToy();
                        }} 
                        className="add-button">
                        Lägg till
                        </button>

                        
                    </div>
                ))
            )}
        </div>
    </div>
           
)}
export default Toys