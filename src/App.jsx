import { useState } from 'react'
import './App.css'
import { HomePage } from './Pages/HomePage'
import { Routes, Route, Link, BrowserRouter, NavLink } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
function App() {
  return (
        <BrowserRouter>
    <div className='app'>
      <Navbar/>
      <main>
        <Routes>
        <Route path='/' element={<HomePage/>}/>
        </Routes>
          <HomePage></HomePage>
      </main>
    </div>
        </BrowserRouter>
  )
}

export default App
