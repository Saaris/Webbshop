import { NavLink, Outlet } from 'react-router'
import './App.css'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import { useToyStore } from './data/toyStore.js'

function App() {
  const { isLoggedIn, setIsLoggedIn } = useToyStore()

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
