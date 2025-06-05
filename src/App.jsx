// Styles
import './App.css'

// Packages
import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' 

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';



function App() {
  const [count, setCount] = useState(0)

  console.log("ola");

  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>

        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
