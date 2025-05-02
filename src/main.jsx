import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createHashRouter, RouterProvider } from 'react-router'
import Home from './components/home/Home.jsx'
import Toys from './components/toys/Toys.jsx'
import Cart from './components/cart/Cart.jsx'
import EditToys from './components/edit/EditToys.jsx'
import AddToys from './components/add/AddToys.jsx'

const router = createHashRouter (
  [
    {
    path: "/",
    Component: App,
    children: 
    [
      {
      index: true,
      Component: Home
      },
      {
      path: '/toys',
      Component: Toys
      },
      {
      path: '/cart',
      Component: Cart
      },
      {
      path: '/editToys/:id',
      Component: EditToys
      },
      {
      path: '/addToys',
      Component: AddToys
      },
    ]
  }
  ]
)

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)