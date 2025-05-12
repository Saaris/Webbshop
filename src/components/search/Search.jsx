import { useState } from 'react';

const Search = ({ toyList }) => {
    const [searchValue, setSearchValue] = useState('');

    // Funktion för att matcha "needle" mot "haystack"
    const matchToy = (needle, haystack) => {
        return haystack.name.toLowerCase().includes(needle.toLowerCase());
    };

    // Filtrera leksaker baserat på söksträngen
    const searchResults = toyList.filter(toy => matchToy(searchValue, toy));

    return (
        <div className="search-container">
            <input
                type="text"
                value={searchValue}
                placeholder="Sök leksak..."
                className="search-bar"
                onChange={event => setSearchValue(event.target.value)}
            />
            <div className="search-results">
                {searchResults.map(toy => (
                    <div key={toy.id} className="toy-item">
                        <p>{toy.name}</p>
                        <p>{toy.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;