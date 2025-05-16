import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createHashRouter, RouterProvider } from 'react-router'
import Home from './pages/home/Home.jsx'
import Toys from './pages/toys/Toys.jsx'
import Cart from './pages/cart/Cart.jsx'
import Login from './pages/login/Login.jsx'
import Pay from './pages/pay/Pay.jsx'


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
      path: '/login',
      Component: Login
      },
      {
      path: '/pay',
      Component: Pay
      }
    ]
  }
  ]
)

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
)