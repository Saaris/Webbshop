import { useToyStore } from "../../data/toyStore.js";
import { useEffect, useState } from "react";
import "./Toys.css";
import { useNavigate } from "react-router";
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../../data/database';
import EditToy from '../../components/edit/EditToy.jsx';
import Search from "../../components/search/Search.jsx";

const Toys = () => {
  const {
    isLoggedIn,
    toyList,
    addToCart,
    isEditing,
    editToy,
    setToys,
    setEditing,
    handleEditClick,
    removeItem,
    handleLogout
  } = useToyStore();

  const [clickedToyId, setClickedToyId] = useState(null);

  const navigate = useNavigate();
  const [filteredToys, setFilteredToys] = useState(toyList);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'toys'), (snapshot) => {
      const toysData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setToys(toysData);
      setFilteredToys(toysData);
    });

    return () => unsubscribe();
  }, [setToys]);

  const handleSortChange = (event) => {
    const value = event.target.value;
    let sortedToys = [...filteredToys];

    if (value === "name-asc") {
      sortedToys.sort((a, b) => a.name.localeCompare(b.name, 'sv'));
    } else if (value === "name-desc") {
      sortedToys.sort((a, b) => b.name.localeCompare(a.name, 'sv'));
    } else if (value === "price-asc") {
      sortedToys.sort((a, b) => a.price - b.price);
    } else if (value === "price-desc") {
      sortedToys.sort((a, b) => b.price - a.price);
    }

    setFilteredToys(sortedToys);
  };

  return (
    <div className="toys-container">
      <Search
        toyList={toyList}
        setFilteredToys={setFilteredToys}
        handleSortChange={handleSortChange}
      />

      {isLoggedIn && (
        <div className="edit-buttons-section">
          <button
            className="add-item-button"
            onClick={() => navigate('/addToys')}
          >
            Lägg till produkt
          </button>
          <button
            className="logout-button"
            onClick={() => {
              handleLogout();
              navigate('/');
            }}
          >
            Logga ut
          </button>
        </div>
      )}

      <div className="toy-section">
        {filteredToys.length === 0 ? (
          <p>Produkten du söker finns inte</p>
        ) : (
          filteredToys.map((t) => (
            <div key={t.id} className={`toy-card ${clickedToyId === t.id ? "card-animate" : ""}`}>
              {isEditing && editToy?.id === t.id ? (
                <EditToy />
              ) : (
                <>
                  <p className="toy-heading">{t.name}</p>
                  {t.image && <img src={t.image} alt={t.name} className="img-container" />}
                  <p className="category-text">{t.category}</p>
                  <p>{t.description}</p>
                  <p>Pris: {t.price} SEK</p>

                  {!isLoggedIn && (
                    <button
                    onClick={() => {
                      addToCart(t);
                      setClickedToyId(t.id);
                      setTimeout(() => setClickedToyId(null), 600); 
                    }}
                    className="add-toy-button"
                  >
                    Lägg till
                  </button>
                  )}

                  {isLoggedIn && (
                    <div className="edit-remove-button">
                      <button
                        onClick={() => handleEditClick(t)}
                        className="edit-toy-button"
                      >
                        Redigera
                      </button>
                      <button
                        onClick={() => removeItem(t.id)}
                        className="remove-toy-button"
                      >
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
