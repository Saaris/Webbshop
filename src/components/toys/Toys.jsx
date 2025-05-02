import { useToyStore } from "../../data/toyStore.js"

const Toys = () => {
    const toyList = useToyStore(state => state.toyList)
	const setToyList = useToyStore(state => state.setToyList)

    // useEffect(() => {

	// 	if( toyList.length === 0 ) {
	// 		getToyList(setToyList)
	// 	}
	// }, [])



    return (
        <div className="toy-page">
            <h1>All our toys!</h1>

           {toyList.map(t => (
            <div key={t.id} className="toy-card">
                <h2> {t.name} </h2>
                <p> {t.description} </p>
                <p> {t.price} </p>
                <img src={t.image} alt={t.name} className="img-container" />
            </div>
         ))}
    </div>
           
)}
export default Toys