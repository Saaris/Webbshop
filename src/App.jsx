import { NavLink, Outlet } from 'react-router'
import './App.css'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'
import { useToyStore } from './data/toyStore.js'

function App() {
  const { isLoggedIn } = useToyStore()

  return (
    <div className="App">
      <header>
        <Header />
      </header>
        <Outlet />
      <footer>
        <Footer isLoggedIn={isLoggedIn} />
      </footer>
    </div>

  )
}

export default App
