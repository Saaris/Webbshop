import { NavLink, Outlet } from 'react-router'
import './App.css'
import Header from './components/header/Header.jsx'
import Footer from './components/footer/Footer.jsx'

function App() {


  return (
    <div className="App">
      <header>
        <Header />
      </header>
        <Outlet />
      <footer>
        <Footer />
      </footer>
    </div>

  )
}

export default App
