import { useState } from 'react';


const Search = ({ toyList, setFilteredToys, handleSortChange }) => {
  const [searchValue, setSearchValue] = useState('');

  // Funktion för att matcha "needle" mot "haystack"
  const matchToy = (searchValue, toy) => {
    const lower = searchValue.toLowerCase();
    return (
      toy.name.toLowerCase().includes(lower) ||
      (toy.description && toy.description.toLowerCase().includes(lower)) ||
      (toy.category && toy.category.toLowerCase().includes(lower))
    );
  };

  // Filtrera leksaker baserat på söksträngen
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    console.log('Söksträng:', value);

   const filteredToys = toyList.filter((toy) => matchToy(value, toy));
  setFilteredToys(filteredToys); // Uppdatera filtrerade leksaker
  console.log('Filtrerade leksaker:', filteredToys); // Logga de filtrerade leksakerna
  };

  return (
    <div className="search-container">
      <section className="search-section">
        <input
          type="text"
          value={searchValue}
          placeholder="Sök leksak..."
          className="search-bar"
          onChange={handleSearch}
        />
      </section>

      <div className="sort-section">
        <label htmlFor="sort">Sortera:</label>
        <select className="sort-dropdown" onChange={handleSortChange}>
          <option value="name-asc">Namn: A-Ö</option>
            <option value="name-desc">Namn: Ö-A</option>
          <option value="price-asc">Pris: lägst till högst</option>
          <option value="price-desc">Pris: högst till lägst</option>
        </select>
      </div>
    </div>
  );
};

export default Search;