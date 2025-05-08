import { useToyStore } from "../../data/toyStore.js";
import { useEffect } from "react"; 
import { getToys } from "../../data/getToys.js";
import "./Toys.css";

const Toys = () => {
  const { isLoggedIn, toyList, addToCart, isEditing, editToy, setToys, setEditing, handleEditClick, handleSaveClick, handleInputChange } = useToyStore();

  useEffect(() => {
    if (toyList.length === 0) {
      getToys(setToys);
    }
  }, [toyList.length, setToys]);

  return (
    <div className="toys-container">
      <h2>Våra Leksaker!</h2>
      <section className="search-section">
        <input type="text" placeholder="Sök leksak..." className="search-bar" />
        <button className="search-button">Sök</button>
      </section>

      {isLoggedIn && (
        <div className="edit-buttons-section">
          <button className="add-item-button" onClick={() => navigate('/addToys')}>
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
                  />
                  <input
                    type="text"
                    name="description"
                    value={editToy?.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Beskrivning"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editToy?.price || ''}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="Pris"
                  />
                  <button onClick={handleSaveClick}>Spara</button>
                </div>
              ) : (
                <>
                  <p className="heading">{t.name}</p>
                  {t.image && <img src={t.image} alt={t.name} className="img-container" />}
                  <p>{t.description}</p>
                  <p>Pris: {t.price}</p>
                  {isLoggedIn && (
                    <button onClick={() => handleEditClick(t)} className="edit-toy-button">
                      Redigera
                    </button>
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