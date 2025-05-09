import { useToyStore } from "../../data/toyStore.js";
import { useEffect } from "react"; 
import { getToys } from "../../data/getToys.js";
import "./Toys.css";
import { useNavigate } from "react-router";
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../../data/database';


const Toys = () => {
  const { isLoggedIn, toyList, addToCart, isEditing, editToy, setToys, setEditing, handleEditClick, handleSaveClick, handleInputChange, handleSortChange, removeItem } = useToyStore();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'toys'), (snapshot) => {
      const toysData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setToys(toysData);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [setToys]);

  return (
    <div className="toys-container">

      <div className="search-container">
        <section className="search-section">
          <input type="text" placeholder="Sök leksak..." className="search-bar" />
          <button className="search-button">Sök</button>
          </section>


          <div className="sort-section">
            <label htmlFor="sort">Sortera:</label>
            <select id="sort" className="sort-dropdown" onChange={handleSortChange}>
              <option value="name">Namn</option>
              <option value="price-asc">Lägst till högst pris</option>
              <option value="price-desc">Högst till lägst pris</option>
             
            </select>
          </div>
      </div>

      {isLoggedIn && (
        <div className="edit-buttons-section">
          <button
            className="add-item-button"
            onClick={() => navigate('/addToys')}
          >
            Lägg till produkt
          </button>
        </div>
      )}

      <div className="toy-section">
        {toyList.length === 0 ? (
          <p>Laddar alla våra leksaker...</p>
        ) : (
          toyList.map((t) => (
            <div key={t.id} className="toy-card">
              {isEditing && editToy?.id === t.id ? (
                <div className="edit-toy-form">
                  <input
                    type="text"
                    name="name"
                    value={editToy?.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Namn"
                    className="edit-input"
                    
                  />
                  <input
                    type="text"
                    name="description"
                    value={editToy?.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Beskrivning"
                    className="edit-input"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editToy?.price || ''}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="Pris"
                    className="edit-price-input"
                  />
                  <input
                    type="text"
                    name="image"
                    value={editToy?.image || ''}
                    onChange={(e) => handleInputChange('image', e.target.value)}
                    placeholder="Bild URL"
                    className="edit-img-input"
                  />
                  <button onClick={handleSaveClick}>Spara</button>
                </div>
              ) : (
                <>
                  <p className="heading">{t.name}</p>
                  {t.image && <img src={t.image} alt={t.name} className="img-container" />}
                  <p>{t.description}</p>
                  <p>Pris: {t.price}</p>
                  {!isLoggedIn && (
                    <button onClick={() => addToCart(t)} className="add-toy-button">
                      Lägg till
                    </button>
                  )}
                  {isLoggedIn && (
                    <div className='edit-remove-button'>
                    <button onClick={() => handleEditClick(t)} className="edit-toy-button">
                      Redigera
                    </button>
                    <button onClick={() => removeItem(t.id)} className="remove-toy-button">
                      Ta bort
                    </button>
                    </div>

                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Toys;