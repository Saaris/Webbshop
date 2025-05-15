import { Outlet } from 'react-router'
import { useEffect } from 'react'
import './App.css'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import { useToyStore } from './data/toyStore.js'

function App() {
 
  const { isLoggedIn, setIsLoggedIn } = useToyStore()

  useEffect(() => {
  const storedIsLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  
  console.log('Stored isLoggedIn:', storedIsLoggedIn);
  if (storedIsLoggedIn) {
    setIsLoggedIn(storedIsLoggedIn);
      console.log('isLoggedIn updated to:', storedIsLoggedIn);
  }
}, [setIsLoggedIn]);

  return (
    <div className="App">
      <header>
        <Header />
      </header>
        <Outlet />
      <footer>
        <Footer isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </footer>
    </div>

  )
}

export default App
