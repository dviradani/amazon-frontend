import './App.css'
import HomePage from './Pages/HomePage/HomePage';
import { Routes, Route, Link, BrowserRouter, NavLink } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import SigninPage from './Pages/SigninPage/SigninPage';
import SignupPage from './Pages/SignupPage/SignupPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartPage from './Pages/CartPage/CartPage';
import ShippingAddressPage from './Pages/ShippingAddressPage/ShippingAddressPage';
import PaymentPage from './Pages/PaymentPage/PaymentPage';
import PlaceOrderPage from './Pages/PlaceOrderPage/PlaceOrderPage';
import ProductPage from './Pages/ProductPage/ProductPage';
import OrderPage from './Pages/OrderPage/OrderPage';
import SearchPage from './Pages/SearchPage/SearchPage';

function App() {
  return (
        <BrowserRouter>
    <div className='app'>
      <Navbar/>
      <ToastContainer position='bottom-center' limit={1}/>
      <main>
        <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signin' element={<SigninPage/>}/>
        <Route path="/signUp" element={<SignupPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/shipping" element={<ShippingAddressPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/placeorder" element={<PlaceOrderPage />} />
        <Route path="/product/:token" element={<ProductPage />} />
        <Route path="/order/:id" element={<OrderPage/>} />
        <Route path="/search" element={<SearchPage/>} />
        </Routes>
      </main>
    </div>
        </BrowserRouter>
  )
}

export default App
