import { NavLink, Outlet } from 'react-router'
import './App.css'
import Header from './components/header/Header.jsx'

function App() {


  return (
    <div className="App">
      <header>
        <Header />
      </header>
        <Outlet />
    </div>

  )
}

export default App
