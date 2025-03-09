import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './components/Dashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Navbar from './components/Navbar'
import Login from './components/Login'
import LogOut from './components/LogOut'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
         <Navbar/>
         <Routes>
            <Route path='/' element={ <Dashboard/> } /> 
            <Route path='/signup' element={ <Signup/> } />
            <Route path='/login' element={ <Login/> } />
            <Route path='/logout' element={ <LogOut/> } />
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
