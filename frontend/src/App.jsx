import { useEffect, useState } from 'react'
import './App.css'
import Header from './Components/Header/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Carts from './pages/Carts/Carts'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess'
import Menu from './pages/Menu/Menu'
import { onAuthStateChanged } from 'firebase/auth';
import ProtectedRoute from './Components/protectedRoute/ProtectedRoute'
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddDetails from './Components/AddDetails/AddDetails';
import ResetPassword from './pages/Reset/ResetPassword';


function App() {
  const [user, setUser] = useState('');
  const [isFetching, setIsFetching] = useState(true)

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }
      setUser(null);
      setIsFetching(false);
    });
      return () => unsubscribe();      
      }, []);
    
      if (isFetching) {
        <h2>Loading...</h2>
      }

  return (
    <div className='App'>
    <BrowserRouter>
      <Header />
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Carts />} />
              <Route path='/payment-success' element={<PaymentSuccess />} />
              <Route path='/menu' element={<Menu />} />
              <Route path='/add' element={<AddDetails />} />
              <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
      <ToastContainer />

    </BrowserRouter>
    </div>
  )
}

export default App
