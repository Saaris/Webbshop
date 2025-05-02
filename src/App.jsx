import { NavLink, Outlet } from 'react-router'
import './App.css'

function App() {


  return (
    <div className="App">
      <header>
        <h1>MyToys</h1>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/toys">Toys</NavLink>
            <NavLink to="/Cart">Cart</NavLink>
          </nav>
      </header>
        <Outlet />
    </div>

  )
}

export default App
