import { matchToy, match  } from '../../data/store.js';
import { useToyStore } from '../../data/toyStore.js';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../data/database';

const SearchProducts = () => {
    const { setFilteredToys } = useToyStore();
    
    
   
    
    return (
        <div className="search-container">
        <input
            type="text"
            placeholder="Sök leksak..."
            className="search-bar"
            onChange={handleSearch}
        />
        </div>
    );
}