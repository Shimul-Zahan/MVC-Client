
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import SocketContext from './Context/SocketContext.js'
import { io } from "socket.io-client"
import { UtilityContext, UtilityProvider } from './Context/UtilitiesContext.jsx'

const socket = io(import.meta.env.VITE_SERVER_ENDPOINT);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <h1>404, Page not found</h1>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <SocketContext.Provider value={socket}>
    <UtilityProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </UtilityProvider>
  </SocketContext.Provider>
)
