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
            <h1>Våra Leksaker!</h1>
        <div className="toy-section">
            {toyList.length === 0 ? (
                <p>Laddar alla våra leksaker...</p>
            ) : (
                toyList.map(t => (                 
                    <div key={t.id} className="toy-card">
                        <h3> {t.name} </h3>
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