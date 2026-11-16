import React from 'react'
import Login from './pages/login'
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/dashboard",
      element: <Dashboard />
    }
  )
}

export default App
