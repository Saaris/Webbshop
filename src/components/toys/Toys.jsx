import { useToyStore } from "../../data/toyStore.js"
import { useEffect } from "react"
import { getToys } from "../../data/getToys.js"
import "./Toys.css"


const Toys = () => {
    // const setToyList = useToyStore(state => state.setToyList)

    const { toyList, setToys } = useToyStore();
    console.log('In Toys.jsx, setToys from store is:', typeof setToys, setToys);


    useEffect(() => {

        if( toyList.length === 0 ) {
                getToys(setToys)
            }
	}, [toyList.length, setToys])



    return (
     <div className="toys-container">
            <h1>All our toys!</h1>
        <div className="toy-section">
            {toyList.length === 0 ? (
                <p>Loading our toys...</p>
            ) : (
                toyList.map(t => (                 
                    <div key={t.id} className="toy-card">
                        <h2> {t.name} </h2>
                        <p> {t.description} </p>
                        <p>Price: {t.price} </p>
                        {t.image && <img src={t.image} alt={t.name} className="img-container" />}
                    </div>
                ))
            )}
        </div>
    </div>
           
)}
export default Toys