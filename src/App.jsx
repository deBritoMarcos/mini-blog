// Styles
import './App.css'

// Packages
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom' 
import { onAuthStateChanged } from 'firebase/auth'

// hooks
import { useEffect, useState } from 'react'
import { useAuthentication } from './hook/useAuthentication'

// Context 
import { AuthContextProvider } from './context/AuthContext';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost'
import Dashboard from './pages/Dashboard/Dashboard'

function App() {
  // console.log(import.meta.env);

  const [user, setUser] = useState(undefined);
  const {auth} = useAuthentication();

  const loadingUser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      setUser(user);
    })
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando ...</p>;
  }

  return (
    <div>
      <AuthContextProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />

          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />

              {/* Páginas não autenticado */}
              <Route 
                path='/login' 
                element={!user ? <Login /> : <Navigate to="/" />} 
              />
              <Route 
                path='/register' 
                element={!user ? <Register /> : <Navigate to="/" />} 
              />

              {/* Páginas Autenticado */}
              <Route 
                path='/post/create' 
                element={user ? <CreatePost /> : <Navigate to="/login" />} 
              />
              <Route 
                path='/dashboard'
                element={user ? <Dashboard /> : <Navigate to="/login" />}
              />
              
            </Routes>
          </div>

          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  )
}

export default App
