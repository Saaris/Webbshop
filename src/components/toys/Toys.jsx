import { useToyStore } from "../../data/toyStore.js";
import { useEffect, useState } from "react";
import "./Toys.css";
import { useNavigate } from "react-router";
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../../data/database';
import EditToy from "../edit/editToy.jsx";
import Search from "../search/Search.jsx";


const Toys = () => {
  const {
    isLoggedIn, toyList, addToCart, isEditing, editToy, setToys, setEditing,
    handleEditClick, removeItem, handleSortChange, handleLogout} = useToyStore();

  const navigate = useNavigate();

     const [filteredToys, setFilteredToys] = useState(toyList); // För filtrerade leksaker

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'toys'), (snapshot) => {
      const toysData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setToys(toysData);
      setFilteredToys(toysData);
    });

    return () => unsubscribe();
  }, [setToys]);

  return (
    <div className="toys-container">
      
      {isEditing ? (
        <EditToy />
      ) : (
        <div className="search-toy-section">
          <Search
            toyList={toyList}
            setFilteredToys={setFilteredToys}
            handleSortChange={handleSortChange}
          />
        </div>
      )}
      

      {isLoggedIn && (
        <div className="edit-buttons-section">
          <button
            className="add-item-button"
            onClick={() => navigate('/addToys')}
          >
            Lägg till produkt
          </button>
          <button className="logout-button" onClick={handleLogout}>
              Logga ut
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
                <EditToy />
              ) : (
                <>
                  <p className="toy-heading">{t.name}</p>
                  {t.image && <img src={t.image} alt={t.name} className="img-container" />}
                  <p>{t.description}</p>
                  <p>Pris: {t.price} SEK</p>

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
